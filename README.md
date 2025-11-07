# JARVIS Frontend 🤖

Burnout prevention copilot for knowledge workers who lift. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the example environment file:
```bash
copy .env.example .env.local
```

Edit `.env.local` and set your backend API URL:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Development Modes

### With Backend (Production Mode)
1. Start your FastAPI backend on port 8000
2. Ensure `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. Run `npm run dev`
4. All data persists to backend

### Without Backend (Mock Mode)
1. Set `NEXT_PUBLIC_USE_MOCK_API=true` in `.env.local`
2. Run `npm run dev`
3. App uses mock data (no persistence)

## Project Structure

```
jarvis/
├── app/                      # Next.js app router pages
│   ├── onboarding/          # Onboarding flow
│   ├── dashboard/           # Main dashboard
│   ├── log/                 # Logging flows
│   ├── insights/            # Pattern insights
│   ├── interventions/       # Proactive interventions
│   ├── progress/            # Progress tracking
│   └── settings/            # Settings & profile
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── onboarding/          # Onboarding screens
│   ├── dashboard/           # Dashboard components
│   ├── logging/             # Logging components
│   ├── insights/            # Insights components
│   ├── interventions/       # Intervention components
│   ├── progress/            # Progress components
│   └── settings/            # Settings components
├── hooks/                   # React hooks
│   ├── useAPI.ts           # API hooks with loading/error states
│   ├── useChat.ts          # Chat functionality
│   └── useMemory.ts        # Memory management
├── lib/                     # Utilities
│   ├── api.ts              # API client (connects to backend)
│   ├── animations.ts       # Animation utilities
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript types
│   ├── pattern.ts
│   ├── intervention.ts
│   ├── progress.ts
│   └── settings.ts
└── public/                  # Static assets
```

## Features Implemented

### ✅ Phase 1: Design System
- JARVIS color palette (Deep Navy, Electric Cyan, Warm Amber)
- Glass morphism UI components
- 60fps animations with Framer Motion
- Responsive design (mobile-first)

### ✅ Phase 2: Onboarding Flow
- 4-step conversational onboarding
- Privacy-first messaging
- Personalized burnout hypothesis
- Morning check-in time setup

### ✅ Phase 3: Dashboard
- 3-dimension status cards (Physical/Mental/Spiritual)
- Streak counter with fire emoji
- Quick mood check
- Navigation to all major sections

### ✅ Phase 4: Logging Flows
- Morning mood check (emoji + notes)
- Contextual quick log (time-based questions)
- End-of-day reflection

### ✅ Phase 5: Insights & Patterns
- Pattern discovery cards
- Filtering by dimension/type
- 3-column detail view (Pattern/Evidence/Why It Matters)
- Confidence scoring

### ✅ Phase 6: Interventions
- Swipeable intervention cards
- Expandable reasoning (builds trust)
- Snooze options (1hr to 1 week)
- Priority-based sorting

### ✅ Phase 7: Progress & Trends
- Dimension trend graphs (30-day history)
- Weekly summaries with highlights/lowlights
- Historical pattern access
- Time range selector (week/month/all)

### ✅ Phase 8: Settings & Profile
- Notification preferences
- Morning check-in time adjustment
- Privacy controls (data retention, anonymous usage)
- Data export (JSON download)
- Clear data / Delete account

### ✅ Phase 9: API Integration
- Complete API client (`lib/api.ts`)
- React hooks for API calls (`useAPI`, `useMutation`, `usePolling`)
- Loading states (spinners, skeletons)
- Error handling (retry, dismiss)
- Graceful degradation

## API Integration

See [API_INTEGRATION.md](./API_INTEGRATION.md) for complete API documentation.

### Quick Example

```typescript
import { useAPI } from '@/hooks/useAPI';
import { dashboardAPI } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

function Dashboard() {
  const { data, loading, error, refetch } = useAPI(
    () => dashboardAPI.getDashboardData(),
    true // fetch immediately
  );

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  
  return <div>{/* Use data */}</div>;
}
```

## Backend Requirements

The frontend expects a FastAPI backend with these endpoints:

- **Health**: `GET /health`
- **Onboarding**: `POST /api/onboarding/complete`
- **Logging**: `POST /api/logs`, `GET /api/logs`
- **Dashboard**: `GET /api/dashboard`
- **Insights**: `GET /api/insights/patterns`, `POST /api/insights/patterns/{id}/acted`
- **Interventions**: `GET /api/interventions/active`, `POST /api/interventions/{id}/dismiss`, `POST /api/interventions/{id}/snooze`
- **Progress**: `GET /api/progress/trends/{dimension}`, `GET /api/progress/summaries`
- **Settings**: `GET /api/settings`, `PATCH /api/settings`, `GET /api/profile`
- **Data**: `GET /api/data/export`, `POST /api/data/clear`, `DELETE /api/account/delete`

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: FastAPI (separate repo)
- **Database**: PostgreSQL + Redis + Qdrant (backend)

## Design Philosophy

### Privacy-First
- End-to-end encryption
- Data export anytime
- Easy account deletion
- Clear retention policies
- No data selling

### Emotional Design
- Primary emotion: "Someone's got my back"
- Tone: First-person, direct, imperfect
- Personality: Empathetic copilot
- Shows movement without judgment

### UX Principles
- Quick logging (<30 seconds)
- Transparent AI reasoning
- Easy intervention dismissal
- Pattern discovery feels rewarding
- No shame/guilt energy

## Contributing

When adding new features:
1. Add types to `types/` directory
2. Add API endpoints to `lib/api.ts`
3. Create components in appropriate `components/` subdirectory
4. Use `useAPI` hook for data fetching
5. Include loading/error states
6. Test with and without backend

## License

MIT

## Questions?

See [API_INTEGRATION.md](./API_INTEGRATION.md) for detailed API documentation.
