
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '@/components/ChatMessage';
import ChatList from '@/components/ChatList';
import { Send, ArrowLeft, MessageSquare } from 'lucide-react';

const Chat: React.FC = () => {
  const { currentSession, chatSessions, sendMessage, createNewSession, switchToSession, isLoading } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [showChatList, setShowChatList] = useState(!currentSession);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleNewChat = () => {
    createNewSession();
    setShowChatList(false);
  };

  const handleSelectChat = (chatId: string) => {
    switchToSession(chatId);
    setShowChatList(false);
  };

  if (showChatList || !currentSession) {
    return (
      <div className="freud-section p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6 pt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/home')}
              className="freud-button-secondary mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Mental Health Assistant</h1>
          </div>

          <Card className="freud-card">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-600">
                <MessageSquare className="h-5 w-5 mr-2" />
                Your Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChatList
                chatSessions={chatSessions.map(session => ({
                  id: session.id,
                  title: session.title,
                  lastMessage: session.messages[session.messages.length - 1]?.content || '',
                  timestamp: session.lastActivity,
                }))}
                onSelectChat={handleSelectChat}
                onNewChat={handleNewChat}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="freud-section flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowChatList(true)}
              className="freud-button-secondary mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentSession.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {currentSession.messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.role === 'user'}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="freud-card-minimal">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 freud-input p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="freud-button-primary px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
