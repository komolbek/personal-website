#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set. Refusing to start."
  exit 1
fi

echo "Applying database migrations..."
prisma migrate deploy --schema=./prisma/schema.prisma

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
