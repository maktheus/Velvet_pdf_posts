import { test, expect } from "@playwright/test";

test.describe("Checkout flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cat/brincar");
    await page.locator(".pv-product").first().hover();
    await page.locator(".pv-product-add").first().click();
    // addItem() automatically opens the cart drawer — wait for it
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("cart shows added product", async ({ page }) => {
    await expect(page.locator(".pv-drawer-item")).toHaveCount(1);
  });

  test("free shipping progress bar updates with item", async ({ page }) => {
    const progress = page.locator(".pv-progress-bar > div");
    const width = await progress.evaluate((el) =>
      getComputedStyle(el).width
    );
    expect(parseFloat(width)).toBeGreaterThan(0);
  });

  test("checkout button navigates to checkout page", async ({ page }) => {
    await page.getByRole("button", { name: /finalizar/i }).click();
    await expect(page).toHaveURL("/checkout");
    await expect(page.getByText(/entrega/i)).toBeVisible();
  });

  test("coupon VELUDO10 applies discount", async ({ page }) => {
    await page.getByRole("button", { name: /finalizar/i }).click();
    // Step 1: cart — apply coupon
    const couponInput = page.getByPlaceholder(/cupom/i);
    await couponInput.fill("VELUDO10");
    await page.getByRole("button", { name: /aplicar/i }).click();
    await expect(page.getByText(/10%/i)).toBeVisible();
  });
});
