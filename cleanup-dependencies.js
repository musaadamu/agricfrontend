#!/usr/bin/env node

/**
 * Cleanup script to remove react-helmet-async and fix React 19 compatibility
 * Run this script if you're still having dependency issues
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up dependencies for React 19 compatibility...');

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Remove react-helmet-async if it exists
if (packageJson.dependencies && packageJson.dependencies['react-helmet-async']) {
    delete packageJson.dependencies['react-helmet-async'];
    console.log('✅ Removed react-helmet-async from dependencies');
}

if (packageJson.devDependencies && packageJson.devDependencies['react-helmet-async']) {
    delete packageJson.devDependencies['react-helmet-async'];
    console.log('✅ Removed react-helmet-async from devDependencies');
}

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json');

// Remove package-lock.json if it exists
const packageLockPath = path.join(__dirname, 'package-lock.json');
if (fs.existsSync(packageLockPath)) {
    fs.unlinkSync(packageLockPath);
    console.log('✅ Removed package-lock.json');
}

// Remove node_modules if it exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    console.log('🗑️  Removing node_modules directory...');
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    console.log('✅ Removed node_modules');
}

console.log('\n🎉 Cleanup complete!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev (to test locally)');
console.log('3. Push to GitHub to trigger Vercel deployment');
console.log('\n✨ Your SEO features will work without react-helmet-async!');
