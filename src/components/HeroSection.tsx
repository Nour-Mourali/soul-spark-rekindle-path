
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [displayTime, setDisplayTime] = useState(300);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
        setDisplayTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTime(300);
    setDisplayTime(300);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <section className="container mx-auto px-6 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 mb-6 animate-fade-in">
            Soul Spark Guide
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 leading-relaxed">
            Awaken your inner light through mindful meditation, chakra alignment, and spiritual growth
          </p>
        </div>

        {/* Meditation Timer */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-purple-300/20 shadow-2xl max-w-md mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-purple-200 mb-6">Meditation Timer</h3>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-purple-300/20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (displayTime / 300)}`}
                className="text-purple-300 transition-all duration-1000 ease-linear"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-mono text-purple-100">
                {formatTime(displayTime)}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              onClick={resetTimer}
              variant="outline"
              className="border-purple-300 text-purple-300 hover:bg-purple-300/10 px-6 py-3 rounded-full transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/10">
            <div className="text-3xl font-bold text-purple-300 mb-2">7</div>
            <div className="text-purple-200">Chakras</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/10">
            <div className="text-3xl font-bold text-purple-300 mb-2">365</div>
            <div className="text-purple-200">Daily Affirmations</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/10">
            <div className="text-3xl font-bold text-purple-300 mb-2">∞</div>
            <div className="text-purple-200">Inner Peace</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
