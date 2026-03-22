#!/bin/sh
echo "Running prisma db push to ensure tables exist..."
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set!"
else
  echo "DATABASE_URL is set (connecting to database...)"
  prisma db push --skip-generate --accept-data-loss 2>&1 || echo "Warning: prisma db push failed, continuing anyway..."
fi
echo "Starting server..."
exec node server.js
