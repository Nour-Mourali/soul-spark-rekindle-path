
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Target, Zap } from 'lucide-react';

interface HealthMetricsProps {
  heartRate: number;
  steps: number;
  energy: number;
  happiness: number;
}

const HealthMetrics: React.FC<HealthMetricsProps> = ({ heartRate, steps, energy, happiness }) => {
  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { color: 'bg-blue-500', status: 'Low' };
    if (hr > 100) return { color: 'bg-red-500', status: 'High' };
    return { color: 'bg-green-500', status: 'Normal' };
  };

  const heartRateStatus = getHeartRateStatus(heartRate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm font-medium">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            Heart Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{heartRate}</span>
            <Badge className={`${heartRateStatus.color} text-white`}>
              {heartRateStatus.status}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">bpm</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm font-medium">
            <Activity className="h-4 w-4 mr-2 text-blue-500" />
            Steps Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{steps.toLocaleString()}</span>
              <Target className="h-4 w-4 text-gray-400" />
            </div>
            <Progress value={(steps / 10000) * 100} className="h-2" />
            <p className="text-xs text-gray-500">Goal: 10,000 steps</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm font-medium">
            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
            Energy Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <span className="text-2xl font-bold">{energy}/5</span>
            <Progress value={(energy / 5) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm font-medium">
            <Heart className="h-4 w-4 mr-2 text-pink-500" />
            Happiness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <span className="text-2xl font-bold">{happiness}/5</span>
            <Progress value={(happiness / 5) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetrics;
