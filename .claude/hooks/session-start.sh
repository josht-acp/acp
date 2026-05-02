#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "Installing web dependencies..."
cd "$CLAUDE_PROJECT_DIR/app/web"
npm install

echo "Installing server dependencies..."
cd "$CLAUDE_PROJECT_DIR/app/server"
npm install

echo "Session start complete."
