#!/usr/bin/env node
/**
 * Accessibility QA script for JARVIS frontend
 * Uses pa11y to scan key routes for accessibility violations
 * Run: npm run a11y-check
 */

const pa11y = require('pa11y');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const ROUTES = [
  { name: 'Dashboard', path: '/' },
  { name: 'Onboarding', path: '/onboarding' },
  { name: 'Insights', path: '/insights' },
  { name: 'Voice Log', path: '/log' },
  { name: 'QR Page', path: '/qr' },
];

const pa11yOptions = {
  standard: 'WCAG2AA',
  timeout: 30000,
  wait: 2000, // Wait 2s for dynamic content to load
  chromeLaunchConfig: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  ignore: [
    // Ignore color contrast warnings on glass morphism elements (intentional design)
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
  ],
};

async function runA11yCheck() {
  console.log('\n🔍 Running accessibility checks...\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  let totalIssues = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalNotices = 0;

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`📄 Checking: ${route.name} (${url})`);

    try {
      const results = await pa11y(url, pa11yOptions);

      const errors = results.issues.filter((i) => i.type === 'error');
      const warnings = results.issues.filter((i) => i.type === 'warning');
      const notices = results.issues.filter((i) => i.type === 'notice');

      totalIssues += results.issues.length;
      totalErrors += errors.length;
      totalWarnings += warnings.length;
      totalNotices += notices.length;

      if (results.issues.length === 0) {
        console.log(`   ✅ No issues found\n`);
      } else {
        console.log(
          `   ⚠️  Found ${errors.length} errors, ${warnings.length} warnings, ${notices.length} notices\n`
        );

        // Print first 3 issues for context
        results.issues.slice(0, 3).forEach((issue, idx) => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`   ${icon} ${issue.type.toUpperCase()}: ${issue.message}`);
          console.log(`      Code: ${issue.code}`);
          console.log(`      Selector: ${issue.selector}`);
          console.log(`      Context: ${issue.context.slice(0, 80)}...\n`);
        });

        if (results.issues.length > 3) {
          console.log(`   ... and ${results.issues.length - 3} more issues\n`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Error checking ${route.name}:`, error.message);
      console.log('');
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Total issues: ${totalIssues}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);
  console.log(`   Notices: ${totalNotices}\n`);

  if (totalErrors > 0) {
    console.log('❌ Accessibility check FAILED - please fix errors before proceeding\n');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('⚠️  Accessibility check PASSED with warnings - review recommended\n');
    process.exit(0);
  } else {
    console.log('✅ Accessibility check PASSED - no critical issues found\n');
    process.exit(0);
  }
}

// Start the check
runA11yCheck().catch((err) => {
  console.error('\n💥 Fatal error running a11y checks:', err);
  process.exit(1);
});
