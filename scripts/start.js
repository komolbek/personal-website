const { execSync } = require('child_process');
const path = require('path');

// NECTO_APP env var controls which app to start
// Set this per Railway service: "web", "hub", "admin", or "api"
const app = process.env.NECTO_APP || 'web';
const port = process.env.PORT || 3000;

console.log(`Starting @necto/${app} on port ${port}...`);

// Run prisma db push for database sync (non-blocking on failure)
try {
  const schemaPath = path.join(__dirname, '..', 'packages', 'db', 'prisma', 'schema.prisma');
  console.log('Running prisma db push...');
  execSync(`npx prisma db push --schema=${schemaPath} --skip-generate --accept-data-loss`, {
    stdio: 'inherit',
  });
} catch (e) {
  console.warn('prisma db push failed, continuing anyway...');
}

// Start the appropriate app
if (app === 'api') {
  // NestJS API
  execSync(`node apps/api/dist/main.js`, { stdio: 'inherit', env: { ...process.env, PORT: String(port) } });
} else {
  // Next.js apps (web, hub, admin)
  const appDir = path.join(__dirname, '..', 'apps', app);
  execSync(`npx next start --port ${port}`, {
    stdio: 'inherit',
    cwd: appDir,
    env: { ...process.env, PORT: String(port) },
  });
}
