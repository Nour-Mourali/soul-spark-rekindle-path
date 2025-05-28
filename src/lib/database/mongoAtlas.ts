
// MongoDB Atlas Data API integration for cloud sync (web-compatible)
import { UserData, EncryptedData, encryptData, decryptData } from './localStorage';

interface MongoConfig {
  dataApiUrl: string;
  apiKey: string;
  databaseName: string;
  dataSource: string;
}

interface AtlasAPIResponse<T = any> {
  document?: T;
  documents?: T[];
  insertedId?: string;
  matchedCount?: number;
  modifiedCount?: number;
}

export class MongoAtlasSync {
  private config: MongoConfig;
  private isConnected = false;

  constructor(config: MongoConfig) {
    this.config = config;
  }

  async connect(): Promise<boolean> {
    try {
      if (this.isConnected) {
        return true;
      }

      console.log('Connecting to MongoDB Atlas Data API...');
      
      // Test connection with a simple find operation
      const response = await this.makeRequest('findOne', 'userData', {
        filter: { _id: 'test' },
        limit: 1
      });

      if (response.ok) {
        this.isConnected = true;
        console.log('Connected to MongoDB Atlas Data API successfully');
        return true;
      } else {
        console.error('Failed to connect to MongoDB Atlas Data API');
        return false;
      }
    } catch (error) {
      console.error('Failed to connect to MongoDB Atlas:', error);
      this.isConnected = false;
      return false;
    }
  }

  async disconnect(): Promise<void> {
    this.isConnected = false;
    console.log('Disconnected from MongoDB Atlas Data API');
  }

  private async makeRequest(action: string, collection: string, data: any): Promise<Response> {
    const url = `${this.config.dataApiUrl}/action/${action}`;
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
      },
      body: JSON.stringify({
        dataSource: this.config.dataSource,
        database: this.config.databaseName,
        collection,
        ...data
      })
    });
  }

  async syncUserData(userData: UserData): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      // Encrypt sensitive data before syncing
      const encryptedUserData = {
        ...userData,
        doctorAdvices: userData.doctorAdvices.map(advice => ({
          ...advice,
          advice: encryptData(advice.advice)
        })),
        lastSynced: new Date()
      };

      const response = await this.makeRequest('replaceOne', 'userData', {
        filter: { _id: userData._id },
        replacement: encryptedUserData,
        upsert: true
      });

      if (response.ok) {
        console.log('User data synced to MongoDB Atlas');
        return true;
      } else {
        console.error('Failed to sync user data:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error syncing user data:', error);
      return false;
    }
  }

  async syncEncryptedData(data: EncryptedData[]): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      if (data.length === 0) {
        return true;
      }

      // Use insertMany for bulk operations
      const dataWithSync = data.map(item => ({
        ...item,
        lastSynced: new Date()
      }));

      const response = await this.makeRequest('insertMany', 'encryptedData', {
        documents: dataWithSync
      });

      if (response.ok) {
        console.log(`Synced ${data.length} encrypted data items to MongoDB Atlas`);
        return true;
      } else {
        console.error('Failed to sync encrypted data:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error syncing encrypted data:', error);
      return false;
    }
  }

  async fetchUserData(userId: string): Promise<UserData | null> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const response = await this.makeRequest('findOne', 'userData', {
        filter: { _id: userId }
      });

      if (response.ok) {
        const result: AtlasAPIResponse<UserData> = await response.json();
        const userData = result.document;

        if (userData) {
          // Decrypt sensitive data after fetching
          userData.doctorAdvices = userData.doctorAdvices.map(advice => ({
            ...advice,
            advice: decryptData(advice.advice)
          }));
        }

        return userData || null;
      } else {
        console.error('Failed to fetch user data:', await response.text());
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  async getConnectionStatus(): Promise<boolean> {
    return this.isConnected;
  }
}

// Factory function to create MongoDB Atlas sync instance
export const createMongoAtlasSync = (apiKey: string, dataApiUrl?: string): MongoAtlasSync => {
  return new MongoAtlasSync({
    dataApiUrl: dataApiUrl || 'https://data.mongodb-api.com/app/data-yourapp/endpoint/data/v1',
    apiKey,
    databaseName: 'mental_health_app',
    dataSource: 'Cluster0'
  });
};
