#!/usr/bin/env node
'use strict';

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const DOCS_DIR = path.resolve(__dirname);
const PDF_DIR = path.resolve(__dirname, 'pdf');

const pages = [
  { file: 'index.html',    out: 'pata-de-veludo-visao-geral.pdf' },
  { file: 'frontend.html', out: 'pata-de-veludo-frontend.pdf' },
  { file: 'backend.html',  out: 'pata-de-veludo-backend.pdf' },
  { file: 'payments.html', out: 'pata-de-veludo-pagamentos.pdf' },
  { file: 'admin.html',    out: 'pata-de-veludo-admin.pdf' },
];

async function generatePDFs() {
  if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let errors = [];

  for (const { file, out } of pages) {
    const srcPath = path.join(DOCS_DIR, file);
    const outPath = path.join(PDF_DIR, out);

    if (!fs.existsSync(srcPath)) {
      errors.push(`MISSING: ${file}`);
      continue;
    }

    const page = await browser.newPage();
    await page.goto(`file://${srcPath}`, { waitUntil: 'networkidle', timeout: 30000 });

    // Inject print CSS: hide sidebar, expand main to full width
    await page.addStyleTag({ content: `
      @media print {
        .sidebar { display: none !important; }
        .main { max-width: 100% !important; padding: 32px 48px !important; }
        body { background: white !important; }
        a { color: inherit !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }
      .sidebar { display: none !important; }
      .main { max-width: 100% !important; padding: 32px 48px !important; }
      body { background: white !important; }
    `});

    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '16mm', bottom: '20mm', left: '16mm' },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-family:sans-serif;font-size:9px;color:#999;width:100%;text-align:right;padding-right:16mm;">Pata de Veludo — Documentação Técnica</div>`,
      footerTemplate: `<div style="font-family:sans-serif;font-size:9px;color:#999;width:100%;text-align:center;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
    });

    await page.close();
    console.log(`✓ ${out}`);
  }

  await browser.close();

  if (errors.length) {
    console.error('\nErrors:');
    errors.forEach(e => console.error(' ✗', e));
    process.exit(1);
  }

  console.log(`\n✅ ${pages.length} PDFs generated in docs/pdf/`);
}

generatePDFs().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
