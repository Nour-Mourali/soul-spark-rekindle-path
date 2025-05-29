
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '@/components/ChatMessage';
import ChatList from '@/components/ChatList';
import { Send, ArrowLeft, MessageSquare, Plus } from 'lucide-react';

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
      <div className="min-h-screen wellness-warm-bg p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/home')}
              className="mr-4 bg-white border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-foreground">Mental Health Assistant</h1>
          </div>

          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center text-primary">
                <MessageSquare className="h-5 w-5 mr-2" />
                Your Conversations
              </CardTitle>
              <Button 
                onClick={handleNewChat}
                className="wellness-button-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
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
    <div className="min-h-screen wellness-warm-bg flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowChatList(true)}
              className="mr-4 bg-white border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">
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
              <div className="bg-white rounded-2xl px-4 py-3 rounded-tl-none shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent wellness-input"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="wellness-button-primary px-6"
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
