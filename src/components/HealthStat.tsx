
import React from 'react';
import { Heart, Activity } from "lucide-react";

interface HealthStatProps {
  type: 'heartRate' | 'steps';
  value: number;
}

const HealthStat: React.FC<HealthStatProps> = ({ type, value }) => {
  const Icon = type === 'heartRate' ? Heart : Activity;
  const label = type === 'heartRate' ? 'Heart Rate' : 'Steps Today';
  const unit = type === 'heartRate' ? 'bpm' : '';
  const formattedValue = type === 'heartRate' ? value : value.toLocaleString();
  
  const bgColor = type === 'heartRate' ? 'bg-mental-softPeach' : 'bg-mental-softBlue';
  const textColor = type === 'heartRate' ? 'text-red-500' : 'text-blue-500';

  return (
    <div className={`rounded-xl p-4 ${bgColor} flex items-center space-x-3`}>
      <div className={`${textColor} p-2 rounded-full bg-white`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold">{formattedValue} {unit}</p>
      </div>
    </div>
  );
};

export default HealthStat;
