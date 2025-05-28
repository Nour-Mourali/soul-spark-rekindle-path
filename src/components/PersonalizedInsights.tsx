
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface Insight {
  id: string;
  type: 'positive' | 'warning' | 'suggestion' | 'achievement';
  title: string;
  description: string;
  actionable?: string;
  confidence: number;
}

const PersonalizedInsights: React.FC = () => {
  const insights: Insight[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Consistent Sleep Pattern',
      description: 'You\'ve maintained a regular sleep schedule for the past week, sleeping an average of 7.5 hours per night.',
      confidence: 92,
    },
    {
      id: '2',
      type: 'suggestion',
      title: 'Optimize Morning Routine',
      description: 'Your mood scores are 30% higher on days when you start with mindfulness practice.',
      actionable: 'Try adding 10 minutes of meditation to your morning routine',
      confidence: 87,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Stress Pattern Detected',
      description: 'Your stress levels tend to spike on Tuesdays and Thursdays, possibly related to work schedule.',
      actionable: 'Consider scheduling lighter workloads or stress-relief activities on these days',
      confidence: 78,
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Exercise Milestone',
      description: 'You\'ve completed your exercise goals for 5 consecutive days! Your energy levels have increased by 25%.',
      confidence: 95,
    },
    {
      id: '5',
      type: 'suggestion',
      title: 'Social Connection Opportunity',
      description: 'Your happiness scores are higher after social interactions. You haven\'t logged social time in 3 days.',
      actionable: 'Reach out to a friend or join a social activity',
      confidence: 82,
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'suggestion': return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case 'achievement': return <CheckCircle className="h-5 w-5 text-purple-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-amber-200 bg-amber-50';
      case 'suggestion': return 'border-blue-200 bg-blue-50';
      case 'achievement': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 80) return 'bg-blue-100 text-blue-800';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Personalized Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getInsightIcon(insight.type)}
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getConfidenceColor(insight.confidence)}`}
                >
                  {insight.confidence}% confidence
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">
                {insight.description}
              </p>
              
              {insight.actionable && (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 italic">
                    💡 {insight.actionable}
                  </p>
                  <Button size="sm" variant="outline" className="text-xs">
                    Take Action
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <h4 className="font-medium text-purple-800 mb-2">AI-Powered Analysis</h4>
          <p className="text-sm text-purple-700">
            These insights are generated by analyzing your mood, sleep, exercise, and stress patterns. 
            The more data you provide, the more accurate and personalized your insights become.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedInsights;
