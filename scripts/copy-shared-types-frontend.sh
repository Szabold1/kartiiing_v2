#!/bin/bash

# Build and copy shared-types into Next.js for deployment
echo "Building shared-types..."
cd ../shared-types
npm install
npm run build
cd ..

echo "Copying shared-types to kartiiing..."
mkdir -p kartiiing/node_modules/@kartiiing/shared-types
cp -r shared-types/dist kartiiing/node_modules/@kartiiing/shared-types/
cp shared-types/package.json kartiiing/node_modules/@kartiiing/shared-types/

echo "✓ Shared types built and copied to frontend successfully"
