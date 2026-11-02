import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveTitle(/indomaret/i);
    await this.dismissPopups();
  }

  /** Tutup popup/modal (lokasi, promo, cookie) bila muncul. */
  async dismissPopups() {
    const closeButtons = this.page
      .getByRole('button', { name: /^(tutup|close|nanti saja|nanti|lewati|skip|mengerti|oke|ok)$/i });
    for (let i = 0; i < 3; i++) {
      const btn = closeButtons.first();
      if (await btn.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await btn.click().catch(() => {});
      } else {
        break;
      }
    }
  }

  /** Step 2: pilih meta kategori "Makanan". */
  async selectMetaCategory(name: string) {
    // Buka menu kategori bila perlu (hover/click), lalu pilih meta kategori
    const kategoriMenu = this.page.getByText(/^\s*Kategori\s*$/i).first();
    if (await kategoriMenu.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await kategoriMenu.hover().catch(() => {});
      await kategoriMenu.click().catch(() => {});
    }

    const meta = this.page
      .getByRole('link', { name: new RegExp(`^\\s*${name}\\s*$`, 'i') })
      .or(this.page.getByText(new RegExp(`^\\s*${name}\\s*$`, 'i')))
      .first();
    await expect(meta, `Meta kategori "${name}" harus tampil`).toBeVisible();
    await meta.hover().catch(() => {});
    await meta.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Step 3: pilih kategori "Madu". */
  async selectCategory(name: string) {
    const category = this.page
      .getByRole('link', { name: new RegExp(`^\\s*${name}\\s*$`, 'i') })
      .or(this.page.getByText(new RegExp(`^\\s*${name}\\s*$`, 'i')))
      .first();
    await expect(category, `Kategori "${name}" harus tampil`).toBeVisible();
    await category.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
