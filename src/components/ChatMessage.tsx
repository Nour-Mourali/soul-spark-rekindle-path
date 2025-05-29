
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp }) => {
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-3 mt-1">
          <AvatarFallback className="bg-primary text-white text-sm">AI</AvatarFallback>
        </Avatar>
      )}
      <div>
        <div 
          className={`rounded-2xl px-4 py-3 max-w-xs sm:max-w-md break-words shadow-sm ${
            isUser 
              ? 'bg-primary text-white rounded-tr-none' 
              : 'bg-white text-foreground rounded-tl-none border border-gray-100'
          }`}
        >
          <p className="leading-relaxed">{content}</p>
        </div>
        <p className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formattedTime}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 ml-3 mt-1">
          <AvatarFallback className="bg-accent text-white text-sm">ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
