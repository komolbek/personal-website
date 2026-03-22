#!/bin/sh
echo "Starting Necto API..."

if [ -n "$DATABASE_URL" ]; then
  echo "Running database migrations..."
  prisma db push --schema=./prisma/schema.prisma --skip-generate --accept-data-loss || echo "Migration failed, continuing..."
fi

echo "Starting server..."
node dist/main.js
