
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Smile, Meh, Frown, Heart, Angry } from 'lucide-react';

const moodOptions = [
  { icon: Heart, label: 'Amazing', value: 5, color: 'text-green-500' },
  { icon: Smile, label: 'Good', value: 4, color: 'text-blue-500' },
  { icon: Meh, label: 'Okay', value: 3, color: 'text-yellow-500' },
  { icon: Frown, label: 'Not Great', value: 2, color: 'text-orange-500' },
  { icon: Angry, label: 'Difficult', value: 1, color: 'text-red-500' },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const { saveEncryptedData } = useDatabase();

  const handleSubmit = async () => {
    if (selectedMood === null) return;

    await saveEncryptedData({
      type: 'mood_entry',
      mood: selectedMood,
      note,
      timestamp: new Date(),
    }, 'mood');

    setSelectedMood(null);
    setNote('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-mental-purple">How are you feeling?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((mood) => (
            <Button
              key={mood.value}
              variant={selectedMood === mood.value ? "default" : "outline"}
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => setSelectedMood(mood.value)}
            >
              <mood.icon className={`h-6 w-6 mb-1 ${mood.color}`} />
              <span className="text-xs">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        <Textarea
          placeholder="Add a note about your mood (optional)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
        
        <Button
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full bg-mental-purple hover:bg-mental-darkPurple"
        >
          Log Mood
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
