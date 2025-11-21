#!/usr/bin/env bun

/**
 * Test script to debug Gemini image analysis
 * Usage: bun run test-image-analysis.ts <path-to-image>
 */

const imagePath = process.argv[2];

if (!imagePath) {
  console.error('❌ Error: Please provide an image path');
  console.log('Usage: bun run test-image-analysis.ts <path-to-image>');
  process.exit(1);
}

const model = process.env.SKETCH_GEMINI_MODEL || 'gemini-2.5-flash';

console.log(`\n🔍 Testing Gemini image analysis...`);
console.log(`📁 Image path: ${imagePath}`);
console.log(`🤖 Model: ${model}\n`);

// Test 1: Using @ syntax (correct Gemini CLI syntax)
console.log('━'.repeat(80));
console.log('Test 1: Using @ syntax (Gemini CLI file reference)');
console.log('━'.repeat(80));

const prompt1 = `Describe this image in detail @${imagePath}`;

console.log('Prompt:', prompt1);
console.log('\nExecuting...\n');

const proc1 = Bun.spawn(['gemini', '-m', model, '--yolo', prompt1], {
  stdout: 'inherit',
  stderr: 'inherit',
  stdin: 'inherit',
});

await proc1.exited;

console.log('\n' + '━'.repeat(80));
console.log('Test 2: Alternative @ syntax placement');
console.log('━'.repeat(80));

const prompt2 = `@${imagePath}

Analyze this image and describe what you see in complete detail.`;

console.log('Prompt:', prompt2);
console.log('\nExecuting...\n');

const proc2 = Bun.spawn(['gemini', '-m', model, '--yolo', prompt2], {
  stdout: 'inherit',
  stderr: 'inherit',
  stdin: 'inherit',
});

await proc2.exited;

console.log('\n' + '━'.repeat(80));
console.log('Test 3: Checking if file exists and is readable');
console.log('━'.repeat(80));

try {
  const file = Bun.file(imagePath);
  const exists = await file.exists();
  console.log(`File exists: ${exists}`);

  if (exists) {
    console.log(`File size: ${file.size} bytes`);
    console.log(`File type: ${file.type}`);
  }
} catch (error) {
  console.error('Error checking file:', error);
}

console.log('\n✅ Tests complete');
