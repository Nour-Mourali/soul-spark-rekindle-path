
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Brain, Zap } from 'lucide-react';

const Login: React.FC = () => {
  const { connect } = useAuth();
  const navigate = useNavigate();
  
  const handleConnect = () => {
    connect();
    navigate('/assessment');
  };

  return (
    <div className="flex flex-col min-h-screen freud-section">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Telepathy
            </h1>
            <p className="text-gray-600 text-lg">Your AI Mental Health Companion</p>
          </div>
          
          <div className="freud-card mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Connect Securely
            </h2>
            <p className="text-gray-600 mb-8 text-center leading-relaxed">
              Join thousands who trust Telepathy with their mental wellness journey. 
              Your privacy is our priority.
            </p>
            
            <Button 
              onClick={handleConnect}
              className="w-full freud-button-primary py-4 text-lg font-medium"
            >
              Connect with HashPack
            </Button>
            
            <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
              Powered by blockchain technology for maximum privacy and security
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                End-to-end encrypted
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                HIPAA compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
