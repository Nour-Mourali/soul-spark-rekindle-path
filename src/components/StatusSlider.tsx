
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface StatusSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  colorClass?: string;
}

const StatusSlider: React.FC<StatusSliderProps> = ({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  step = 1,
  colorClass = 'bg-mental-purple',
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className={`text-sm font-semibold px-2 py-1 rounded-md ${colorClass === 'bg-mental-purple' ? 'bg-mental-purple/10 text-mental-purple' : colorClass}`}>
          {value}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
        className="mental-slider-track"
      />
    </div>
  );
};

export default StatusSlider;
