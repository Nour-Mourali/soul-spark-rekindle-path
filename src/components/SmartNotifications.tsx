
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, Heart, Brain, Pill, Target } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

interface NotificationSettings {
  moodCheckins: boolean;
  medicationReminders: boolean;
  exerciseReminders: boolean;
  mindfulnessReminders: boolean;
  sleepReminders: boolean;
}

const SmartNotifications: React.FC = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [settings, setSettings] = useState<NotificationSettings>({
    moodCheckins: true,
    medicationReminders: true,
    exerciseReminders: true,
    mindfulnessReminders: true,
    sleepReminders: true,
  });

  const updateSetting = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'checkIn': return <Heart className="h-4 w-4" />;
      case 'reminder': return <Clock className="h-4 w-4" />;
      case 'insight': return <Brain className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Notifications
            </span>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentNotifications.length > 0 ? (
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="text-mental-purple">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs"
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No notifications yet</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {key === 'moodCheckins' && <Heart className="h-4 w-4 text-pink-500" />}
                {key === 'medicationReminders' && <Pill className="h-4 w-4 text-blue-500" />}
                {key === 'exerciseReminders' && <Target className="h-4 w-4 text-green-500" />}
                {key === 'mindfulnessReminders' && <Brain className="h-4 w-4 text-purple-500" />}
                {key === 'sleepReminders' && <Clock className="h-4 w-4 text-indigo-500" />}
                <label className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
              </div>
              <Switch
                checked={value}
                onCheckedChange={() => updateSetting(key as keyof NotificationSettings)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartNotifications;
