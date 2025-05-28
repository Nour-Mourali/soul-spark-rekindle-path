
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, BarChart3, Stethoscope, User } from 'lucide-react';

const BottomTabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/doctor-advice', icon: Stethoscope, label: 'Doctor' },
    { path: '/assessment', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 shadow-lg z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive(path)
                ? 'text-mental-purple bg-mental-purple/10'
                : 'text-gray-600 hover:text-mental-purple'
            }`}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTabBar;
