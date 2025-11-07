# JARVIS Frontend - API Integration Guide

## Overview
This document explains how to integrate the JARVIS frontend with the FastAPI backend.

## Environment Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: Enable API mocking for development without backend
NEXT_PUBLIC_USE_MOCK_API=false
```

### 2. Backend Requirements
The backend must be running and accessible at the URL specified in `NEXT_PUBLIC_API_URL`.

Expected backend routes:
- `GET /health` - Health check
- `POST /api/onboarding/complete` - Complete onboarding
- `POST /api/logs` - Submit log entry
- `GET /api/logs` - Fetch log history
- `GET /api/dashboard` - Get dashboard data
- `GET /api/insights/patterns` - Get patterns/insights
- `POST /api/insights/patterns/{id}/acted` - Mark pattern as acted on
- `GET /api/interventions/active` - Get active interventions
- `POST /api/interventions/{id}/dismiss` - Dismiss intervention
- `POST /api/interventions/{id}/snooze` - Snooze intervention
- `GET /api/progress/trends/{dimension}` - Get trend data
- `GET /api/progress/summaries` - Get weekly summaries
- `GET /api/progress/patterns/historical` - Get historical patterns
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update settings
- `GET /api/profile` - Get user profile
- `GET /api/data/export` - Export user data
- `POST /api/data/clear` - Clear all data
- `DELETE /api/account/delete` - Delete account

## Using the API Client

### Basic Usage

```typescript
import { dashboardAPI } from '@/lib/api';

// Simple API call
const data = await dashboardAPI.getDashboardData();
```

### With React Hooks (Recommended)

```typescript
import { useAPI } from '@/hooks/useAPI';
import { dashboardAPI } from '@/lib/api';

function MyComponent() {
  const { data, loading, error, refetch } = useAPI(
    () => dashboardAPI.getDashboardData(),
    true // fetch immediately
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  
  return <div>{/* Use data */}</div>;
}
```

### Mutations (POST/PATCH/DELETE)

```typescript
import { useMutation } from '@/hooks/useAPI';
import { loggingAPI } from '@/lib/api';

function LogForm() {
  const { mutate, loading, error } = useMutation(loggingAPI.submitLog);

  const handleSubmit = async () => {
    const result = await mutate({
      type: 'quick_log',
      timestamp: new Date().toISOString(),
      data: { mood: 8 },
    });
    
    if (result) {
      console.log('Log submitted successfully');
    }
  };

  return (
    <button onClick={handleSubmit} disabled={loading}>
      {loading ? 'Submitting...' : 'Submit Log'}
    </button>
  );
}
```

### Polling for Real-time Updates

```typescript
import { usePolling } from '@/hooks/useAPI';
import { interventionsAPI } from '@/lib/api';

function InterventionsFeed() {
  const { data, loading, error } = usePolling(
    () => interventionsAPI.getActiveInterventions(),
    30000, // Poll every 30 seconds
    true   // Enable polling
  );

  // Component renders with live data
}
```

## Error Handling

### API Errors
All API errors are wrapped in `APIError` class with:
- `message`: Human-readable error message
- `status`: HTTP status code
- `code`: Error code from backend

### Network Errors
Network failures are caught and returned as:
```typescript
{
  message: 'Unable to connect to JARVIS. Check your connection.',
  status: 0,
  code: 'NETWORK_ERROR'
}
```

### Displaying Errors

```typescript
import ErrorMessage from '@/components/ui/ErrorMessage';

<ErrorMessage 
  message={error} 
  onRetry={() => refetch()}
  isDismissible={true}
  onDismiss={() => setError(null)}
/>
```

## Loading States

### Full Page Loading
```typescript
import LoadingSpinner from '@/components/ui/LoadingSpinner';

<LoadingSpinner size="lg" message="Loading your dashboard..." />
```

### Skeleton Loading
```typescript
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

<LoadingSkeleton variant="card" count={3} />
```

## Migration from Mock Data

### Step 1: Replace Mock Data with API Calls

**Before (Mock):**
```typescript
const dimensionsData = {
  physical: { status: 'good', score: 7.5, ... }
};
```

**After (API):**
```typescript
const { data, loading, error } = useAPI(() => dashboardAPI.getDashboardData());
```

### Step 2: Add Loading/Error States

```typescript
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} onRetry={refetch} />;
if (!data) return null;

// Use data...
```

### Step 3: Test with Backend

1. Start backend: `cd backend && uvicorn main:app --reload`
2. Start frontend: `npm run dev`
3. Verify API calls in Network tab
4. Check for CORS issues (backend must allow frontend origin)

## Common Issues

### CORS Errors
**Problem:** Browser blocks API requests  
**Solution:** Backend must include CORS middleware:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 404 Errors
**Problem:** Route not found  
**Solution:** Verify route exists in backend and matches API client

### Type Mismatches
**Problem:** TypeScript errors on API responses  
**Solution:** Update types in `lib/api.ts` to match backend schema

## Performance Optimization

### Caching
Consider implementing SWR or React Query for:
- Automatic caching
- Background refetching
- Optimistic updates

### Debouncing
For search/filter operations:
```typescript
import { debounce } from 'lodash';

const debouncedSearch = debounce(searchAPI.query, 300);
```

## Testing

### Mock API for Development
Set `NEXT_PUBLIC_USE_MOCK_API=true` to use mock data without backend.

### Integration Tests
Test API integration with MSW (Mock Service Worker):
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/dashboard', (req, res, ctx) => {
    return res(ctx.json({ /* mock data */ }));
  })
);
```

## Production Deployment

### Environment Variables
Set `NEXT_PUBLIC_API_URL` to production backend URL:
```bash
NEXT_PUBLIC_API_URL=https://api.jarvis.app
```

### Error Monitoring
Integrate Sentry or similar for production error tracking:
```typescript
if (process.env.NODE_ENV === 'production') {
  Sentry.captureException(error);
}
```

## API Client Reference

See `lib/api.ts` for complete API reference including:
- `onboardingAPI` - Onboarding endpoints
- `loggingAPI` - Logging endpoints
- `dashboardAPI` - Dashboard data
- `insightsAPI` - Patterns and insights
- `interventionsAPI` - Interventions management
- `progressAPI` - Progress tracking
- `settingsAPI` - User settings and profile
- `healthAPI` - Health checks
