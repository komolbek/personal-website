const { execSync } = require('child_process');

// NECTO_APP env var controls which app to build
// Set this per Railway service: "web", "hub", "admin", or "api"
const app = process.env.NECTO_APP || 'web';

console.log(`Building @necto/${app}...`);

// Generate Prisma client first
execSync('pnpm --filter @necto/db db:generate', { stdio: 'inherit' });

// Build the target app
execSync(`pnpm --filter @necto/${app} build`, { stdio: 'inherit' });

console.log(`Build complete for @necto/${app}`);
