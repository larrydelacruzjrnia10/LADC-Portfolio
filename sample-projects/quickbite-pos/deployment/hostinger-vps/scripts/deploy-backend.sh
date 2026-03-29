#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/var/www/quickbite-pos/repo"
BACKEND_DIR="$APP_ROOT/sample-projects/quickbite-pos/backend"
PM2_CONFIG="$APP_ROOT/sample-projects/quickbite-pos/deployment/hostinger-vps/pm2/ecosystem.config.cjs"

cd "$BACKEND_DIR"
npm install
pm2 startOrReload "$PM2_CONFIG" --env production
pm2 save
