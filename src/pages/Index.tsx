
import React, { useState, useEffect } from 'react';
import { Star, Play, Pause, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HeroSection from '@/components/HeroSection';
import ChakraCards from '@/components/ChakraCards';
import AffirmationsSection from '@/components/AffirmationsSection';
import MeditationLibrary from '@/components/MeditationLibrary';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Star className="w-1 h-1 text-purple-300 fill-current" />
          </div>
        ))}
      </div>

      {/* Sacred geometry background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="sacred-geometry" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
              <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-indigo-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-geometry)" />
        </svg>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ChakraCards />
        <AffirmationsSection />
        <MeditationLibrary />
      </div>
    </div>
  );
};

export default Index;
