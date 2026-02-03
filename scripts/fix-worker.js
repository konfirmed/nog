#!/usr/bin/env node
/**
 * Post-build script to fix the __name undefined error in Cloudflare Workers
 * This injects the missing esbuild helper function at the start of the worker
 */

const fs = require('fs');
const path = require('path');

const workerPath = path.join(process.cwd(), '.open-next', 'worker.js');

// The __name helper that esbuild expects but doesn't always include
const polyfill = `var __name = (target, value) => Object.defineProperty(target, "name", { value, configurable: true });\n`;

if (fs.existsSync(workerPath)) {
  const content = fs.readFileSync(workerPath, 'utf-8');

  // Only inject if not already present
  if (!content.includes('var __name =')) {
    fs.writeFileSync(workerPath, polyfill + content);
    console.log('✓ Injected __name polyfill into worker.js');
  } else {
    console.log('✓ __name already defined in worker.js');
  }
} else {
  console.log('⚠ worker.js not found, skipping polyfill injection');
}
