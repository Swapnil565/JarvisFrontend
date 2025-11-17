# Frontend Snapshot Guide

## Quick snapshot

```bash
npm run snapshot
```

This creates a git tag `v0.1.0-alpha` and pushes it to the remote repository.

## What gets tagged

The snapshot captures the current **frontend polish milestone**:

✅ **Complete UI implementation**
- Dashboard with mood check, status, and voice log entry
- Onboarding flow with source selection
- Insights page with narrative cards and detail overlay
- Voice logging with hold-to-record and tap-to-toggle
- Morning mood flow
- QR page for mobile testing

✅ **Design system consistency**
- Glass morphism utilities (glass-card, glass-glow)
- Typography scale (heading-xl/lg/md/sm, body-lg/md/sm)
- 8px spacing grid normalized across components
- Shared motion presets in `lib/animations.ts`

✅ **Accessibility foundation**
- WCAG 2.0 Level AA compliant (verified by pa11y)
- ARIA labels, roles, and live regions
- Focus management and keyboard navigation
- Focus-visible indicators throughout

✅ **Voice-first interaction**
- MediaRecorder API for hold-to-record
- Web Speech API recognition fallback
- Transcript editing and cancellation
- Accessible status announcements

✅ **Mobile testing ready**
- Cloudflare tunnel for remote access
- QR page for easy phone scanning
- Responsive design verified

✅ **Centralized patterns**
- Microcopy in `lib/copy.ts`
- API client in `lib/api-client.ts`
- Memory store in `lib/memory-store.ts`
- Animation presets in `lib/animations.ts`

## Manual steps before snapshot

1. **Commit all changes**
   ```bash
   git add .
   git commit -m "Frontend polish complete"
   ```

2. **Verify build**
   ```bash
   npm run build
   ```

3. **Run QA checks**
   ```bash
   npm run a11y-check
   npm run lint
   ```

4. **Create snapshot**
   ```bash
   npm run snapshot
   ```

## Managing snapshots

### List all tags
```bash
git tag -l
```

### View tag details
```bash
git show v0.1.0-alpha
```

### Delete a tag (if needed)
```bash
git tag -d v0.1.0-alpha
git push origin :refs/tags/v0.1.0-alpha
```

### Roll back to a snapshot
```bash
git checkout v0.1.0-alpha
```

## Next milestones

After `v0.1.0-alpha`, future snapshots might be:

- `v0.2.0-alpha` - Backend API integration
- `v0.3.0-alpha` - Real-time memory sync
- `v0.4.0-alpha` - Advanced insights (patterns, trends)
- `v1.0.0-beta` - Feature-complete for initial user testing
- `v1.0.0` - Production release

## CI/CD integration

In your deployment pipeline:

```yaml
- name: Check if snapshot tag
  if: startsWith(github.ref, 'refs/tags/v')
  run: |
    echo "Deploying snapshot ${{ github.ref_name }}"
    npm run build
    # Deploy to staging/preview environment
```
