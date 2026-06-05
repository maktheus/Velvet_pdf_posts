'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');
const LOGO_PATH = path.join(__dirname, '..', 'assets', 'logo.png');

// ─── Load logo as base64 data URL ───────────────────────────────────────────
function loadImageAsDataURL(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const data = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime = ext === 'svg' ? 'image/svg+xml' : `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  return `data:${mime};base64,${data.toString('base64')}`;
}

const LOGO_DATA_URL = loadImageAsDataURL(LOGO_PATH);

// ─── Pill / badge CSS styles ─────────────────────────────────────────────────
const PILL_CSS = {
  pill_cta:      'background:#C4826A;color:#F5EDD8;border-radius:100px;padding:12px 36px;font-size:15px;font-weight:600;font-family:sans-serif;',
  pill_inverse:  'background:#F5EDD8;border:1.5px solid #C4826A;color:#C4826A;border-radius:100px;padding:8px 20px;font-size:14px;font-weight:600;font-family:sans-serif;',
  badge_primary: 'background:#C4826A;color:#F5EDD8;border-radius:100px;padding:6px 16px;font-size:13px;font-weight:500;font-family:sans-serif;',
  badge_dark:    'background:#2D1A0E;color:#F5EDD8;border-radius:100px;padding:6px 16px;font-size:13px;font-weight:500;font-family:sans-serif;',
  badge_sage:    'background:#8FAF8F;color:#F5EDD8;border-radius:100px;padding:6px 16px;font-size:13px;font-weight:500;font-family:sans-serif;',
};

// ─── Position helper ─────────────────────────────────────────────────────────
function pos(p, extra = '') {
  const parts = ['position:absolute'];
  if (p.top    !== undefined) parts.push(`top:${p.top}px`);
  if (p.bottom !== undefined) parts.push(`bottom:${p.bottom}px`);
  if (p.align === 'center') {
    parts.push('left:50%', 'transform:translateX(-50%)');
  } else {
    if (p.left  !== undefined) parts.push(`left:${p.left}px`);
    if (p.right !== undefined) parts.push(`right:${p.right}px`);
  }
  return parts.join(';') + (extra ? ';' + extra : '');
}

// ─── Section renderers ───────────────────────────────────────────────────────
function renderSection(s) {
  if (!s?.position) return '';
  const p_ = s.position;

  switch (s.type) {

    // Logo / brand image
    case 'image': {
      const w = s.size?.width || 64;
      const h = s.size?.height || 64;
      const style = pos(p_, `width:${w}px;height:${h}px;object-fit:contain;`);
      if (LOGO_DATA_URL) {
        return `<img src="${LOGO_DATA_URL}" style="${style}" />`;
      }
      // Fallback: initials pill
      return `<div style="${style};background:#C4826A;border-radius:12px;display:flex;align-items:center;
        justify-content:center;color:#F5EDD8;font-family:sans-serif;font-size:${Math.floor(h/3.5)}px;font-weight:700;">PV</div>`;
    }

    // Full-bleed or partial image (with optional gradient overlay)
    case 'image_fill': {
      const w = s.size?.width || 1080;
      const h = s.size?.height || 1080;
      const t = p_.top || 0;
      const l = p_.left || 0;
      const base = `position:absolute;top:${t}px;left:${l}px;width:${w}px;height:${h}px;`;
      const isPlaceholder = !s.src || s.src.startsWith('PLACEHOLDER');
      const desc = isPlaceholder ? s.src.replace(/^PLACEHOLDER\s*[—–-]\s*/, '') : '';

      let html = isPlaceholder
        ? `<div style="${base}background:#D4C4A8;display:flex;align-items:center;justify-content:center;">
             <p style="color:#7A5A3A;font-family:sans-serif;font-size:22px;text-align:center;
               padding:80px;opacity:0.65;line-height:1.5;">[${desc}]</p>
           </div>`
        : `<img src="${s.src}" style="${base}object-fit:cover;" />`;

      if (s.overlay) {
        html += `<div style="${base}background:${s.overlay};pointer-events:none;"></div>`;
      }
      return html;
    }

    // Text block
    case 'text': {
      const f = s.font || {};
      const leftVal  = p_.left  ?? 0;
      const rightVal = p_.right ?? 0;
      const width = 1080 - leftVal - rightVal;

      const textCss = [
        `font-family:${f.family || 'Georgia, serif'}`,
        `font-size:${f.size || 16}px`,
        `font-weight:${f.weight || 400}`,
        `color:${f.color || '#2D1A0E'}`,
        `line-height:${f.lineHeight || 1.4}`,
        `text-align:${f.align || 'left'}`,
        f.opacity ? `opacity:${f.opacity}` : '',
        'white-space:pre-line',
        'margin:0',
        'padding:0',
        'width:100%',
      ].filter(Boolean).join(';');

      let containerCss = 'position:absolute;';
      if (p_.top    !== undefined) containerCss += `top:${p_.top}px;`;
      if (p_.bottom !== undefined) containerCss += `bottom:${p_.bottom}px;`;
      if (p_.align === 'center') {
        containerCss += `left:50%;transform:translateX(-50%);width:${width}px;`;
      } else {
        containerCss += `left:${leftVal}px;right:${rightVal}px;width:${width}px;`;
      }

      return `<div style="${containerCss}"><p style="${textCss}">${s.text}</p></div>`;
    }

    // Emoji (large)
    case 'emoji': {
      const fs_ = s.font_size || 72;
      return `<span style="${pos(p_)};font-size:${fs_}px;line-height:1;display:block;text-align:center;">${s.text}</span>`;
    }

    // Pill / badge button
    case 'pill': {
      const pillCss = PILL_CSS[s.style] || PILL_CSS.pill_cta;
      return `<span style="${pos(p_)};${pillCss};display:inline-block;white-space:nowrap;">${s.text}</span>`;
    }

    // Progress dot indicator (for carousels)
    case 'progress_dots': {
      const total  = s.total  || 5;
      const active = s.active || 1;
      const color  = s.color  || '#C4826A';
      const dots = Array.from({ length: total }, (_, i) => {
        const on = i + 1 === active;
        return `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 4px;
          background:${on ? color : 'transparent'};
          border:2px solid ${on ? color : color + '4D'};"></span>`;
      }).join('');
      return `<div style="position:absolute;bottom:${p_.bottom || 48}px;left:50%;
        transform:translateX(-50%);white-space:nowrap;">${dots}</div>`;
    }

    // Decorative divider line
    case 'line': {
      const lw = s.width  || 40;
      const lh = s.height || 2;
      return `<div style="${pos(p_)};width:${lw}px;height:${lh}px;background:${s.color || '#C4826A'};"></div>`;
    }

    // 2×2 product image grid
    case 'image_grid': {
      const gap     = s.gap || 12;
      const br      = s.border_radius || 16;
      const cols    = s.columns || 2;
      const lVal    = p_.left  ?? 48;
      const rVal    = p_.right ?? 48;
      const totalW  = 1080 - lVal - rVal;
      const cell    = Math.floor((totalW - gap * (cols - 1)) / cols);

      const cells = (s.images || []).map(img => {
        const isPlaceholder = !img.src || img.src.startsWith('PLACEHOLDER');
        const desc = isPlaceholder ? img.src.replace(/^PLACEHOLDER\s*[—–-]\s*/, '') : '';
        return `<div style="width:${cell}px;height:${cell}px;border-radius:${br}px;overflow:hidden;
          background:#D4C4A8;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${isPlaceholder
            ? `<p style="color:#7A5A3A;font-family:sans-serif;font-size:14px;text-align:center;
                padding:12px;opacity:0.7;line-height:1.3;">${desc}</p>`
            : `<img src="${img.src}" style="width:100%;height:100%;object-fit:cover;" />`}
          <div style="position:absolute;inset:0;
            background:linear-gradient(to bottom,transparent 40%,rgba(45,26,14,0.72) 100%);"></div>
          <div style="position:absolute;bottom:10px;left:0;right:0;text-align:center;
            color:#F5EDD8;font-family:sans-serif;font-size:15px;font-weight:700;letter-spacing:0.5px;">
            ${img.label || ''}
          </div>
        </div>`;
      }).join('');

      return `<div style="position:absolute;top:${p_.top}px;left:${lVal}px;
        display:flex;flex-wrap:wrap;gap:${gap}px;width:${totalW}px;">${cells}</div>`;
    }

    default:
      return '';
  }
}

// ─── Build full HTML page from a layout definition ───────────────────────────
function buildHTML(layout) {
  const bg = layout.background || '#F5EDD8';

  // Render order: backgrounds → overlays → UI chrome → text → pills
  const typeOrder = { image_fill: 0, image_grid: 1, line: 2, image: 3, emoji: 4, text: 5, pill: 6, progress_dots: 7 };
  const sorted = [...(layout.sections || [])].sort(
    (a, b) => (typeOrder[a.type] ?? 5) - (typeOrder[b.type] ?? 5)
  );

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1080px; height:1080px; overflow:hidden;
    background:${bg}; position:relative;
    font-family:Georgia, serif;
  }
  p { margin:0; padding:0; }
</style>
</head>
<body>
${sorted.map(renderSection).join('\n')}
</body>
</html>`;
}

// ─── Puppeteer screenshot helper ─────────────────────────────────────────────
async function renderToFile(html, outputPath, browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  // Small wait for emoji font rendering
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: outputPath, type: 'png' });
  await page.close();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const posts = require('./data/posts_data.js');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  let totalImages = 0;

  try {
    for (const post of posts) {
      const isCarousel = !!post.slides;

      if (isCarousel) {
        const folder = post.filename_output.replace(/\/$/, '');
        const slideDir = path.join(OUTPUT_DIR, folder);
        fs.mkdirSync(slideDir, { recursive: true });
        console.log(`\n📂 ${post.id} — ${post.slides.length} slides → ${folder}/`);

        for (const slide of post.slides) {
          const html = buildHTML(slide.layout);
          const outPath = path.join(slideDir, slide.filename);
          await renderToFile(html, outPath, browser);
          console.log(`   ✓ ${slide.filename}`);
          totalImages++;
        }
      } else {
        const html = buildHTML(post.layout);
        const outPath = path.join(OUTPUT_DIR, post.filename_output);
        await renderToFile(html, outPath, browser);
        console.log(`\n✓ ${post.id} → ${post.filename_output}`);
        totalImages++;
      }
    }

    // Export all captions to JSON
    const captions = posts.map(p => ({
      id: p.id,
      order: p.order,
      type: p.type,
      publish_day: p.publish_day,
      ...(p.slides ? { slides_count: p.slides.length } : {}),
      caption: p.caption,
      ...(p.stories ? { stories: p.stories } : {}),
    }));

    const captionsPath = path.join(OUTPUT_DIR, 'captions.json');
    fs.writeFileSync(captionsPath, JSON.stringify(captions, null, 2), 'utf8');

    console.log(`\n📄 captions.json exported`);
    console.log(`\n🎉 Done! ${totalImages} images generated in posts/output/`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
