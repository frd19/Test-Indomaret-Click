import { Page, expect } from '@playwright/test';

export class ProductListPage {
  constructor(private readonly page: Page) {}

  private get productLinks() {
    return this.page.locator('a[href*="/product/"]');
  }

  /** Step 4: pilih salah satu produk (produk pertama) dan kembalikan namanya. */
  async selectFirstProduct(): Promise<string> {
    const first = this.productLinks.first();
    await expect(first, 'Daftar produk Madu harus tampil').toBeVisible({ timeout: 30_000 });
    const name = ((await first.innerText().catch(() => '')) || '').split('\n').find(Boolean)?.trim() ?? '';
    await first.scrollIntoViewIfNeeded();
    await first.click();
    return name;
  }
}
