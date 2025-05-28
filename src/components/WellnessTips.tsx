
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';

const wellnessTips = [
  {
    title: "Mindful Breathing",
    tip: "Take 5 deep breaths whenever you feel overwhelmed. Focus on the sensation of air entering and leaving your body.",
    category: "Stress Relief"
  },
  {
    title: "Gratitude Practice",
    tip: "Write down 3 things you're grateful for each morning to start your day with a positive mindset.",
    category: "Mood Boost"
  },
  {
    title: "Progressive Muscle Relaxation",
    tip: "Tense and release each muscle group for 5 seconds, starting from your toes and working up to your head.",
    category: "Relaxation"
  },
  {
    title: "Digital Detox",
    tip: "Set aside 30 minutes each day where you completely disconnect from all digital devices.",
    category: "Mindfulness"
  },
  {
    title: "Nature Connection",
    tip: "Spend at least 10 minutes outside each day, even if it's just sitting by a window with natural light.",
    category: "Energy Boost"
  },
  {
    title: "Hydration Check",
    tip: "Drink a glass of water every hour. Dehydration can significantly impact your mood and energy levels.",
    category: "Physical Health"
  }
];

const WellnessTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const getRandomTip = () => {
    const newIndex = Math.floor(Math.random() * wellnessTips.length);
    setCurrentTip(newIndex);
  };

  const tip = wellnessTips[currentTip];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-mental-purple">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Daily Wellness Tip
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={getRandomTip}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{tip.title}</h3>
          <span className="inline-block px-2 py-1 bg-mental-purple/10 text-mental-purple text-xs rounded-full">
            {tip.category}
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed">{tip.tip}</p>
      </CardContent>
    </Card>
  );
};

export default WellnessTips;
