#!/bin/sh
echo "Running prisma db push to ensure tables exist..."
npx prisma db push --skip-generate --accept-data-loss 2>&1 || echo "Warning: prisma db push failed, continuing anyway..."
echo "Starting server..."
exec node server.js
