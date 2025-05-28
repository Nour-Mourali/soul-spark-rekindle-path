
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, MessageCircle, Heart, AlertTriangle } from 'lucide-react';

interface CrisisSupportProps {
  onContinue: () => void;
}

const CrisisSupport: React.FC<CrisisSupportProps> = ({ onContinue }) => {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 crisis support",
      icon: Phone
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 text-based crisis support",
      icon: MessageCircle
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service",
      icon: Phone
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <Card className="border-red-200 shadow-lg">
          <CardHeader className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-red-600">
              You Are Not Alone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <Heart className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                Your responses indicate you may be experiencing thoughts of self-harm. 
                Your safety and well-being are our top priority. Please reach out for immediate support.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Immediate Crisis Support Resources:
              </h3>
              
              {crisisResources.map((resource, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <resource.icon className="h-6 w-6 text-mental-purple mr-4" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{resource.name}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-mental-purple">{resource.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">If this is a medical emergency:</h4>
              <p className="text-blue-700">Call 911 or go to your nearest emergency room immediately.</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Coping strategies right now:</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Take slow, deep breaths</li>
                <li>• Reach out to a trusted friend or family member</li>
                <li>• Remove any means of self-harm from your immediate environment</li>
                <li>• Focus on getting through the next hour, then the next</li>
                <li>• Remember: These feelings are temporary and will pass</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => window.open('tel:988')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call 988 Now
              </Button>
              <Button
                onClick={onContinue}
                variant="outline"
                className="flex-1"
              >
                Continue Assessment
              </Button>
            </div>

            <p className="text-sm text-gray-600 text-center">
              By continuing, you acknowledge that you have reviewed these resources and understand 
              the importance of seeking immediate help if you're in crisis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrisisSupport;
