
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, RefreshCw, Sparkles } from 'lucide-react';

const affirmations = [
  "I am worthy of love, happiness, and inner peace.",
  "My intuition guides me toward my highest good.",
  "I release what no longer serves me with gratitude.",
  "I am connected to the infinite wisdom of the universe.",
  "My heart is open to giving and receiving love.",
  "I trust the journey of my soul's evolution.",
  "I am grounded, centered, and at peace with myself.",
  "Divine light flows through me, illuminating my path.",
  "I honor my authentic self and speak my truth.",
  "Every breath brings me deeper into the present moment.",
  "I am a radiant being of light and love.",
  "My chakras are balanced and my energy flows freely.",
  "I embrace change as an opportunity for growth.",
  "I am grateful for the blessings in my life.",
  "My spirit is strong, my mind is clear, my heart is open."
];

const AffirmationsSection = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [liked, setLiked] = useState(false);

  const getNewAffirmation = () => {
    const newIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(newIndex);
    setLiked(false);
  };

  useEffect(() => {
    getNewAffirmation();
  }, []);

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
          Daily Affirmations
        </h2>
        <p className="text-xl text-purple-200 max-w-3xl mx-auto">
          Nurture your soul with powerful affirmations that align your energy and elevate your consciousness.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-purple-300/20 shadow-2xl">
          <CardContent className="p-12 text-center">
            <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-8 animate-pulse" />
            
            <blockquote className="text-2xl md:text-3xl font-light text-purple-100 leading-relaxed mb-8 italic">
              "{affirmations[currentAffirmation]}"
            </blockquote>

            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={() => setLiked(!liked)}
                variant="outline"
                className={`border-purple-300 hover:bg-purple-300/10 px-6 py-3 rounded-full transition-all duration-300 ${
                  liked ? 'bg-purple-300/20 text-purple-200' : 'text-purple-300'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Loved' : 'Love it'}
              </Button>
              
              <Button
                onClick={getNewAffirmation}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                New Affirmation
              </Button>
            </div>

            <div className="text-purple-300 text-sm">
              Take a deep breath and let these words resonate within your soul
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/10 mb-4">
              <div className="text-2xl font-bold text-purple-300 mb-2">Morning</div>
              <div className="text-purple-200 text-sm">Start your day with intention</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/10 mb-4">
              <div className="text-2xl font-bold text-purple-300 mb-2">Midday</div>
              <div className="text-purple-200 text-sm">Realign your energy</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/10 mb-4">
              <div className="text-2xl font-bold text-purple-300 mb-2">Evening</div>
              <div className="text-purple-200 text-sm">Reflect and release</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffirmationsSection;
