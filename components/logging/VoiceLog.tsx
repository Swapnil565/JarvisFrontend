'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { popIn, slideUp } from '@/lib/animations';
import { copy } from '@/lib/copy';

interface VoiceLogProps {
  onComplete: (data: { transcript: string; tags: string[] }) => void;
  onCancel: () => void;
}

// Simple tag presets (could evolve from patterns)
const QUICK_TAGS = ['sleep', 'focus', 'stress', 'energy', 'workout', 'social', 'nutrition'];

export const VoiceLog: React.FC<VoiceLogProps> = ({ onComplete, onCancel }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [support, setSupport] = useState({ mic: true, speech: true });
  const [editing, setEditing] = useState(false);
  const [startedByHold, setStartedByHold] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Feature detection
    const micSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const speechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setSupport({ mic: micSupported, speech: speechSupported });
  }, []);

  const startRecording = async () => {
    setError(null);
    if (!support.mic) {
      setError('Microphone not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      streamRef.current = stream;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.start();

      // Speech recognition
      if (support.speech) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const res = event.results[i];
            current += res[0].transcript;
          }
          setTranscript(current.trim());
        };
        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error', e);
        };
        recognition.onend = () => {
          // Auto-restart if still recording
          if (recording) recognition.start();
        };
        recognition.start();
        recognitionRef.current = recognition;
      }

      setRecording(true);
    } catch (err: any) {
      setError(err.message || 'Failed to access microphone');
    }
  };

  const stopRecording = () => {
    setRecording(false);
    recognitionRef.current && recognitionRef.current.stop();
    mediaRecorderRef.current && mediaRecorderRef.current.stop();
    // Stop tracks to release mic
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recording) stopRecording();
    };
  }, [recording]);

  const handleToggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSubmit = () => {
    if (!transcript.trim()) {
      setError('Please record something first.');
      return;
    }
    onComplete({ transcript: transcript.trim(), tags });
  };

  const handleCancel = () => {
    if (recording) stopRecording();
    setTranscript('');
    setTags([]);
    setEditing(false);
    onCancel();
  };

  return (
  <div className="max-w-2xl mx-auto breathing-room">
      <motion.div
        variants={popIn}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="heading-xl mb-3">{copy.voiceLog.headerTitle}</h1>
          <p className="text-jarvis-gray text-lg">{copy.voiceLog.headerSub}</p>
        </div>

        {/* Recording area */}
  <div className="flex flex-col items-center gap-8">
          <button
            onMouseDown={() => { setStartedByHold(true); startRecording(); }}
            onMouseUp={() => { stopRecording(); }}
            onTouchStart={() => { setStartedByHold(true); startRecording(); }}
            onTouchEnd={() => { stopRecording(); }}
            // Tap-to-toggle (click) - ignore the click following a hold interaction
            onClick={() => {
              if (startedByHold) { setStartedByHold(false); return; }
              if (!recording) {
                startRecording();
              } else {
                stopRecording();
              }
            }}
            disabled={recording && !support.speech && !support.mic}
            className={`relative w-40 h-40 rounded-full flex items-center justify-center text-4xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1 ${recording ? 'bg-jarvis-cyan text-jarvis-navy shadow-[0_0_0_8px_rgba(0,217,255,0.25)] animate-pulse' : 'bg-jarvis-navy-light/40 hover:bg-jarvis-navy-light/60'}`}
            aria-pressed={recording}
            aria-label={recording ? 'Recording… release or tap to stop' : 'Hold or tap to start recording'}
          >
            {recording ? copy.voiceLog.buttonRecording : copy.voiceLog.buttonIdle}
          </button>
          <p className="text-xs text-jarvis-soft-gray">{recording ? copy.voiceLog.hintRecording : copy.voiceLog.hintIdle}</p>
          <div aria-live="polite" className="sr-only">
            {recording ? copy.voiceLog.ariaStart : copy.voiceLog.ariaStop}
          </div>
        </div>

        {/* Transcript preview */}
        <Card className="p-6 min-h-[144px]">
          {editing ? (
            <motion.div className="space-y-4" variants={slideUp} initial="hidden" animate="visible" exit="exit">
              <textarea
                className="w-full bg-jarvis-navy-light/30 border border-jarvis-navy-light/60 rounded-md p-4 text-sm focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/50"
                rows={6}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                aria-label="Edit transcript"
              />
              <div className="flex gap-4 justify-end">
                <Button variant="ghost" onClick={() => setEditing(false)}>{copy.voiceLog.editDone}</Button>
              </div>
            </motion.div>
          ) : transcript ? (
            <motion.div className="space-y-3" variants={slideUp} initial="hidden" animate="visible" exit="exit">
              <p className="text-sm leading-relaxed whitespace-pre-wrap" aria-label="Transcript preview">{transcript}</p>
              <div className="flex justify-end">
                <Button size="sm" variant="ghost" className="bg-jarvis-navy-light/30 hover:bg-jarvis-navy-light/50 border border-jarvis-navy-light/60 rounded-md px-4 py-2" onClick={() => setEditing(true)} aria-label="Edit transcript">{copy.voiceLog.editButton}</Button>
              </div>
            </motion.div>
          ) : (
            <p className="text-sm text-jarvis-gray">{copy.voiceLog.transcriptPlaceholder}</p>
          )}
        </Card>

        {/* Quick tags */}
        <div>
          <h3 className="heading-sm mb-4">{copy.voiceLog.tagSectionTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => handleToggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/40 ${tags.includes(tag) ? 'bg-jarvis-cyan text-jarvis-navy' : 'bg-jarvis-navy-light/40 text-jarvis-gray hover:bg-jarvis-navy-light/60'}`}
                aria-pressed={tags.includes(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
  <div className="flex gap-6">
          <Button onClick={handleCancel} variant="ghost" className="flex-1">{copy.voiceLog.cancelCTA}</Button>
          <Button onClick={handleSubmit} variant="primary" className="flex-1" disabled={!transcript.trim()}>
            {copy.voiceLog.saveCTA}
          </Button>
        </div>

        {error && (
          <p className="text-center text-xs text-red-400 mt-2" role="alert">{error}</p>
        )}

        {!support.mic && (
          <p className="text-center text-xs text-red-400 mt-2" role="alert">{copy.voiceLog.errorNoMic}</p>
        )}
      </motion.div>
    </div>
  );
};
