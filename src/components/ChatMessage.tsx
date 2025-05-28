
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
          <AvatarFallback className="bg-indigo-500 text-white text-sm">AI</AvatarFallback>
        </Avatar>
      )}
      <div className="max-w-xs sm:max-w-md">
        <div 
          className={`rounded-2xl px-4 py-3 break-words ${
            isUser 
              ? 'bg-indigo-500 text-white rounded-tr-sm' 
              : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
          }`}
        >
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formattedTime}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 ml-3 mt-1">
          <AvatarFallback className="bg-gray-500 text-white text-sm">ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
