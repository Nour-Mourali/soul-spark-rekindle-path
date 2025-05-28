
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
import { MessageSquare, Settings, Bell, Database, Brain, Sparkles } from 'lucide-react';

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
    
    await saveEncryptedData({
      type: 'mood_log',
      data: updatedStatus,
      timestamp: new Date(),
    }, 'mood');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {user?.nickname || 'there'}! 
                </h1>
                <p className="text-gray-600 text-lg">How are you feeling today?</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/settings')}
              className="relative bg-white border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="relative bg-white border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Database Status */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Database Status
                  </span>
                  <p className="text-sm text-gray-600">
                    {isRealmReady ? 'Connected & Syncing' : 'Offline Mode'}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {syncPreference}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Status Check-in */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Daily Check-in
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <StatusSlider
                  label="Energy Level"
                  value={healthData.energy}
                  onChange={(value) => handleStatusUpdate('energy', value)}
                  colorClass="bg-yellow-100 text-yellow-700"
                />
                <StatusSlider
                  label="Happiness"
                  value={healthData.happiness}
                  onChange={(value) => handleStatusUpdate('happiness', value)}
                  colorClass="bg-green-100 text-green-700"
                />
                <StatusSlider
                  label="Productivity"
                  value={healthData.productivity}
                  onChange={(value) => handleStatusUpdate('productivity', value)}
                  colorClass="bg-blue-100 text-blue-700"
                />
                <StatusSlider
                  label="Stress Level"
                  value={healthData.stress}
                  onChange={(value) => handleStatusUpdate('stress', value)}
                  colorClass="bg-red-100 text-red-700"
                />
              </CardContent>
            </Card>

            <MoodTracker />
            <GratitudeJournal />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <WeeklyChart />
            <BreathingExercise />
            <WellnessTips />
          </div>
        </div>

        {/* AI Chat Assistant */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-xl rounded-3xl text-white">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-yellow-300 ml-2" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Chat with Telepathy AI</h3>
            <p className="text-indigo-100 mb-6 text-lg leading-relaxed">
              Your personal AI therapist is ready to listen, understand, and guide you 
              through your mental wellness journey.
            </p>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300"
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
