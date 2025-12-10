import { test, expect } from "@playwright/test";

test("Escape Room page loads", async ({ page }) => {
  await page.goto("http://localhost:3000/escaperoom", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1000);
  await expect(page.getByText("Escape Room Challenge")).toBeVisible();
});


test("Start Game button works", async ({ page }) => {
  await page.goto("http://localhost:3000/escaperoom", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "Start Game →" }).click();
  await expect(page.getByText("Timer:")).toBeVisible();
});

test("Start button disappears after starting game", async ({ page }) => {
  await page.goto("http://localhost:3000/escaperoom");
  await page.getByRole("button", { name: "Start Game →" }).click();
  await expect(page.getByRole("button", { name: "Start Game →" })).toBeHidden();
});

test("Timer starts counting", async ({ page }) => {
  await page.goto("http://localhost:3000/escaperoom");
  await page.getByRole("button", { name: "Start Game →" }).click();
  await page.waitForTimeout(1200);
  const timerText = await page.getByText("Timer:").innerText();
  expect(timerText).not.toContain("0:00");
});
