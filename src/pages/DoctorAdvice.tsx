import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { useChat } from '@/contexts/ChatContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Stethoscope, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const DoctorAdvice: React.FC = () => {
  const { user } = useAuth();
  const { healthData } = useHealth();
  const { chatSessions } = useChat();
  const { syncPreference, setSyncPreference, getDoctorAdvices, saveEncryptedData } = useDatabase();
  const navigate = useNavigate();
  
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
  const [shareOptions, setShareOptions] = useState({
    moodLogs: false,
    healthRecords: false,
    chatLogs: false,
  });

  const doctorAdvices = getDoctorAdvices();

  const handleShareOptionChange = (option: keyof typeof shareOptions) => {
    setShareOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleShareData = async () => {
    if (!doctorEmail && !doctorPhone) {
      toast.error('Please provide doctor contact information');
      return;
    }

    if (!shareOptions.moodLogs && !shareOptions.healthRecords && !shareOptions.chatLogs) {
      toast.error('Please select at least one data type to share');
      return;
    }

    // Save data to encrypted database based on sync preference
    const shareData = {
      doctorEmail,
      doctorPhone,
      shareOptions,
      userData: user,
      healthData: shareOptions.healthRecords ? healthData : null,
      chatData: shareOptions.chatLogs ? chatSessions : null,
      timestamp: new Date(),
      syncPreference,
    };

    try {
      await saveEncryptedData(shareData, 'health');
      console.log('Sharing data with doctor:', shareData);
      
      if (syncPreference === 'local') {
        toast.success('Data saved locally and ready to share with your healthcare provider');
      } else {
        toast.success(`Data will be synced ${syncPreference} and shared with your healthcare provider`);
      }
    } catch (error) {
      toast.error('Failed to save data');
      console.error('Error saving data:', error);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Doctor Advice & Data Sharing</h1>
        </div>

        <Tabs defaultValue="share" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share Data</TabsTrigger>
            <TabsTrigger value="advice">Doctor Advice</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-6">
            {/* Data Sync Preference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-mental-purple">Data Synchronization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Choose how to handle your data:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {[
                      { value: 'local', label: 'Keep Local Only' },
                      { value: 'daily', label: 'Sync Daily' },
                      { value: 'weekly', label: 'Sync Weekly' }
                    ].map(option => (
                      <Button
                        key={option.value}
                        variant={syncPreference === option.value ? 'default' : 'outline'}
                        onClick={() => setSyncPreference(option.value as any)}
                        className="text-sm"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-mental-purple">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Healthcare Provider Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor's Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="doctor@example.com"
                      value={doctorEmail}
                      onChange={(e) => setDoctorEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor's Phone (Optional)
                  </label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={doctorPhone}
                      onChange={(e) => setDoctorPhone(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-mental-purple">
                  <Share2 className="h-5 w-5 mr-2" />
                  Select Data to Share
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="moodLogs"
                      checked={shareOptions.moodLogs}
                      onCheckedChange={() => handleShareOptionChange('moodLogs')}
                    />
                    <div>
                      <label htmlFor="moodLogs" className="text-sm font-medium">
                        Mood Logs & Status Check-ins
                      </label>
                      <p className="text-sm text-gray-600">
                        Share your daily energy, happiness, productivity, and stress ratings
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Current data: Energy {healthData.energy}/5, Happiness {healthData.happiness}/5, 
                        Productivity {healthData.productivity}/5, Stress {healthData.stress}/5
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="healthRecords"
                      checked={shareOptions.healthRecords}
                      onCheckedChange={() => handleShareOptionChange('healthRecords')}
                    />
                    <div>
                      <label htmlFor="healthRecords" className="text-sm font-medium">
                        Health Records & Metrics
                      </label>
                      <p className="text-sm text-gray-600">
                        Share your physical health data including heart rate and activity levels
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Current data: Heart Rate {healthData.heartRate} bpm, Steps {healthData.steps.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="chatLogs"
                      checked={shareOptions.chatLogs}
                      onCheckedChange={() => handleShareOptionChange('chatLogs')}
                    />
                    <div>
                      <label htmlFor="chatLogs" className="text-sm font-medium">
                        Mental Health Assistant Conversations
                      </label>
                      <p className="text-sm text-gray-600">
                        Share your conversations with the AI assistant for mental health insights
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {chatSessions.length} conversation(s) available
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleShareData}
                    className="bg-mental-purple hover:bg-mental-darkPurple text-white w-full"
                  >
                    Share Selected Data with Healthcare Provider
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy & Security Notice</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your data is encrypted using AES-256 encryption before storage. 
                  {syncPreference === 'local' 
                    ? ' All data stays on your device until you choose to share it.'
                    : ` Data will be synced ${syncPreference} to MongoDB Atlas with end-to-end encryption.`
                  } You can revoke access at any time by contacting your healthcare provider directly.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-mental-purple">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Doctor Advice & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {doctorAdvices.length === 0 ? (
                  <div className="text-center py-8">
                    <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No doctor advice available yet.</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Share your data with your healthcare provider to receive personalized advice.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {doctorAdvices.map((advice, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">Dr. {advice.doctorId}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(advice.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{advice.advice}</p>
                        <span className="inline-block bg-mental-purple/10 text-mental-purple text-xs px-2 py-1 rounded">
                          {advice.category}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorAdvice;
