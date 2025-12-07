'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface VoiceLogProps {
  onComplete: (data: { transcript: string; tags: string[] }) => void;
  onCancel: () => void;
}

const QUICK_TAGS = ['Workout', 'Focus', 'Sleep', 'Energy', 'Mood', 'Idea'];

// --- Sub-Component: The Ethereal Smoke Bloom ---
const NeuralBloom = ({ isRecording, audioLevel }: { isRecording: boolean; audioLevel: number }) => {
  const normLevel = audioLevel / 255;
  // Subtle reaction. Don't explode the size, just breathe.
  const scale = isRecording ? 1 + normLevel * 0.4 : 1;
  
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      
      {/* 1. The Atmosphere (Very faint background glow) */}
      <motion.div
        animate={{ opacity: isRecording ? 0.2 : 0.1 }}
        className="absolute inset-0 bg-jarvis-cyan rounded-full blur-[100px]"
      />

      {/* 2. The Liquid Smoke (Primary Morph) */}
      {/* We use a lower blur here so you can see the shape changing */}
      <motion.div
        animate={{
          scale: scale,
          rotate: [0, 360],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          borderRadius: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        // Gradient from Cyan to Transparent (creates the "Smoke" look)
        className="absolute inset-10 bg-gradient-to-tr from-jarvis-cyan/30 via-jarvis-cyan/10 to-transparent blur-2xl"
      />

      {/* 3. The Secondary Flow (Counter-rotation for complexity) */}
      <motion.div
        animate={{
          scale: scale * 0.9,
          rotate: [360, 0],
          borderRadius: [
            "40% 60% 60% 40% / 40% 40% 60% 60%",
            "60% 40% 40% 60% / 60% 60% 40% 40%",
            "40% 60% 60% 40% / 40% 40% 60% 60%"
          ]
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          borderRadius: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        // Different gradient angle for texture
        className="absolute inset-10 bg-gradient-to-bl from-jarvis-navy-light/50 via-jarvis-cyan/20 to-transparent blur-xl"
      />

      {/* 4. The Glass Core (The Physical Button) */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isRecording ? 1 + normLevel * 0.1 : 1,
          boxShadow: isRecording 
            ? "0 0 40px rgba(0, 224, 255, 0.4), inset 0 0 20px rgba(255,255,255,0.2)" 
            : "0 0 0px rgba(0,0,0,0), inset 0 0 0px rgba(0,0,0,0)"
        }}
        className="w-24 h-24 rounded-full relative z-20 flex items-center justify-center border border-white/10 backdrop-blur-md transition-shadow duration-300"
        style={{
          // Glassy Gradient
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.05) 100%)',
        }}
      >
        {/* Inner shine for 3D effect */}
        <div className="absolute top-2 left-4 w-8 h-4 bg-white/20 rounded-full blur-md" />
        
        {/* The Icon */}
        <motion.span 
           animate={{ 
             opacity: isRecording ? 1 : 0.6,
             color: isRecording ? '#ffffff' : '#00E0FF'
           }}
           className="text-3xl filter drop-shadow-[0_0_10px_rgba(0,224,255,0.5)]"
        >
            {isRecording ? '🎙️' : '●'}
         </motion.span>
      </motion.div>

    </div>
  );
};


// --- Main Component ---
export const VoiceLog: React.FC<VoiceLogProps> = ({ onComplete, onCancel }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
      };
      recognitionRef.current = recognition;
    }
    
    return () => {
      if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if(audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Audio Visualization Logic
  const setupAudioAnalysis = (stream: MediaStream) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    
    source.connect(analyser);
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.5; // Makes the blob react smoother
    
    audioContextRef.current = audioCtx;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateLevel = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Get volume (average of frequencies)
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      
      setAudioLevel(prev => prev * 0.7 + average * 0.3); // Smooth interpolation
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };

    updateLevel();
  };

  const toggleRecording = async () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      if (recognitionRef.current) recognitionRef.current.start();
      setupAudioAnalysis(stream);

      setRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    if (recognitionRef.current) recognitionRef.current.stop();
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setAudioLevel(0);
  };

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-8 pb-32 relative overflow-hidden">
      
      {/* 1. TOP BAR */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex justify-between items-center z-20"
      >
        <button onClick={onCancel} className="text-jarvis-text-secondary hover:text-white transition-colors text-sm uppercase tracking-wide">
          Cancel
        </button>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${recording ? 'bg-jarvis-cyan animate-pulse' : 'bg-jarvis-text-tertiary'}`} />
           <span className="text-xs font-display tracking-[0.2em] text-jarvis-cyan uppercase">
             {recording ? 'System Listening' : 'System Ready'}
           </span>
        </div>
        <div className="w-10" />
      </motion.div>


      {/* 2. THE NEURAL BLOOM (Centerpiece) */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full relative">
        
        {/* Click to Toggle */}
        <div onClick={toggleRecording} className="cursor-pointer mb-10 transform transition-transform active:scale-95">
           <NeuralBloom isRecording={recording} audioLevel={audioLevel} />
        </div>

        {/* 3. TRANSCRIPT DISPLAY (Movie Subtitle Style) */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={transcript ? 'text' : 'prompt'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center max-w-md px-4 absolute top-[65%]" // Positioning it below the blob
          >
            {transcript ? (
               <p className="text-2xl md:text-3xl font-light text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                 "{transcript}"
               </p>
            ) : (
               <p className="text-jarvis-text-secondary text-base font-light tracking-wide">
                 Tap the core to initialize.<br/>Speak naturally.
               </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>


      {/* 4. BOTTOM CONTROLS (Tags & Process) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full z-20"
      >
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {QUICK_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold border transition-all duration-300 ${
                tags.includes(tag)
                  ? 'bg-jarvis-cyan/10 border-jarvis-cyan text-jarvis-cyan shadow-glow-cyan'
                  : 'bg-white/5 border-white/10 text-jarvis-text-secondary hover:border-white/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Process Button */}
        <button 
          onClick={() => onComplete({ transcript, tags })}
          disabled={!transcript}
          className="w-full py-4 rounded-xl bg-jarvis-cyan text-[#09121D] font-bold font-display text-sm tracking-widest uppercase shadow-glow-cyan disabled:opacity-30 disabled:shadow-none hover:bg-white transition-all transform active:scale-[0.98]"
        >
          Process Entry
        </button>
      </motion.div>
    </div>
  );
};
