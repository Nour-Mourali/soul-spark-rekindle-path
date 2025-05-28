
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Pill, Users, Clock } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
}

interface MedicationRemindersProps {
  medications: Medication[];
  setMedications: (medications: Medication[]) => void;
  supportSystem: string;
  setSupportSystem: (support: string) => void;
}

const MedicationReminders: React.FC<MedicationRemindersProps> = ({
  medications,
  setMedications,
  supportSystem,
  setSupportSystem
}) => {
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: '08:00'
  });

  const addMedication = () => {
    if (newMed.name.trim()) {
      const medication: Medication = {
        id: Date.now().toString(),
        ...newMed
      };
      setMedications([...medications, medication]);
      setNewMed({ name: '', dosage: '', frequency: 'daily', time: '08:00' });
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const supportOptions = [
    "Family members",
    "Close friends",
    "Healthcare provider",
    "Support group",
    "Therapist/Counselor",
    "Religious community",
    "Online communities",
    "Workplace support",
    "Limited support available",
    "Prefer not to say"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2 text-mental-purple" />
            Medication Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Add any medications you're currently taking for mental health. This helps us provide better support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Medication Name</label>
              <Input
                placeholder="e.g., Sertraline"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dosage</label>
              <Input
                placeholder="e.g., 50mg"
                value={newMed.dosage}
                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Frequency</label>
              <select
                value={newMed.frequency}
                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="weekly">Weekly</option>
                <option value="as-needed">As Needed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <Input
                type="time"
                value={newMed.time}
                onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              />
            </div>
          </div>
          
          <Button
            onClick={addMedication}
            disabled={!newMed.name.trim()}
            className="w-full"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>

          {medications.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Your Medications:</h4>
              {medications.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-gray-600">
                      {med.dosage} • {med.frequency} • {med.time}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMedication(med.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-mental-purple" />
            Support System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Tell us about your support network. Having support is crucial for mental health recovery.
          </p>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Who can you turn to for support? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {supportOptions.map((option, index) => (
                <Button
                  key={index}
                  variant={supportSystem.includes(option) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (supportSystem.includes(option)) {
                      setSupportSystem(supportSystem.replace(option, '').replace(/,\s*,/g, ',').replace(/^,|,$/g, ''));
                    } else {
                      setSupportSystem(supportSystem ? `${supportSystem}, ${option}` : option);
                    }
                  }}
                  className="justify-start text-left h-auto p-2"
                >
                  <span className="text-xs">{option}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Additional details about your support system (optional)
            </label>
            <Textarea
              placeholder="Tell us more about the people who support you..."
              value={supportSystem}
              onChange={(e) => setSupportSystem(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationReminders;
