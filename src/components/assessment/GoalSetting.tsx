
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, X } from 'lucide-react';

interface GoalSettingProps {
  goals: string[];
  setGoals: (goals: string[]) => void;
}

const GoalSetting: React.FC<GoalSettingProps> = ({ goals, setGoals }) => {
  const [newGoal, setNewGoal] = useState('');

  const suggestedGoals = [
    "Reduce anxiety levels",
    "Improve sleep quality",
    "Build healthy coping strategies",
    "Increase daily exercise",
    "Practice mindfulness daily",
    "Strengthen relationships",
    "Manage stress better",
    "Improve self-esteem",
    "Develop emotional regulation",
    "Create work-life balance"
  ];

  const addGoal = (goal: string) => {
    if (goal.trim() && !goals.includes(goal.trim())) {
      setGoals([...goals, goal.trim()]);
      setNewGoal('');
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setGoals(goals.filter(goal => goal !== goalToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Suggested Goals
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {suggestedGoals.map((goal, index) => (
            <Button
              key={index}
              variant={goals.includes(goal) ? "default" : "outline"}
              size="sm"
              onClick={() => goals.includes(goal) ? removeGoal(goal) : addGoal(goal)}
              className="justify-start text-left h-auto p-3"
            >
              <Target className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{goal}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Add Custom Goal
        </h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter your personal goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addGoal(newGoal)}
          />
          <Button
            onClick={() => addGoal(newGoal)}
            disabled={!newGoal.trim()}
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {goals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">
            Your Selected Goals ({goals.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {goals.map((goal, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-2 py-2 px-3"
              >
                {goal}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-500"
                  onClick={() => removeGoal(goal)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Choose 3-5 goals that feel most important to you right now. 
          You can always adjust these later as you progress on your mental health journey.
        </p>
      </div>
    </div>
  );
};

export default GoalSetting;
