#!/bin/bash
set -e

echo "==================================="
echo "  Zometo - Local Development"
echo "==================================="

# Start backend
echo "Starting backend..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "==================================="
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3200"
echo "==================================="

# Wait for both processes
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
