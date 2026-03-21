#!/bin/bash

REPO="shubnit12/shubnit12.github.io"
INSTALL_DIR="$HOME/portfolio/www"
VERSION_FILE="$HOME/portfolio/version.txt"

LATEST_TAG=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name"' | cut -d '"' -f 4)

if [ -z "$LATEST_TAG" ]; then
  echo "[$(date)] Could not fetch latest release tag. Skipping."
  exit 1
fi

CURRENT_TAG=$(cat "$VERSION_FILE" 2>/dev/null || echo "none")

if [ "$LATEST_TAG" == "$CURRENT_TAG" ]; then
  echo "[$(date)] Already on latest release: $LATEST_TAG. No update needed."
  exit 0
fi

echo "[$(date)] New release found: $LATEST_TAG (current: $CURRENT_TAG). Deploying..."

curl -sL "https://github.com/${REPO}/releases/download/${LATEST_TAG}/portfolio.zip" -o /tmp/portfolio.zip

rm -rf /tmp/portfolio_extracted
unzip -q /tmp/portfolio.zip -d /tmp/portfolio_extracted

rm -rf "$INSTALL_DIR"/*
cp -r /tmp/portfolio_extracted/. "$INSTALL_DIR"/

echo "$LATEST_TAG" > "$VERSION_FILE"

rm -f /tmp/portfolio.zip
rm -rf /tmp/portfolio_extracted

echo "[$(date)] Successfully deployed $LATEST_TAG."
