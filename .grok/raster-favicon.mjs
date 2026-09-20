import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const svg = readFileSync("/workspace/public/favicon.svg", "utf8");

const browser = await chromium.launch();
for (const size of [16, 32, 64]) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<!DOCTYPE html><html><head><style>
html,body{margin:0;width:${size}px;height:${size}px;overflow:hidden;background:transparent}
svg{width:${size}px;height:${size}px;display:block}
</style></head><body>${svg}</body></html>`,
    { waitUntil: "load" },
  );
  await page.screenshot({
    path: `/workspace/.grok/favicon-${size}.png`,
    omitBackground: false,
  });
  await page.close();
}
await browser.close();
console.log("rasterized favicon 16/32/64");
