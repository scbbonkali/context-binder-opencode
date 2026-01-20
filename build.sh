#!/bin/bash
set -e

echo "🔨 Building opencode-context-binding plugin..."

rm -rf dist
mkdir -p dist

echo "📦 Compiling TypeScript..."
bun build context-binder.ts --outdir dist --target node --format esm --external:@opencode-ai/plugin

echo "✅ Build complete! dist/index.js ready."