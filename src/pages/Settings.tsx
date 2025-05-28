
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const { syncPreference, setSyncPreference, isRealmReady } = useDatabase();
  const navigate = useNavigate();

  const handleSyncPreferenceChange = (value: string) => {
    setSyncPreference(value as 'local' | 'daily' | 'weekly');
    toast.success(`Sync preference updated to ${value}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mental-lightGray to-white p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Database Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-mental-purple">
              <Database className="h-5 w-5 mr-2" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isRealmReady ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                MongoDB Realm: {isRealmReady ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Data Sync Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-mental-purple">
              <RefreshCw className="h-5 w-5 mr-2" />
              Data Synchronization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Choose how often your data should sync with the cloud database:
            </p>
            
            <RadioGroup value={syncPreference} onValueChange={handleSyncPreferenceChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="local" id="local" />
                <Label htmlFor="local" className="text-sm">
                  Local Only - Keep all data on this device
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="text-sm">
                  Daily Sync - Upload data once per day
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly" className="text-sm">
                  Weekly Sync - Upload data once per week
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-mental-purple">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 leading-relaxed">
              All your data is encrypted using AES-256 encryption before being stored. 
              Only you have access to your encryption key. Even with cloud sync enabled, 
              your data remains private and secure.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
