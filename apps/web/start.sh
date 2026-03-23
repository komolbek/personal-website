#!/bin/sh
echo "Running prisma db push to ensure tables exist..."
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set!"
else
  echo "DATABASE_URL is set (connecting to database...)"
  prisma db push --skip-generate --accept-data-loss 2>&1 || echo "Warning: prisma db push failed, continuing anyway..."
fi
echo "Starting server..."
# In monorepo standalone output, server.js is under apps/<name>/
if [ -f "apps/web/server.js" ]; then
  exec node apps/web/server.js
elif [ -f "server.js" ]; then
  exec node server.js
else
  echo "ERROR: server.js not found!"
  ls -la
  ls -la apps/web/ 2>/dev/null
  exit 1
fi
