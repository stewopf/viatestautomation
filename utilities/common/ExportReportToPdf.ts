// scripts/export-report-to-pdf.ts
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function exportReport(reportDir: string) {
  const reportHtml = path.resolve(reportDir, 'index.html');

  if (!fs.existsSync(reportHtml)) {
    console.error(`Report not found: ${reportHtml}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load the HTML report
  await page.goto(`file://${reportHtml}`, { waitUntil: 'networkidle' });

  // Export to PDF
  const pdfPath = path.resolve(reportDir, 'report.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  console.log(`✅ PDF created: ${pdfPath}`);
}

// Report folder is sent as CLI argument
const reportFolder = process.argv[2];
if (!reportFolder) {
  console.log("❌ Missing argument. Use: node export-report-to-pdf.js <report-folder>");
  process.exit(1);
}

exportReport(reportFolder);
