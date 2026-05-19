import { test, expect } from "@playwright/test";

test.describe("Product detail page (PDP)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/produto/puzzle-camarao");
  });

  test("shows product name and price", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Puzzle");
    await expect(page.locator(".pv-pdp-price strong")).toBeVisible();
  });

  test("gallery thumbnails switch main image", async ({ page }) => {
    const thumbs = page.locator(".pv-pdp-thumb");
    await expect(thumbs).toHaveCount(5);
    // Click second thumbnail
    await thumbs.nth(1).click();
    await expect(thumbs.nth(1)).toHaveClass(/active/);
  });

  test("quantity buttons increment and decrement", async ({ page }) => {
    const qty = page.locator(".pv-pdp-qty span");
    await expect(qty).toHaveText("1");

    await page.locator(".pv-pdp-qty button").nth(1).click(); // +
    await expect(qty).toHaveText("2");

    await page.locator(".pv-pdp-qty button").nth(0).click(); // -
    await expect(qty).toHaveText("1");

    // Cannot go below 1
    await page.locator(".pv-pdp-qty button").nth(0).click();
    await expect(qty).toHaveText("1");
  });

  test("tabs switch content", async ({ page }) => {
    const tabs = page.locator(".pv-pdp-tabs button");

    await tabs.filter({ hasText: "ficha" }).click();
    await expect(page.locator(".pv-pdp-tabpane ul")).toBeVisible();

    await tabs.filter({ hasText: "perguntas" }).click();
    await expect(page.locator(".pv-faq")).toBeVisible();
  });

  test("add to cart shows toast", async ({ page }) => {
    await page.locator(".pv-pdp-ctas .pv-pill").click();
    await expect(page.locator(".pv-toast")).toBeVisible();
    await expect(page.locator(".pv-toast")).toContainText("entrou no cesto");
  });

  test("breadcrumb navigates back to category", async ({ page }) => {
    await page.locator(".pv-breadcrumb button").nth(1).click();
    await expect(page).toHaveURL("/cat/brincar");
  });
});
