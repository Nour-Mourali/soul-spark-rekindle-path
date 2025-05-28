
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';

interface WellnessScoreProps {
  currentScore: number;
  previousScore?: number;
  breakdown: {
    mood: number;
    energy: number;
    sleep: number;
    stress: number;
    activity: number;
  };
}

const WellnessScore: React.FC<WellnessScoreProps> = ({
  currentScore,
  previousScore,
  breakdown
}) => {
  const getTrend = () => {
    if (!previousScore) return null;
    const diff = currentScore - previousScore;
    if (diff > 5) return { icon: TrendingUp, color: 'text-green-600', text: 'Improving' };
    if (diff < -5) return { icon: TrendingDown, color: 'text-red-600', text: 'Declining' };
    return { icon: Minus, color: 'text-gray-600', text: 'Stable' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'Excellent', variant: 'default' as const };
    if (score >= 80) return { label: 'Great', variant: 'secondary' as const };
    if (score >= 70) return { label: 'Good', variant: 'outline' as const };
    if (score >= 60) return { label: 'Fair', variant: 'outline' as const };
    return { label: 'Needs Attention', variant: 'destructive' as const };
  };

  const trend = getTrend();
  const scoreBadge = getScoreBadge(currentScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Wellness Score
          </span>
          <Badge variant={scoreBadge.variant}>{scoreBadge.label}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(currentScore)}`}>
              {currentScore}
            </div>
            <div className="text-sm text-gray-500">out of 100</div>
            {trend && (
              <div className={`flex items-center justify-center mt-2 ${trend.color}`}>
                <trend.icon className="h-4 w-4 mr-1" />
                <span className="text-sm">{trend.text}</span>
                {previousScore && (
                  <span className="text-xs ml-1">
                    ({currentScore > previousScore ? '+' : ''}{currentScore - previousScore})
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Breakdown</h4>
            {Object.entries(breakdown).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{key}</span>
                  <span>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-1">
              Ways to Improve
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              {breakdown.mood < 70 && <p>• Try mood tracking and gratitude journaling</p>}
              {breakdown.energy < 70 && <p>• Focus on regular exercise and nutrition</p>}
              {breakdown.sleep < 70 && <p>• Establish a consistent sleep schedule</p>}
              {breakdown.stress > 30 && <p>• Practice stress reduction techniques</p>}
              {breakdown.activity < 60 && <p>• Increase daily physical activity</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessScore;
