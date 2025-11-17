# Accessibility QA Guide

## Quick Start

```bash
# 1. Start the dev server (in one terminal)
npm run dev

# 2. Run accessibility checks (in another terminal)
npm run a11y-check
```

## What it checks

The `a11y-check` script uses **pa11y** to scan all major routes for WCAG 2.0 Level AA compliance:

- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ Image alt text
- ✅ Form labels
- ✅ Heading hierarchy
- ✅ Color contrast (with glass morphism exceptions)

## Routes scanned

- `/` - Dashboard
- `/onboarding` - Onboarding flow
- `/insights` - Insights page
- `/log` - Voice logging
- `/qr` - QR code page

## Interpreting results

### ✅ PASS (0 errors)
No critical accessibility issues. Safe to proceed.

### ⚠️ PASS with warnings
Minor issues found. Review recommended but not blocking.

### ❌ FAIL (1+ errors)
Critical accessibility violations. Must fix before tagging.

## Common fixes

**Missing ARIA labels:**
```tsx
<button aria-label="Close dialog">×</button>
```

**Skip link for keyboard users:**
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

**Visible focus indicators:**
```css
button:focus-visible {
  @apply ring-2 ring-purple-400 ring-offset-2;
}
```

## Configuration

Edit `scripts/a11y-check.js` to:
- Add/remove routes
- Adjust timeout for slow pages
- Customize ignore rules
- Change WCAG standard (AA/AAA)

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Accessibility check
  run: |
    npm run dev &
    sleep 5
    npm run a11y-check
```

## Manual testing checklist

Automated checks catch ~60% of issues. Also test:

- [ ] Tab through entire app (logical focus order)
- [ ] Use screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
- [ ] Test keyboard shortcuts (ESC to close, Enter to submit)
- [ ] Verify ARIA live regions announce dynamic content
- [ ] Check high contrast mode compatibility
- [ ] Test with browser zoom at 200%

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [pa11y documentation](https://pa11y.org/)
- [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
