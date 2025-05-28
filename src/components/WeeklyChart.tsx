
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { day: 'Mon', mood: 3, energy: 4, stress: 2 },
  { day: 'Tue', mood: 4, energy: 3, stress: 3 },
  { day: 'Wed', mood: 2, energy: 2, stress: 4 },
  { day: 'Thu', mood: 5, energy: 4, stress: 2 },
  { day: 'Fri', mood: 4, energy: 5, stress: 1 },
  { day: 'Sat', mood: 5, energy: 4, stress: 1 },
  { day: 'Sun', mood: 4, energy: 3, stress: 2 },
];

const WeeklyChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-mental-purple">Weekly Wellness Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="Mood"
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Energy"
            />
            <Line 
              type="monotone" 
              dataKey="stress" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Stress"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyChart;
