import { Page, expect } from '@playwright/test';

export class ProductDetailPage {
  constructor(private readonly page: Page) {}

  /** Step 5: pastikan sudah berada di halaman detail produk. */
  async expectOnDetailPage() {
    await expect(this.page).toHaveURL(/\/product\//i);
    await expect(this.page.getByRole('heading').first()).toBeVisible();
  }

  private get addToCartButton() {
    return this.page.getByRole('button', { name: /keranjang/i }).first();
  }

  /** Step 6: klik button "+ Keranjang". */
  async addToCart() {
    await expect(this.addToCartButton, 'Button "+ Keranjang" harus tampil').toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
    await this.addToCartButton.click();
  }

  /** Verifikasi: muncul notifikasi/kuantitas pada produk setelah ditambahkan. */
  async expectAddedToCart() {
    const indicator = this.page
      .getByText(/berhasil|ditambahkan|telah masuk/i)
      .or(this.page.getByRole('button', { name: /^\s*[+\-]\s*$/ }))
      .or(this.page.locator('input[type="number"], [class*="qty"], [class*="quantity"]'))
      .first();
    await expect(indicator, 'Harus ada indikator produk masuk keranjang').toBeVisible();
  }
}
