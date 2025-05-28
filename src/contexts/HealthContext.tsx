
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HealthData {
  heartRate: number;
  steps: number;
  energy: number;
  happiness: number;
  productivity: number;
  stress: number;
  lastUpdated: Date;
}

interface HealthContextType {
  healthData: HealthData;
  updateHealthData: (data: Partial<HealthData>) => void;
  updateStatus: (status: { energy: number; happiness: number; productivity: number; stress: number }) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [healthData, setHealthData] = useState<HealthData>({
    heartRate: 72,
    steps: 8543,
    energy: 3,
    happiness: 4,
    productivity: 3,
    stress: 2,
    lastUpdated: new Date(),
  });

  const updateHealthData = (data: Partial<HealthData>) => {
    setHealthData(prev => ({
      ...prev,
      ...data,
      lastUpdated: new Date(),
    }));
  };

  const updateStatus = (status: { energy: number; happiness: number; productivity: number; stress: number }) => {
    updateHealthData(status);
  };

  return (
    <HealthContext.Provider value={{ healthData, updateHealthData, updateStatus }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = (): HealthContextType => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
