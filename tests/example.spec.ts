import { test, expect } from "@playwright/test";

test("Escape Room page loads", async ({ page }) => {
  await page.goto("http://localhost:3000/escaperoom", {
    waitUntil: "networkidle",
  });

  // give hydration time
  await page.waitForTimeout(1000);

  // check for something unique to your page
  await expect(page.getByText("Escape Room Challenge")).toBeVisible();
});

test("Start Game button works", async ({ page }) => {
  await page.goto("http://localhost:3000/escaperoom", {
    waitUntil: "networkidle",
  });

  await page.waitForTimeout(800);

  await page.getByRole("button", { name: "Start Game →" }).click();

  // Check for Timer label instead of colon
  await expect(page.getByText("Timer:")).toBeVisible();
});