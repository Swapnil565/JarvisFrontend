"use client";

interface TimePickerProps {
  value: string; // "HH:MM" format
  onChange: (time: string) => void;
  label: string;
  disabled?: boolean;
}

export default function TimePicker({ value, onChange, label, disabled = false }: TimePickerProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm font-medium text-white">
        {label}
      </label>
      
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={label}
        className={`px-3 py-2 rounded-lg bg-jarvis-deep-navy/50 border border-jarvis-soft-gray/20 
          text-white text-sm focus:outline-none focus:ring-2 focus:ring-jarvis-electric-cyan 
          transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      />
    </div>
  );
}
