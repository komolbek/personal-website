#!/bin/sh
echo "Starting Necto Admin..."

if [ -n "$DATABASE_URL" ]; then
  echo "Running database sync..."
  prisma db push --schema=./prisma/schema.prisma --skip-generate --accept-data-loss || echo "Migration failed, continuing..."
fi

echo "Starting server..."
# In monorepo standalone output, server.js is under apps/<name>/
if [ -f "apps/admin/server.js" ]; then
  exec node apps/admin/server.js
elif [ -f "server.js" ]; then
  exec node server.js
else
  echo "ERROR: server.js not found!"
  ls -la
  exit 1
fi
