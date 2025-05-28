
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { connect } = useAuth();
  const navigate = useNavigate();
  
  const handleConnect = () => {
    connect();
    // Navigate to assessment after connecting
    navigate('/assessment');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-mental-lightGray to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Soul Spark</h1>
            <p className="text-gray-600">Your Mental Wellness Companion</p>
          </div>
          
          <div className="mental-card mb-8 p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Connect with Web3</h2>
            <p className="text-gray-600 mb-6 text-center">
              Sign in securely using your HashPack wallet on Hedera
            </p>
            
            <Button 
              onClick={handleConnect}
              className="w-full bg-mental-purple hover:bg-mental-darkPurple text-white py-3"
            >
              Connect Wallet
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Your data stays private and secure with blockchain technology
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Privacy-first mental wellness tracking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
