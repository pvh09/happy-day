import { pathToFileURL } from "node:url";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const results = [];
for (const [width, height] of [
  [1440, 1000],
  [390, 844],
  [320, 740],
  [768, 1024],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const opening = await page.locator(".invitation-card").boundingBox();
  assert(
    opening.width <= 390.1 && opening.x >= 0 && opening.y >= 0,
    "opening card bounds",
  );
  if (width === 1440 || width === 390)
    await page.screenshot({ path: `screenshots/opening-${width}.png` });
  await page
    .getByRole("button", { name: "Chạm để mở thiệp", exact: true })
    .first()
    .click();
  assert.equal(
    await page.locator(".opening").getAttribute("aria-busy"),
    "true",
  );
  if (width === 390) {
    await page.waitForTimeout(250);
    assert.equal(
      await page.locator(".opening").count(),
      1,
      "transition must not disappear immediately",
    );
    await page.screenshot({ path: "screenshots/opening-transition-390.png" });
  }
  await page.locator(".opening").waitFor({ state: "detached" });
  await page.evaluate(async () => {
    await Promise.all(
      document.getAnimations().map((a) => a.finished.catch(() => {})),
    );
  });
  await page.evaluate(async () => {
    for (const img of document.images) {
      img.loading = "eager";
    }
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
  });
  assert.equal(await page.locator(".milestone").count(), 5);
  assert.equal(await page.locator(".event-group").count(), 3);
  assert.equal(await page.locator(".gallery-item").count(), 10);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    "horizontal overflow",
  );
  assert.equal(
    await page.evaluate(
      () =>
        [...document.images].filter((i) => !i.complete || !i.naturalWidth)
          .length,
    ),
    0,
    "broken images",
  );
  const timelineBoxes = await page.locator(".milestone").evaluateAll((es) =>
    es.map((e) => {
      const r = e.getBoundingClientRect();
      return { x: r.x, y: r.y, right: r.right, bottom: r.bottom };
    }),
  );
  for (let i = 1; i < timelineBoxes.length; i++)
    assert(
      width <= 760
        ? timelineBoxes[i].y >= timelineBoxes[i - 1].bottom
        : timelineBoxes[i].x >= timelineBoxes[i - 1].right,
      "timeline overlaps",
    );
  // Scroll through the real viewport so every one-time reveal is exercised.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  for (
    let y = 0;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += height * 0.7
  ) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      y,
    );
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(1100);
  assert.equal(
    await page.locator(".reveal-ready:not(.is-visible)").count(),
    0,
    "every scroll reveal must become visible",
  );
  if (width === 1440 || width === 390)
    await page.screenshot({
      path: `screenshots/main-${width}.png`,
      fullPage: true,
    });
  if (width <= 760) {
    await page.getByRole("button", { name: "Mở menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Album ảnh" })
      .click();
    assert.equal(await page.locator(".nav").getAttribute("class"), "nav");
  }
  await page
    .getByRole("button", { name: "Xem ảnh cưới 1", exact: true })
    .click();
  await page.getByRole("button", { name: "Ảnh sau" }).click();
  assert.equal(await page.locator(".photo-counter").textContent(), "2 / 10");
  await page.keyboard.press("ArrowLeft");
  assert.equal(await page.locator(".photo-counter").textContent(), "1 / 10");
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page
    .getByRole("button", { name: "XÁC NHẬN THAM DỰ", exact: true })
    .click();
  assert(await page.getByText("CHƯA KÍCH HOẠT LƯU DỮ LIỆU").isVisible());
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Thông tin mừng cưới", exact: true })
    .last()
    .click();
  assert(await page.getByText("CHỜ NỘI DUNG CHÍNH THỨC").isVisible());
  await page.keyboard.press("Escape");
  assert.deepEqual(errors, []);
  results.push({
    viewport: `${width}x${height}`,
    checks:
      "PASS: opening transition, scroll reveals, opening bounds, 5 milestones, 3 detail groups, 10 photos, no horizontal overflow, no broken images, no timeline overlaps, gallery navigation, RSVP and gift placeholders, no runtime errors",
  });
  await page.close();
}
const reduced = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await reduced.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await reduced
  .getByRole("button", { name: "Chạm để mở thiệp", exact: true })
  .first()
  .click();
await reduced.locator(".opening").waitFor({ state: "detached", timeout: 1000 });
assert.equal(
  await reduced
    .locator(".hero-copy")
    .evaluate((el) => getComputedStyle(el).animationName),
  "none",
);
assert.equal(
  await reduced
    .locator(".milestone")
    .first()
    .evaluate((el) => getComputedStyle(el).opacity),
  "1",
);
await reduced.close();
results.push({
  mode: "prefers-reduced-motion",
  checks: "PASS: immediate opening, no hero animation, visible story",
});
await browser.close();
await writeFile(
  "screenshots/verification.json",
  JSON.stringify(results, null, 2),
);
console.log(results);
