import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeRealm, getRealm, closeRealm, BSON, checkDatabaseHealth } from '@/lib/database/mockRealmConfig';
import { UserData, DataLogHub, SyncStatus } from '@/lib/database/localStorage';
import { getSyncService, initializeSyncService } from '@/lib/services/syncService';

interface DatabaseContextType {
  isRealmReady: boolean;
  syncPreference: 'local' | 'daily' | 'weekly';
  setSyncPreference: (preference: 'local' | 'daily' | 'weekly') => void;
  saveEncryptedData: (data: any, category: 'mood' | 'chat' | 'health') => Promise<void>;
  getDoctorAdvices: () => any[];
  addDoctorAdvice: (doctorId: string, advice: string, category: string) => Promise<void>;
  syncStatus: SyncStatus;
  databaseHealth: any;
  triggerManualSync: () => Promise<boolean>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isRealmReady, setIsRealmReady] = useState(false);
  const [syncPreference, setSyncPreferenceState] = useState<'local' | 'daily' | 'weekly'>('local');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    lastSync: null,
    pendingOperations: 0,
    syncInProgress: false
  });
  const [databaseHealth, setDatabaseHealth] = useState<any>({});

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        console.log('Initializing enhanced database system...');
        await initializeRealm();
        
        // Initialize sync service (without MongoDB connection for now)
        await initializeSyncService();
        
        setIsRealmReady(true);
        console.log('Enhanced database system initialized successfully');
        
        // Load user sync preference
        const realm = getRealm();
        const userDataArray = realm.objects('UserData') as UserData[];
        const userData = userDataArray[0];
        if (userData) {
          setSyncPreferenceState(userData.syncPreference as 'local' | 'daily' | 'weekly');
          
          // Start periodic sync if needed
          const syncService = getSyncService();
          syncService.startPeriodicSync(userData);
        }

        // Check database health
        const health = checkDatabaseHealth();
        setDatabaseHealth(health);
        
        // Update sync status
        const syncService = getSyncService();
        setSyncStatus(syncService.getSyncStatus());
        
      } catch (error) {
        console.error('Failed to setup enhanced database system:', error);
        setIsRealmReady(false);
      }
    };

    setupDatabase();

    // Online/offline event listeners
    const handleOnline = () => {
      console.log('Application came online');
      const syncService = getSyncService();
      setSyncStatus(syncService.getSyncStatus());
    };

    const handleOffline = () => {
      console.log('Application went offline');
      const syncService = getSyncService();
      setSyncStatus(syncService.getSyncStatus());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      try {
        const syncService = getSyncService();
        syncService.cleanup();
        closeRealm();
      } catch (error) {
        console.error('Error cleaning up database system:', error);
      }
    };
  }, []);

  const setSyncPreference = async (preference: 'local' | 'daily' | 'weekly') => {
    setSyncPreferenceState(preference);
    
    if (isRealmReady) {
      try {
        const realm = getRealm();
        realm.write(() => {
          const userDataArray = realm.objects('UserData') as UserData[];
          let userData = userDataArray[0];
          if (!userData) {
            userData = realm.create('UserData', {
              _id: BSON.ObjectId().toString(),
              rephraseKey: 'default-key',
              createdAt: new Date(),
              updatedAt: new Date(),
              syncPreference: preference,
              doctorAdvices: [],
            }) as UserData;
          } else {
            (userData as any).syncPreference = preference;
            (userData as any).updatedAt = new Date();
          }
          
          // Update periodic sync
          const syncService = getSyncService();
          syncService.startPeriodicSync(userData);
        });
      } catch (error) {
        console.error('Error updating sync preference:', error);
      }
    }
  };

  const saveEncryptedData = async (data: any, category: 'mood' | 'chat' | 'health') => {
    if (!isRealmReady) {
      console.warn('Database not ready, cannot save data');
      return;
    }

    try {
      const realm = getRealm();
      
      // Enhanced encryption (still using base64 for demo)
      const encryptedPayload = btoa(JSON.stringify({
        ...data,
        timestamp: new Date(),
        category,
        version: 1
      }));
      
      realm.write(() => {
        // Create encrypted data entry
        const encryptedData = realm.create('EncryptedData', {
          _id: BSON.ObjectId().toString(),
          encryptedPayload,
          timestamp: new Date(),
          category,
          _v: 1,
        });

        // Get or create user data
        const userDataArray = realm.objects('UserData') as UserData[];
        let userData = userDataArray[0];
        if (!userData) {
          userData = realm.create('UserData', {
            _id: BSON.ObjectId().toString(),
            rephraseKey: 'default-key',
            createdAt: new Date(),
            updatedAt: new Date(),
            syncPreference: syncPreference,
            doctorAdvices: [],
          }) as UserData;
        }

        // Get or create appropriate hub
        const hubField = `${category}LogHubId` as keyof UserData;
        let hubId = (userData as any)[hubField];
        
        if (!hubId) {
          const hub = realm.create('DataLogHub', {
            _id: BSON.ObjectId().toString(),
            entries: [],
          }) as DataLogHub;
          (userData as any)[hubField] = hub._id;
          hubId = hub._id;
        }

        // Add entry to hub
        const hub = realm.objectForPrimaryKey('DataLogHub', hubId) as DataLogHub;
        if (hub && hub.entries) {
          hub.entries.push({
            _id: encryptedData._id,
            timestamp: new Date(),
          });
        }

        (userData as any).updatedAt = new Date();
      });
      
      // Trigger sync if needed
      const syncService = getSyncService();
      const userData = realm.objects('UserData')[0] as UserData;
      if (userData && userData.syncPreference !== 'local') {
        await syncService.syncEncryptedData(category);
      }
      
      // Update sync status
      setSyncStatus(syncService.getSyncStatus());
      
      console.log(`Saved encrypted ${category} data successfully`);
    } catch (error) {
      console.error('Error saving encrypted data:', error);
    }
  };

  const getDoctorAdvices = () => {
    if (!isRealmReady) return [];
    
    try {
      const realm = getRealm();
      const userDataArray = realm.objects('UserData') as UserData[];
      const userData = userDataArray[0];
      return userData?.doctorAdvices ? Array.from(userData.doctorAdvices) : [];
    } catch (error) {
      console.error('Error getting doctor advices:', error);
      return [];
    }
  };

  const addDoctorAdvice = async (doctorId: string, advice: string, category: string) => {
    if (!isRealmReady) {
      console.warn('Database not ready, cannot add doctor advice');
      return;
    }

    try {
      const realm = getRealm();
      
      realm.write(() => {
        const userDataArray = realm.objects('UserData') as UserData[];
        let userData = userDataArray[0];
        if (!userData) {
          userData = realm.create('UserData', {
            _id: BSON.ObjectId().toString(),
            rephraseKey: 'default-key',
            createdAt: new Date(),
            updatedAt: new Date(),
            syncPreference: syncPreference,
            doctorAdvices: [],
          }) as UserData;
        }

        if (userData.doctorAdvices) {
          userData.doctorAdvices.push({
            _id: BSON.ObjectId().toString(),
            doctorId,
            advice,
            timestamp: new Date(),
            category,
          });
        }

        (userData as any).updatedAt = new Date();
      });
      
      console.log('Added doctor advice successfully');
    } catch (error) {
      console.error('Error adding doctor advice:', error);
    }
  };

  const triggerManualSync = async (): Promise<boolean> => {
    if (!isRealmReady) return false;
    
    try {
      const realm = getRealm();
      const userData = realm.objects('UserData')[0] as UserData;
      
      if (!userData || userData.syncPreference === 'local') {
        console.log('Manual sync skipped - local-only mode');
        return true;
      }

      const syncService = getSyncService();
      const success = await syncService.syncUserData(userData);
      
      if (success) {
        await syncService.syncEncryptedData('mood');
        await syncService.syncEncryptedData('chat');
        await syncService.syncEncryptedData('health');
      }
      
      setSyncStatus(syncService.getSyncStatus());
      return success;
    } catch (error) {
      console.error('Error during manual sync:', error);
      return false;
    }
  };

  return (
    <DatabaseContext.Provider value={{
      isRealmReady,
      syncPreference,
      setSyncPreference,
      saveEncryptedData,
      getDoctorAdvices,
      addDoctorAdvice,
      syncStatus,
      databaseHealth,
      triggerManualSync,
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
