const { execSync } = require('child_process');

try {
  console.log('Running TypeScript check (tsc --noEmit) ...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('TypeScript check passed ✅');
} catch (err) {
  console.error('TypeScript check failed ❌');
  process.exit(1);
}
