
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Plus, Clock } from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatListProps {
  chatSessions: ChatSession[];
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ chatSessions, onSelectChat, onNewChat }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <Button onClick={onNewChat} className="bg-mental-purple hover:bg-mental-darkPurple text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      {chatSessions.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No conversations yet</p>
            <p className="text-sm text-gray-500">Start a new chat to begin</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {chatSessions.map((session) => (
            <Card key={session.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectChat(session.id)}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{session.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {session.timestamp.toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-gray-600 truncate">{session.lastMessage}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
