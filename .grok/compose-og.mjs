import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const amiri = readFileSync("/workspace/.grok/fonts/Amiri-Bold.ttf").toString("base64");
const cinzel = readFileSync("/workspace/.grok/fonts/Cinzel-SemiBold.ttf").toString("base64");
const playfair = readFileSync("/workspace/.grok/fonts/PlayfairDisplay-SemiBold.ttf").toString("base64");
const crest = readFileSync("/workspace/public/jps-crest.png").toString("base64");
const creamArt = readFileSync(
  "/workspace/artifacts/imagine_images/23ab0dfb-925a-4c53-89e6-b7529b18285a.jpg",
).toString("base64");

const html = `<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="utf-8" />
<style>
@font-face {
  font-family: "Amiri";
  src: url("data:font/ttf;base64,${amiri}") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Cinzel";
  src: url("data:font/ttf;base64,${cinzel}") format("truetype");
  font-weight: 600;
}
@font-face {
  font-family: "Playfair";
  src: url("data:font/ttf;base64,${playfair}") format("truetype");
  font-weight: 600;
}
html, body {
  margin: 0;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background: #F4EFE4;
}
.card {
  width: 1200px;
  height: 630px;
  background: url("data:image/jpeg;base64,${creamArt}") center / cover no-repeat;
  display: grid;
  place-items: center;
}
.lockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 640px;
  padding: 28px 48px 30px;
  background: rgba(244, 239, 228, 0.92);
  border-radius: 32px;
  box-shadow: 0 16px 40px rgba(15, 61, 50, 0.16);
}
.crest {
  width: 172px;
  height: 172px;
  object-fit: contain;
  margin-bottom: 10px;
  filter: drop-shadow(0 6px 14px rgba(15, 61, 50, 0.16));
}
.ar {
  font-family: "Amiri", serif;
  font-weight: 700;
  font-size: 56px;
  line-height: 1.05;
  color: #1A1814;
  direction: rtl;
}
.en {
  margin-top: 4px;
  font-family: "Cinzel", "Playfair", serif;
  font-weight: 600;
  font-size: 21px;
  letter-spacing: 0.18em;
  color: #0F3D32;
  line-height: 1.2;
  text-transform: uppercase;
}
.rule {
  width: 156px;
  height: 1.5px;
  margin: 12px 0 10px;
  background: linear-gradient(90deg, transparent 0%, #3D7A66 18%, #0F3D32 50%, #3D7A66 82%, transparent 100%);
}
.sub {
  font-family: "Cinzel", serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.22em;
  color: #3D7A66;
  text-transform: uppercase;
  line-height: 1.35;
}
</style>
</head>
<body>
  <div class="card">
    <div class="lockup">
      <img class="crest" alt="" src="data:image/png;base64,${crest}" />
      <div class="ar" lang="ar">فُرسان القِيَم</div>
      <div class="en">Fursan Al-Qiyam</div>
      <div class="rule"></div>
      <div class="sub">Jeddah Private International School · JPIS</div>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({
  path: "/workspace/.grok/og-card-cream.png",
  type: "png",
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
await browser.close();
console.log("wrote /workspace/.grok/og-card-cream.png");
