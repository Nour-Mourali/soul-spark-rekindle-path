
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Brain,
  Heart,
  Shield,
  Lightbulb
} from 'lucide-react';

interface AssessmentAnalyticsProps {
  phq9Score: number;
  gad7Score: number;
  goals: string[];
  riskLevel: 'low' | 'moderate' | 'high';
}

const AssessmentAnalytics: React.FC<AssessmentAnalyticsProps> = ({
  phq9Score,
  gad7Score,
  goals,
  riskLevel
}) => {
  const getScoreInterpretation = (score: number, type: 'phq9' | 'gad7') => {
    if (type === 'phq9') {
      if (score <= 4) return { level: 'Minimal', color: 'text-green-600', bg: 'bg-green-50' };
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50' };
      if (score <= 19) return { level: 'Moderately Severe', color: 'text-red-600', bg: 'bg-red-50' };
      return { level: 'Severe', color: 'text-red-800', bg: 'bg-red-100' };
    } else {
      if (score <= 4) return { level: 'Minimal', color: 'text-green-600', bg: 'bg-green-50' };
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50' };
      return { level: 'Severe', color: 'text-red-600', bg: 'bg-red-50' };
    }
  };

  const phq9Interpretation = getScoreInterpretation(phq9Score, 'phq9');
  const gad7Interpretation = getScoreInterpretation(gad7Score, 'gad7');

  const recommendations = [
    {
      icon: Brain,
      title: "Mindfulness & Meditation",
      description: "Practice daily mindfulness for 10-15 minutes to reduce anxiety and improve mood.",
      priority: riskLevel === 'high' ? 'high' : 'medium'
    },
    {
      icon: Heart,
      title: "Regular Exercise",
      description: "Engage in 30 minutes of physical activity 3-4 times per week.",
      priority: 'medium'
    },
    {
      icon: Shield,
      title: "Professional Support",
      description: riskLevel === 'high' 
        ? "Consider immediate professional mental health support."
        : "Consider speaking with a mental health professional.",
      priority: riskLevel === 'high' ? 'high' : 'low'
    },
    {
      icon: Lightbulb,
      title: "Cognitive Behavioral Techniques",
      description: "Learn and practice CBT techniques to manage negative thought patterns.",
      priority: phq9Score > 9 || gad7Score > 9 ? 'high' : 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Depression Assessment (PHQ-9)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{phq9Score}/27</span>
                <Badge className={`${phq9Interpretation.bg} ${phq9Interpretation.color} border-0`}>
                  {phq9Interpretation.level}
                </Badge>
              </div>
              <Progress value={(phq9Score / 27) * 100} className="h-2" />
              <p className="text-sm text-gray-600">
                Your score indicates {phq9Interpretation.level.toLowerCase()} depression symptoms.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Anxiety Assessment (GAD-7)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{gad7Score}/21</span>
                <Badge className={`${gad7Interpretation.bg} ${gad7Interpretation.color} border-0`}>
                  {gad7Interpretation.level}
                </Badge>
              </div>
              <Progress value={(gad7Score / 21) * 100} className="h-2" />
              <p className="text-sm text-gray-600">
                Your score indicates {gad7Interpretation.level.toLowerCase()} anxiety symptoms.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Your Goals ({goals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {goals.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {goals.map((goal, index) => (
                <Badge key={index} variant="outline" className="py-1">
                  {goal}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No goals set yet. You can add goals later in your profile.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <rec.icon className="h-6 w-6 text-mental-purple flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge className={getPriorityColor(rec.priority)} variant="outline">
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {riskLevel === 'high' && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h4 className="font-medium text-red-800">High Priority Notice</h4>
                <p className="text-sm text-red-700">
                  Your assessment indicates significant symptoms. We strongly recommend speaking 
                  with a mental health professional as soon as possible.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Next Steps</h4>
              <p className="text-sm text-blue-700">
                Your assessment is complete! You can now access personalized tools, track your progress, 
                and chat with our AI assistant for ongoing support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentAnalytics;
