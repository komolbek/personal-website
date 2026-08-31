#!/bin/sh
set -e

# Hub has its own database. The name is deliberately not DATABASE_URL so that
# pointing this service at the website's database fails loudly instead of
# quietly writing business records into the CMS database.
if [ -z "$HUB_DATABASE_URL" ]; then
  echo "ERROR: HUB_DATABASE_URL is not set. Refusing to start."
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
