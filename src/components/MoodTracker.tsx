
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useDatabase } from '@/contexts/DatabaseContext';

const moodEmojis = [
  { emoji: '😊', label: 'Amazing', value: 5, color: 'text-green-600' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'text-blue-600' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'text-yellow-600' },
  { emoji: '🙁', label: 'Not Great', value: 2, color: 'text-orange-600' },
  { emoji: '😢', label: 'Difficult', value: 1, color: 'text-red-600' },
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
    <Card className="wellness-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          How are you feeling?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {moodEmojis.map((mood) => (
            <Button
              key={mood.value}
              variant={selectedMood === mood.value ? "default" : "outline"}
              className={`flex flex-col items-center p-4 h-auto rounded-xl ${
                selectedMood === mood.value 
                  ? 'wellness-button-primary' 
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        <Textarea
          placeholder="Add a note about your mood (optional)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="wellness-input"
        />
        
        <Button
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full wellness-button-primary"
        >
          Log Mood
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
