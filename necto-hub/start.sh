#!/bin/sh
echo "Starting Necto Hub..."

if [ -n "$DATABASE_URL" ]; then
  echo "Running database migrations..."
  npx prisma db push --skip-generate --accept-data-loss || echo "Migration failed, continuing..."
fi

echo "Starting server..."
node server.js
