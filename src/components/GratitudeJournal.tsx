
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Heart, Plus } from 'lucide-react';

const GratitudeJournal: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [gratitudeItems, setGratitudeItems] = useState<string[]>([]);
  const { saveEncryptedData } = useDatabase();

  const addGratitudeItem = () => {
    if (entry.trim()) {
      setGratitudeItems([...gratitudeItems, entry.trim()]);
      setEntry('');
    }
  };

  const saveJournal = async () => {
    if (gratitudeItems.length > 0) {
      await saveEncryptedData({
        type: 'gratitude_journal',
        items: gratitudeItems,
        timestamp: new Date(),
      }, 'mood');

      setGratitudeItems([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-mental-purple">
          <Heart className="h-5 w-5 mr-2" />
          Gratitude Journal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          What are you grateful for today? List 3 things.
        </p>
        
        <div className="space-y-2">
          <Textarea
            placeholder="I'm grateful for..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={2}
          />
          <Button
            onClick={addGratitudeItem}
            variant="outline"
            className="w-full"
            disabled={!entry.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {gratitudeItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Today's Gratitude:</h4>
            <ul className="space-y-1">
              {gratitudeItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-mental-purple mr-2">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={saveJournal}
              className="w-full bg-mental-purple hover:bg-mental-darkPurple"
            >
              Save Journal Entry
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GratitudeJournal;
