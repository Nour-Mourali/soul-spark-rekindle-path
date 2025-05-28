
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const mockMoodData = [
  { date: '2024-01-01', mood: 4, energy: 3, stress: 2, sleep: 7 },
  { date: '2024-01-02', mood: 3, energy: 4, stress: 3, sleep: 6 },
  { date: '2024-01-03', mood: 5, energy: 4, stress: 1, sleep: 8 },
  { date: '2024-01-04', mood: 2, energy: 2, stress: 4, sleep: 5 },
  { date: '2024-01-05', mood: 4, energy: 5, stress: 2, sleep: 7 },
  { date: '2024-01-06', mood: 5, energy: 4, stress: 1, sleep: 8 },
  { date: '2024-01-07', mood: 3, energy: 3, stress: 3, sleep: 6 },
];

const mockActivityData = [
  { activity: 'Exercise', hours: 5, color: '#10b981' },
  { activity: 'Meditation', hours: 3, color: '#8b5cf6' },
  { activity: 'Reading', hours: 4, color: '#f59e0b' },
  { activity: 'Social', hours: 6, color: '#ef4444' },
  { activity: 'Work', hours: 40, color: '#3b82f6' },
  { activity: 'Sleep', hours: 49, color: '#6366f1' },
];

const AdvancedAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 3 months</option>
        </select>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-1" />
            Patterns
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center">
            <PieChartIcon className="h-4 w-4 mr-1" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Mood & Energy Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockMoodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={2} name="Mood" />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} name="Energy" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stress & Sleep Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockMoodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="stress" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Stress" />
                    <Area type="monotone" dataKey="sleep" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Sleep Hours" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockMoodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="mood" fill="#8b5cf6" name="Mood" />
                  <Bar dataKey="energy" fill="#10b981" name="Energy" />
                  <Bar dataKey="stress" fill="#ef4444" name="Stress" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={mockActivityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ activity, hours }) => `${activity}: ${hours}h`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hours"
                  >
                    {mockActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">73%</div>
                  <p className="text-sm text-gray-600">Good mood days</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">6.8h</div>
                  <p className="text-sm text-gray-600">Average sleep</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2.1</div>
                  <p className="text-sm text-gray-600">Average stress level</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Sleep Pattern</h4>
                  <p className="text-sm text-blue-700">You tend to have better mood when you sleep 7+ hours. Consider maintaining a consistent sleep schedule.</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Exercise Impact</h4>
                  <p className="text-sm text-green-700">Your energy levels are 40% higher on days you exercise. Try to maintain regular physical activity.</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800">Stress Management</h4>
                  <p className="text-sm text-purple-700">Meditation sessions correlate with 50% reduction in reported stress levels. Consider increasing mindfulness practice.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
