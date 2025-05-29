
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
import WellnessProgressRing from '@/components/WellnessProgressRing';
import { MessageSquare, Settings, Bell, Database, Heart, Sparkles, Activity, Sun } from 'lucide-react';

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

  // Calculate overall wellness score
  const wellnessScore = Math.round(
    ((healthData.energy + healthData.happiness + healthData.productivity + (5 - healthData.stress)) / 4) * 20
  );

  return (
    <div className="min-h-screen wellness-warm-bg p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Good morning, {user?.nickname || 'there'}!
                </h1>
                <p className="text-muted-foreground">How are you feeling today?</p>
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

        {/* Wellness Score Card */}
        <Card className="wellness-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <WellnessProgressRing
                    value={wellnessScore}
                    size={100}
                    strokeWidth={8}
                    color="hsl(var(--primary))"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold wellness-sage">{wellnessScore}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </WellnessProgressRing>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">Wellness Score</h3>
                    <p className="text-sm text-muted-foreground">Based on your daily check-ins</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {wellnessScore >= 80 ? 'Excellent' : wellnessScore >= 60 ? 'Good' : 'Improving'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="wellness-button-primary"
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card className="wellness-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Database Status</span>
                  <p className="text-sm text-muted-foreground">
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

        {/* Quick Health Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="wellness-card">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Heart Rate</p>
                  <p className="text-lg font-semibold">{healthData.heartRate} bpm</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Steps</p>
                  <p className="text-lg font-semibold">{healthData.steps.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Energy</p>
                  <p className="text-lg font-semibold">{healthData.energy}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Heart className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Happiness</p>
                  <p className="text-lg font-semibold">{healthData.happiness}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Status Check-in */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
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
          <div className="space-y-6">
            <WeeklyChart />
            <BreathingExercise />
            <WellnessTips />
          </div>
        </div>

        {/* AI Chat Assistant */}
        <Card className="wellness-card">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-accent ml-2" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Chat with Telepathy AI</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your personal AI therapist is ready to listen, understand, and guide you 
              through your mental wellness journey.
            </p>
            <Button 
              onClick={() => navigate('/chat')}
              className="wellness-button-primary px-8 py-3 text-lg"
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
