
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActivity: Date;
}

interface ChatContextType {
  currentSession: ChatSession | null;
  chatSessions: ChatSession[];
  sendMessage: (content: string) => Promise<void>;
  createNewSession: () => void;
  switchToSession: (sessionId: string) => void;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: "Hi there! I'm your mental wellness assistant. How are you feeling today?",
          timestamp: new Date(),
        },
      ],
      lastActivity: new Date(),
    };

    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession);
  };

  const switchToSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentSession) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setIsLoading(true);
    
    try {
      // Update current session with user message
      const updatedSession = {
        ...currentSession,
        messages: [...currentSession.messages, userMessage],
        lastActivity: new Date(),
        title: currentSession.messages.length === 1 ? content.slice(0, 30) + '...' : currentSession.title,
      };
      
      setCurrentSession(updatedSession);
      setChatSessions(prev => 
        prev.map(session => 
          session.id === currentSession.id ? updatedSession : session
        )
      );
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response based on user message
      let responseContent = '';
      if (content.toLowerCase().includes('anxious') || content.toLowerCase().includes('stress')) {
        responseContent = 'I understand feeling stressed can be difficult. Have you tried any breathing exercises or mindfulness techniques today?';
      } else if (content.toLowerCase().includes('happy') || content.toLowerCase().includes('good')) {
        responseContent = "That's wonderful to hear! What specific things have been bringing you joy today?";
      } else if (content.toLowerCase().includes('tired') || content.toLowerCase().includes('exhausted')) {
        responseContent = "I notice you're feeling tired. How has your sleep been lately? Remember that rest is an important part of mental wellness.";
      } else {
        responseContent = "Thank you for sharing. How else can I support your mental wellness today?";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      // Update session with assistant response
      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, assistantMessage],
        lastActivity: new Date(),
      };
      
      setCurrentSession(finalSession);
      setChatSessions(prev => 
        prev.map(session => 
          session.id === currentSession.id ? finalSession : session
        )
      );
      
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      currentSession, 
      chatSessions, 
      sendMessage, 
      createNewSession, 
      switchToSession, 
      isLoading 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
