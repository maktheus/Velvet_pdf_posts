import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows hero title", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("brinquedos")).toBeVisible();
  });

  test("header has logo and cart button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Pata de Veludo — Início")).toBeVisible();
    await expect(page.getByLabel("Carrinho")).toBeVisible();
  });

  test("clicking cart opens drawer", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Carrinho").click();
    await expect(page.getByText("cesto do seu gato")).toBeVisible();
  });

  test("hero CTA navigates to brincar category", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /ver brinquedos/i }).click();
    await expect(page).toHaveURL("/cat/brincar");
  });

  test("product cards are visible in featured section", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator("article.pv-product");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("flash sale countdown is ticking", async ({ page }) => {
    await page.goto("/");
    const countdown = page.locator(".pv-countdown");
    await expect(countdown).toBeVisible();
    // Verify countdown has numeric content
    const text = await countdown.innerText();
    expect(text).toMatch(/\d{2}h/);
  });

  test("footer links are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /painel admin/i })).toBeVisible();
    await expect(page.getByText(/mutum labs/i)).toBeVisible();
  });
});
