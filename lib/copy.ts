// Canonical microcopy for JARVIS voice.
// Centralize strings for consistency and future i18n.
// Tone principles: concise, encouraging, non-judgmental, actionable.

export const copy = {
  onboarding: {
    welcomeHeadline: "Hey — I’m JARVIS. I got your back.",
    welcomeSub: "Quick setup: tell me a few things and I’ll spot patterns between your training, work, and recovery.",
    startButton: "Start",
  },
  navigation: {
    home: 'Home',
    log: 'Log',
    insights: 'Insights',
    you: 'You',
  },
  dashboard: {
    welcomeHeadline: "Welcome back",
    todayIntro: "Here's where you stand today",
    moodPromptMorning: "Morning. How we feeling?",
    moodQuickCheck: "Quick check-in",
    statusHeadline: "Today's Status",
    statusFooter: "I'll keep watching for patterns and nudge you when it matters.",
    voiceLogTitle: "Voice Log",
    voiceLogSubtitle: "Hold to speak — quick and easy",
    voiceLogCTA: "Hold to record",
    manualLog: "Log manually",
    quickMoodLink: "or quick mood check"
  },
  morning: {
    greeting: 'Good morning ☀️',
    prompt: 'How are you feeling today?',
    skipForNow: 'Skip for now',
    wantContext: 'Want to add context?',
    optionalHelps: 'Optional—but helps me spot patterns',
    notesPlaceholder: "What's on your mind? (e.g., 'didn't sleep well' or 'excited about today')",
    back: 'Back',
    skip: 'Skip',
    done: 'Done 🔥',
  },
  voiceLog: {
    headerTitle: "Voice Log 🎤",
    headerSub: "Hold OR tap to record your thoughts. I'll transcribe and learn.",
    buttonIdle: "Rec",
    buttonRecording: "●",
    hintIdle: "Hold OR tap to start recording",
    hintRecording: "Listening… release or tap to stop",
    ariaStart: "Recording started",
    ariaStop: "Recording stopped",
    transcriptPlaceholder: "Your transcript will appear here while you speak.",
    editDone: "Done ✍️",
    editButton: "Edit ✍️",
    saveCTA: "Save Log ✅",
    cancelCTA: "Cancel",
    tagSectionTitle: "Tag it quickly",
    errorNoTranscript: "Please record something first.",
    errorNoMic: "Microphone not supported in this browser.",
  },
  insights: {
    patternsHeadline: "Your Patterns 🔍",
    patternsSub: "Insights discovered from your data. Tap any card to dive deeper.",
    snapshotsHeadline: "Recent Story Snapshots",
    snapshotsSub: "Fast narrative summaries before you dive into raw patterns.",
    emptyState: "No patterns found with these filters",
    clearFilters: "Clear filters",
    narrativeFooter: "I’ll keep tracking this story and update you as it evolves.",
    gotIt: "Got it",
    summary: 'Summary',
    keyHighlight: 'Key highlight',
    whatThisMightMean: 'What this might mean',
    suggestedNextSteps: 'Suggested next steps',
    relatedPatterns: 'Related patterns',
    viewAllPatterns: 'View all patterns →'
  }
};

export type CopyKey = typeof copy;

// Helper accessor if desired later
export const cx = (path: string): string => {
  return path.split('.').reduce<any>((acc, key) => acc && acc[key], copy) || '';
};
