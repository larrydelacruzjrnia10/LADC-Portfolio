#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/var/www/quickbite-pos/repo"
FRONTEND_DIR="$APP_ROOT/sample-projects/quickbite-pos/frontend"
SITE_DIR="/var/www/quickbite-pos/site"

cd "$FRONTEND_DIR"
npm install
npm run build

sudo mkdir -p "$SITE_DIR"
sudo rm -rf "$SITE_DIR"/*
sudo cp -R dist/. "$SITE_DIR/"
