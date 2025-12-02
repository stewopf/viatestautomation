import base from '@playwright/test';
import fs from 'fs';
import path from 'path';

type Fixtures = {};

export const test = base.extend<Fixtures>({});
export { expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  const outputDir = testInfo.outputDir;

  if (!outputDir || !fs.existsSync(outputDir)) {
    return;
  }

  const entries = fs.readdirSync(outputDir, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name);

  if (!files.length) return;

  await testInfo.attach('Files in test outputDir', {
    body: files.join('\n'),
    contentType: 'text/plain',
  });

  for (const file of files) {
    const fullPath = path.join(outputDir, file);
    const buffer = fs.readFileSync(fullPath);

    await testInfo.attach(file, {
      body: buffer,
      contentType: 'application/octet-stream',
    });
  }
});
