
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Square } from 'lucide-react';

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [totalCycles] = useState(5);

  const phaseSettings = {
    inhale: { duration: 4, next: 'hold' as const },
    hold: { duration: 4, next: 'exhale' as const },
    exhale: { duration: 6, next: 'inhale' as const },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      const currentPhase = phaseSettings[phase];
      const nextPhase = currentPhase.next;
      
      if (phase === 'exhale') {
        setCycle(prev => prev + 1);
        if (cycle + 1 >= totalCycles) {
          setIsActive(false);
          setCycle(0);
          setPhase('inhale');
          setSeconds(4);
          return;
        }
      }
      
      setPhase(nextPhase);
      setSeconds(phaseSettings[nextPhase].duration);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, phase, cycle, totalCycles]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setSeconds(4);
    setCycle(0);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('inhale');
    setSeconds(4);
    setCycle(0);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'text-blue-500';
      case 'hold': return 'text-yellow-500';
      case 'exhale': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const progress = ((cycle / totalCycles) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-mental-purple">Breathing Exercise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="space-y-2">
          <div className={`text-6xl font-bold ${getPhaseColor()}`}>
            {seconds}
          </div>
          <div className="text-xl capitalize font-medium">
            {phase}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Cycle {cycle} of {totalCycles}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-center space-x-2">
          {!isActive ? (
            <Button onClick={handleStart} className="bg-mental-purple hover:bg-mental-darkPurple">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={handlePause} variant="outline">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={handleStop} variant="outline">
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          4-4-6 breathing pattern • Inhale for 4, hold for 4, exhale for 6
        </p>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
