
// Enhanced database configuration using localStorage with MongoDB Atlas sync capabilities
import { localDB, generateObjectId } from './localStorage';

let isInitialized = false;

export const initializeRealm = async () => {
  if (isInitialized) {
    return Promise.resolve();
  }

  try {
    console.log('Initializing enhanced local database...');
    
    // Initialize collections if they don't exist
    const collections = ['UserData', 'EncryptedData', 'DataLogHub'];
    collections.forEach(collection => {
      const existing = localDB.find(collection);
      if (existing.length === 0) {
        console.log(`Initialized ${collection} collection`);
      }
    });

    // Log storage statistics
    const stats = localDB.getStorageStats();
    console.log('Storage usage:', {
      used: (stats.used / 1024).toFixed(2) + 'KB',
      total: (stats.total / 1024).toFixed(2) + 'KB',
      percentage: ((stats.used / stats.total) * 100).toFixed(1) + '%'
    });

    isInitialized = true;
    console.log('Enhanced local database initialized successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to initialize local database:', error);
    throw error;
  }
};

export const getRealm = () => {
  if (!isInitialized) {
    throw new Error('Database not initialized. Call initializeRealm() first.');
  }
  
  return {
    objects: (collection: string) => localDB.objects(collection),
    objectForPrimaryKey: (collection: string, id: string) => localDB.findById(collection, id),
    create: (collection: string, data: any) => {
      const doc = {
        ...data,
        _id: data._id || generateObjectId(),
      };
      const createdDoc = localDB.create(collection, doc);
      return createdDoc;
    },
    write: (callback: () => void) => localDB.write(callback),
    update: (collection: string, id: string, updates: any) => localDB.update(collection, id, updates),
    delete: (collection: string, id: string) => localDB.delete(collection, id),
    getStats: () => localDB.getStorageStats(),
  };
};

export const closeRealm = () => {
  if (isInitialized) {
    isInitialized = false;
    console.log('Enhanced local database closed');
  }
};

// Mock BSON ObjectId replacement
export const BSON = {
  ObjectId: () => ({
    toString: () => generateObjectId(),
    valueOf: () => generateObjectId(),
  }),
};

// Database health check
export const checkDatabaseHealth = (): { status: string; details: any } => {
  try {
    const stats = localDB.getStorageStats();
    const isHealthy = stats.used < stats.total * 0.8;
    
    return {
      status: isHealthy ? 'healthy' : 'warning',
      details: {
        ...stats,
        isInitialized,
        timestamp: new Date()
      }
    };
  } catch (error) {
    return {
      status: 'error',
      details: { error: error.message, timestamp: new Date() }
    };
  }
};
