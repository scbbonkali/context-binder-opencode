#!/bin/bash
set -e

echo "🔨 Building opencode-context-binding plugin..."

echo "📦 Compiling TypeScript..."
npx tsc --outDir build context-binder.ts

mv build/index.js build/context-binder.js

echo "✅ Build complete! build/context-binder.js ready."