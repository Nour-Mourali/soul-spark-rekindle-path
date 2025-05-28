
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
import { MessageSquare, Settings, Bell, Database, Brain, Sparkles, TrendingUp } from 'lucide-react';

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
    <div className="freud-section p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start pt-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Hi, {user?.nickname || 'Shinomiya'}! 👋
            </h1>
            <p className="text-gray-600">How are you feeling today?</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/settings')}
              className="freud-button-secondary"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="freud-button-secondary relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mental Health Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="freud-score-card">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">80</div>
              <div className="text-sm text-green-700 font-medium">Mentally Stable</div>
            </CardContent>
          </Card>
          
          <Card className="freud-metric-card">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{healthData.steps}</div>
                  <div className="text-sm text-gray-600">Steps Today</div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Status */}
        <Card className="freud-card-minimal">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900">
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

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="freud-metric-card">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{healthData.heartRate}</div>
                  <div className="text-sm text-gray-600">Heart Rate</div>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="freud-metric-card">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{healthData.energy}/5</div>
                  <div className="text-sm text-gray-600">Energy Level</div>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Status Check-in */}
            <Card className="freud-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Daily Check-in
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
          <div className="space-y-6">
            <WeeklyChart />
            <BreathingExercise />
            <WellnessTips />
          </div>
        </div>

        {/* AI Chat Assistant */}
        <Card className="freud-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <Sparkles className="w-5 h-5 text-yellow-300 ml-2" />
            </div>
            <h3 className="text-xl font-bold mb-2">Chat with Telepathy AI</h3>
            <p className="text-indigo-100 mb-4 text-sm leading-relaxed">
              Your personal AI therapist is ready to listen and guide you.
            </p>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-white text-indigo-600 hover:bg-gray-50 px-6 py-2 text-sm font-medium rounded-xl shadow-sm transition-all duration-200"
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
