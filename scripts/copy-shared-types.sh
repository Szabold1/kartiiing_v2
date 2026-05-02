#!/bin/bash

# Build and copy shared into API for deployment
echo "Building shared..."
cd shared
npm install
npm run build
cd ..

echo "Copying shared to api..."
mkdir -p api/node_modules/@kartiiing/shared
cp -r shared/dist api/node_modules/@kartiiing/shared/
cp shared/package.json api/node_modules/@kartiiing/shared/

echo "✓ Shared package built and copied successfully"
