#!/bin/bash
set -e

echo "==================================="
echo "  Zometo - Deploy Script"
echo "==================================="

PROJECT_DIR="/opt/app"
BACKUP_DIR="/opt/app-backups"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup current version
if [ -f "$PROJECT_DIR/server.js" ]; then
  BACKUP_NAME="backup-$(date +%Y%m%d%H%M%S)"
  echo "Backing up current version to $BACKUP_NAME..."
  cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME"
fi

# Deploy
echo "Deploying latest code..."
cd "$PROJECT_DIR"

# Install dependencies
echo "Installing dependencies..."
npm ci --omit=dev

# Restart application
echo "Restarting application..."
pm2 restart zometo-backend || pm2 start server.js --name zometo-backend --watch false

# Health check
echo "Running health check..."
sleep 5
if curl -sf http://localhost:3200/health > /dev/null; then
  echo "Deployment successful! Health check passed."
else
  echo "Health check failed! Rolling back..."
  if [ -d "$BACKUP_DIR/$BACKUP_NAME" ]; then
    rm -rf "$PROJECT_DIR"
    cp -r "$BACKUP_DIR/$BACKUP_NAME" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
    pm2 restart zometo-backend || pm2 start server.js --name zometo-backend
    echo "Rollback complete."
  else
    echo "No backup found. Manual intervention required."
    exit 1
  fi
fi
