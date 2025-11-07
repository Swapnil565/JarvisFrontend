'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@/components/ui';

interface MorningCheckInScreenProps {
  onNext: (data: { morningCheckInTime: string }) => void;
  onBack: () => void;
}

export const MorningCheckInScreen: React.FC<MorningCheckInScreenProps> = ({
  onNext,
  onBack
}) => {
  const [selectedTime, setSelectedTime] = useState<string>('8:00 AM');

  const timeOptions = [
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    "I'll choose later"
  ];

  const handleComplete = () => {
    onNext({ morningCheckInTime: selectedTime });
  };

  return (
    <div className="breathing-room">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="text-5xl mb-4">☀️</div>
        <h1 className="heading-xl mb-4">One last thing</h1>
        <p className="text-jarvis-gray text-lg max-w-xl mx-auto">
          I'll check in with you each morning to see how you're feeling.
          <br />
          Takes 10 seconds.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h3 className="heading-sm text-center mb-6">
          When should I ping you?
        </h3>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {timeOptions.map((time, index) => (
            <motion.div
              key={time}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <Card
                onClick={() => setSelectedTime(time)}
                className={`cursor-pointer text-center py-4 transition-all duration-200 ${
                  selectedTime === time
                    ? 'ring-2 ring-jarvis-cyan bg-jarvis-cyan/10'
                    : 'hover:bg-white/5'
                }`}
              >
                <p className="font-medium">{time}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <Card className="max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <div className="text-xl">📱</div>
            <div className="text-sm text-jarvis-gray">
              You'll get a notification. Just tap it and log your mood. 
              <span className="text-white font-medium"> The more consistent you are, the better I can help you spot patterns.</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="flex gap-4 justify-center"
      >
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <Button onClick={handleComplete} variant="primary">
          Let's do this 🔥
        </Button>
      </motion.div>
    </div>
  );
};
