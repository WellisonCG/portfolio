/**
 * screenshot.js
 * Captures full-page screenshots at every breakpoint extreme.
 * Usage: node scripts/screenshot.js [port]
 *
 * Viewports captured:
 *  375  — mobile center
 *  639  — just below sm  (last mobile pixel)
 *  640  — sm min         (first sm pixel)
 *  767  — just below md  (last sm pixel)
 *  768  — md min         (first md pixel)
 * 1023  — just below lg  (last md pixel)
 * 1024  — lg min         (first lg pixel)
 * 1279  — just below xl  (last lg pixel)
 * 1280  — xl min / Figma design
 */

const { chromium } = require("playwright");
const path  = require("path");
const fs    = require("fs");

const PORT    = process.argv[2] || 3000;
const BASE    = `http://localhost:${PORT}`;
const OUT_DIR = path.join(__dirname, "..", "screenshots");

const VIEWPORTS = [
  { label: "375-mobile",      width: 375  },
  { label: "639-sm-max",      width: 639  },
  { label: "640-sm-min",      width: 640  },
  { label: "767-md-max",      width: 767  },
  { label: "768-md-min",      width: 768  },
  { label: "1023-lg-max",     width: 1023 },
  { label: "1024-lg-min",     width: 1024 },
  { label: "1279-xl-max",     width: 1279 },
  { label: "1280-xl-min",     width: 1280 },
];

async function waitForServer(url, retries = 30, delay = 1000) {
  const http = require("http");
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          resolve();
        });
        req.on("error", reject);
        req.setTimeout(1000, () => { req.destroy(); reject(new Error("timeout")); });
      });
      return true;
    } catch {
      if (i === 0) process.stdout.write("Waiting for dev server");
      process.stdout.write(".");
      await new Promise(r => setTimeout(r, delay));
    }
  }
  process.stdout.write("\n");
  throw new Error(`Server not available at ${url} after ${retries} retries`);
}

(async () => {
  // Ensure output directory exists
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Wait for server
  process.stdout.write(`Connecting to ${BASE}...\n`);
  await waitForServer(BASE);
  process.stdout.write("\nServer ready.\n");

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Disable CSS animations so screenshots are stable
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-delay: 0ms !important;
        transition-duration: 0.001ms !important;
      }`,
    });

    await page.goto(BASE, { waitUntil: "networkidle" });

    // Allow fonts and images to settle
    await page.waitForTimeout(800);

    const file = path.join(OUT_DIR, `${vp.label}.png`);
    await page.screenshot({ path: file, fullPage: true });

    process.stdout.write(`  ✅ ${vp.label}.png  (${vp.width}px)\n`);
    await context.close();
  }

  await browser.close();
  process.stdout.write(`\nAll screenshots saved to: screenshots/\n`);
})();
