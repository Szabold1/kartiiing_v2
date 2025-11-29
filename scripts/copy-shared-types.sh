#!/bin/bash

# Build and copy shared-types into API for deployment
echo "Building shared-types..."
cd shared-types
npm install
npm run build
cd ..

echo "Copying shared-types to api..."
mkdir -p api/node_modules/@kartiiing/shared-types
cp -r shared-types/dist api/node_modules/@kartiiing/shared-types/
cp shared-types/package.json api/node_modules/@kartiiing/shared-types/

echo "✓ Shared types built and copied successfully"
