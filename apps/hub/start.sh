#!/bin/sh
echo "Starting Necto Hub..."

if [ -n "$DATABASE_URL" ]; then
  echo "Running database migrations..."
  prisma db push --schema=./prisma/schema.prisma --skip-generate --accept-data-loss || echo "Migration failed, continuing..."
fi

echo "Starting server..."
# In monorepo standalone output, server.js is under apps/<name>/
if [ -f "apps/hub/server.js" ]; then
  exec node apps/hub/server.js
elif [ -f "server.js" ]; then
  exec node server.js
else
  echo "ERROR: server.js not found!"
  ls -la
  ls -la apps/hub/ 2>/dev/null
  exit 1
fi
