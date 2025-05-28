
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import HealthMetrics from '@/components/HealthMetrics';
import StatusSlider from '@/components/StatusSlider';
import MoodTracker from '@/components/MoodTracker';
import BreathingExercise from '@/components/BreathingExercise';
import WeeklyChart from '@/components/WeeklyChart';
import GratitudeJournal from '@/components/GratitudeJournal';
import WellnessTips from '@/components/WellnessTips';
import { MessageSquare, Settings, Bell, Database } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { healthData, updateStatus } = useHealth();
  const { unreadCount } = useNotifications();
  const { isRealmReady, syncPreference, saveEncryptedData } = useDatabase();
  const navigate = useNavigate();

  const handleStatusUpdate = async (type: string, value: number) => {
    const updatedStatus = {
      energy: type === 'energy' ? value : healthData.energy,
      happiness: type === 'happiness' ? value : healthData.happiness,
      productivity: type === 'productivity' ? value : healthData.productivity,
      stress: type === 'stress' ? value : healthData.stress,
    };
    
    updateStatus(updatedStatus);
    
    // Save to encrypted database
    await saveEncryptedData({
      type: 'mood_log',
      data: updatedStatus,
      timestamp: new Date(),
    }, 'mood');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mental-lightGray to-white p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hello, {user?.nickname || 'there'}! 👋
            </h1>
            <p className="text-gray-600">How are you feeling today?</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/settings')}
              className="relative"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="relative"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Database Status */}
        <Card className="border-l-4 border-l-mental-purple">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-mental-purple" />
                <span className="text-sm font-medium">
                  Database: {isRealmReady ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                Sync: {syncPreference}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <HealthMetrics
          heartRate={healthData.heartRate}
          steps={healthData.steps}
          energy={healthData.energy}
          happiness={healthData.happiness}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Status Check-in */}
            <Card>
              <CardHeader>
                <CardTitle className="text-mental-purple">Status Check-in</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <StatusSlider
                  label="Energy Level"
                  value={healthData.energy}
                  onChange={(value) => handleStatusUpdate('energy', value)}
                  colorClass="bg-yellow-100 text-yellow-600"
                />
                <StatusSlider
                  label="Happiness"
                  value={healthData.happiness}
                  onChange={(value) => handleStatusUpdate('happiness', value)}
                  colorClass="bg-green-100 text-green-600"
                />
                <StatusSlider
                  label="Productivity"
                  value={healthData.productivity}
                  onChange={(value) => handleStatusUpdate('productivity', value)}
                  colorClass="bg-blue-100 text-blue-600"
                />
                <StatusSlider
                  label="Stress Level"
                  value={healthData.stress}
                  onChange={(value) => handleStatusUpdate('stress', value)}
                  colorClass="bg-red-100 text-red-600"
                />
              </CardContent>
            </Card>

            {/* Mood Tracker */}
            <MoodTracker />

            {/* Gratitude Journal */}
            <GratitudeJournal />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Weekly Chart */}
            <WeeklyChart />

            {/* Breathing Exercise */}
            <BreathingExercise />

            {/* Wellness Tips */}
            <WellnessTips />
          </div>
        </div>

        {/* Chat Assistant */}
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-mental-purple mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chat with Your Assistant</h3>
            <p className="text-gray-600 mb-4">
              Ready to talk about your mental wellness? I'm here to listen and support you.
            </p>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-mental-purple hover:bg-mental-darkPurple text-white"
            >
              Start Conversation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
