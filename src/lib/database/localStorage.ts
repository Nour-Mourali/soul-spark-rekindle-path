
// Enhanced localStorage-based database implementation
// With improved error handling, validation, and sync capabilities

export interface EncryptedData {
  _id: string;
  encryptedPayload: string;
  _v: number;
  timestamp: Date;
  category: 'mood' | 'chat' | 'health';
}

export interface DataLogHub {
  _id: string;
  entries: Array<{ _id: string; timestamp: Date }>;
  lastSynced?: Date;
}

export interface UserData {
  _id: string;
  rephraseKey: string;
  createdAt: Date;
  updatedAt: Date;
  moodLogHubId?: string;
  chatHubId?: string;
  healthRecordHubId?: string;
  syncPreference: 'local' | 'daily' | 'weekly';
  doctorAdvices: Array<{
    _id: string;
    doctorId: string;
    advice: string;
    timestamp: Date;
    category: string;
  }>;
  lastSynced?: Date;
}

export interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingOperations: number;
  syncInProgress: boolean;
}

// Simple ObjectId generator
export const generateObjectId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Enhanced encryption utilities
export const encryptData = (data: any): string => {
  try {
    // Base64 encoding for demo (in production, use proper AES-256 encryption)
    return btoa(JSON.stringify({
      data,
      timestamp: new Date().toISOString(),
      version: 1
    }));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

export const decryptData = (encryptedPayload: string): any => {
  try {
    const decoded = atob(encryptedPayload);
    const parsed = JSON.parse(decoded);
    return parsed.data;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

class EnhancedLocalStorageDB {
  private getKey(collection: string): string {
    return `mental_health_${collection}`;
  }

  private getData<T>(collection: string): T[] {
    try {
      const data = localStorage.getItem(this.getKey(collection));
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error(`Error reading ${collection} from localStorage:`, error);
      return [];
    }
  }

  private setData<T>(collection: string, data: T[]): void {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
      }
      localStorage.setItem(this.getKey(collection), JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing ${collection} to localStorage:`, error);
      throw error;
    }
  }

  // Validate document structure
  private validateDocument<T extends { _id: string }>(document: T, collection: string): void {
    if (!document._id) {
      throw new Error(`Document in ${collection} must have an _id field`);
    }
  }

  // Create a new document with validation
  create<T extends { _id: string }>(collection: string, document: Omit<T, '_id'> & Partial<Pick<T, '_id'>>): T {
    try {
      const data = this.getData<T>(collection);
      const newDoc = {
        ...document,
        _id: document._id || generateObjectId(),
      } as T;
      
      this.validateDocument(newDoc, collection);
      data.push(newDoc);
      this.setData(collection, data);
      
      console.log(`Created document in ${collection}:`, newDoc._id);
      return newDoc;
    } catch (error) {
      console.error(`Error creating document in ${collection}:`, error);
      throw error;
    }
  }

  // Find documents by query with improved error handling
  find<T>(collection: string, query?: Partial<T>): T[] {
    try {
      const data = this.getData<T>(collection);
      
      if (!query) {
        return data;
      }

      return data.filter(item => {
        return Object.keys(query).every(key => {
          return (item as any)[key] === (query as any)[key];
        });
      });
    } catch (error) {
      console.error(`Error finding documents in ${collection}:`, error);
      return [];
    }
  }

  // Find one document
  findOne<T>(collection: string, query?: Partial<T>): T | null {
    const results = this.find<T>(collection, query);
    return results.length > 0 ? results[0] : null;
  }

  // Find by ID with validation
  findById<T extends { _id: string }>(collection: string, id: string): T | null {
    if (!id) {
      console.warn('findById called with empty id');
      return null;
    }
    return this.findOne<T>(collection, { _id: id } as Partial<T>);
  }

  // Update a document with validation
  update<T extends { _id: string }>(collection: string, id: string, updates: Partial<T>): T | null {
    try {
      const data = this.getData<T>(collection);
      const index = data.findIndex(item => item._id === id);
      
      if (index === -1) {
        console.warn(`Document with id ${id} not found in ${collection}`);
        return null;
      }

      data[index] = { ...data[index], ...updates };
      this.setData(collection, data);
      
      console.log(`Updated document in ${collection}:`, id);
      return data[index];
    } catch (error) {
      console.error(`Error updating document in ${collection}:`, error);
      throw error;
    }
  }

  // Delete a document
  delete(collection: string, id: string): boolean {
    try {
      const data = this.getData(collection);
      const index = data.findIndex((item: any) => item._id === id);
      
      if (index === -1) {
        console.warn(`Document with id ${id} not found in ${collection}`);
        return false;
      }

      data.splice(index, 1);
      this.setData(collection, data);
      
      console.log(`Deleted document from ${collection}:`, id);
      return true;
    } catch (error) {
      console.error(`Error deleting document from ${collection}:`, error);
      throw error;
    }
  }

  // Transaction-like write operation with error handling
  write(callback: () => void): void {
    try {
      callback();
    } catch (error) {
      console.error('Error in write transaction:', error);
      throw error;
    }
  }

  // Get all objects of a type (Realm-like interface)
  objects<T>(collection: string): T[] {
    return this.getData<T>(collection);
  }

  // Get storage usage statistics
  getStorageStats(): { used: number; total: number; collections: Record<string, number> } {
    const collections: Record<string, number> = {};
    let totalUsed = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('mental_health_')) {
        const value = localStorage.getItem(key);
        const size = value ? value.length : 0;
        collections[key] = size;
        totalUsed += size;
      }
    }

    return {
      used: totalUsed,
      total: 5 * 1024 * 1024, // 5MB typical localStorage limit
      collections
    };
  }

  // Clear all data (for development/testing)
  clearAll(): void {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('mental_health_')) {
        keys.push(key);
      }
    }
    keys.forEach(key => localStorage.removeItem(key));
    console.log('Cleared all mental health data from localStorage');
  }
}

export const localDB = new EnhancedLocalStorageDB();
