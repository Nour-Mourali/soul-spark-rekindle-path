
// Synchronization service for MongoDB Atlas integration
import { localDB, UserData, EncryptedData, SyncStatus } from '../database/localStorage';
import { createMongoAtlasSync, MongoAtlasSync } from '../database/mongoAtlas';

export class SyncService {
  private mongoSync: MongoAtlasSync | null = null;
  private syncInProgress = false;
  private syncIntervals = new Map<string, NodeJS.Timeout>();

  constructor(private apiKey?: string) {
    if (apiKey) {
      this.mongoSync = createMongoAtlasSync(apiKey);
    }
  }

  async initialize(apiKey?: string): Promise<boolean> {
    if (apiKey && !this.mongoSync) {
      this.mongoSync = createMongoAtlasSync(apiKey);
    }

    if (this.mongoSync) {
      const connected = await this.mongoSync.connect();
      if (connected) {
        console.log('Sync service initialized with MongoDB Atlas');
        return true;
      }
    }

    console.log('Sync service initialized in local-only mode');
    return false;
  }

  async syncUserData(userData: UserData): Promise<boolean> {
    if (!this.mongoSync || userData.syncPreference === 'local') {
      console.log('Skipping sync - local-only mode');
      return true;
    }

    try {
      this.syncInProgress = true;
      const success = await this.mongoSync.syncUserData(userData);
      
      if (success) {
        // Update local record with sync timestamp
        localDB.update('UserData', userData._id, {
          lastSynced: new Date()
        } as Partial<UserData>);
      }

      return success;
    } catch (error) {
      console.error('Error syncing user data:', error);
      return false;
    } finally {
      this.syncInProgress = false;
    }
  }

  async syncEncryptedData(category: 'mood' | 'chat' | 'health'): Promise<boolean> {
    if (!this.mongoSync) {
      console.log('Skipping encrypted data sync - local-only mode');
      return true;
    }

    try {
      const encryptedData = localDB.find<EncryptedData>('EncryptedData', { category });
      if (encryptedData.length === 0) {
        return true;
      }

      const success = await this.mongoSync.syncEncryptedData(encryptedData);
      return success;
    } catch (error) {
      console.error('Error syncing encrypted data:', error);
      return false;
    }
  }

  startPeriodicSync(userData: UserData): void {
    this.stopPeriodicSync(userData._id);

    if (userData.syncPreference === 'local' || !this.mongoSync) {
      return;
    }

    const interval = userData.syncPreference === 'daily' 
      ? 24 * 60 * 60 * 1000  // 24 hours
      : 7 * 24 * 60 * 60 * 1000; // 7 days

    const syncInterval = setInterval(async () => {
      console.log(`Starting periodic sync for user ${userData._id}`);
      await this.syncUserData(userData);
      await this.syncEncryptedData('mood');
      await this.syncEncryptedData('chat');
      await this.syncEncryptedData('health');
    }, interval);

    this.syncIntervals.set(userData._id, syncInterval);
    console.log(`Periodic sync started for user ${userData._id} (${userData.syncPreference})`);
  }

  stopPeriodicSync(userId: string): void {
    const interval = this.syncIntervals.get(userId);
    if (interval) {
      clearInterval(interval);
      this.syncIntervals.delete(userId);
      console.log(`Periodic sync stopped for user ${userId}`);
    }
  }

  getSyncStatus(): SyncStatus {
    return {
      isOnline: navigator.onLine && !!this.mongoSync,
      lastSync: this.getLastSyncTime(),
      pendingOperations: this.getPendingOperationsCount(),
      syncInProgress: this.syncInProgress
    };
  }

  private getLastSyncTime(): Date | null {
    try {
      const userData = localDB.find<UserData>('UserData')[0];
      return userData?.lastSynced || null;
    } catch {
      return null;
    }
  }

  private getPendingOperationsCount(): number {
    try {
      const userData = localDB.find<UserData>('UserData')[0];
      if (!userData || userData.syncPreference === 'local') {
        return 0;
      }

      const lastSync = userData.lastSynced;
      if (!lastSync) {
        return localDB.find('EncryptedData').length;
      }

      const pendingData = localDB.find<EncryptedData>('EncryptedData')
        .filter(item => new Date(item.timestamp) > lastSync);
      
      return pendingData.length;
    } catch {
      return 0;
    }
  }

  async cleanup(): Promise<void> {
    // Stop all periodic syncs
    this.syncIntervals.forEach((interval, userId) => {
      this.stopPeriodicSync(userId);
    });

    // Disconnect from MongoDB
    if (this.mongoSync) {
      await this.mongoSync.disconnect();
      this.mongoSync = null;
    }

    console.log('Sync service cleaned up');
  }
}

// Singleton instance
let syncServiceInstance: SyncService | null = null;

export const getSyncService = (): SyncService => {
  if (!syncServiceInstance) {
    syncServiceInstance = new SyncService();
  }
  return syncServiceInstance;
};

export const initializeSyncService = async (apiKey?: string): Promise<boolean> => {
  const service = getSyncService();
  return await service.initialize(apiKey);
};
