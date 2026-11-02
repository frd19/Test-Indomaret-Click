import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Klik Indomaret - Tambah produk Madu ke keranjang (tanpa login)', () => {
  test('User dapat menambahkan produk Madu ke keranjang', async ({ page }, testInfo) => {
    const home = new HomePage(page);
    const list = new ProductListPage(page);
    const detail = new ProductDetailPage(page);

    await test.step('Akses https://www.klikindomaret.com/', async () => {
      await home.open();
    });

    await test.step('Pilih Meta Kategori "Makanan"', async () => {
      await home.selectMetaCategory('Makanan');
    });

    await test.step('Pilih kategori "Madu"', async () => {
      await home.selectCategory('Madu');
    });

    let productName = '';
    await test.step('Pilih salah satu produk Madu', async () => {
      productName = await list.selectFirstProduct();
      console.log(`Produk dipilih: ${productName}`);
    });

    await test.step('Masuk ke halaman produk detail', async () => {
      await detail.expectOnDetailPage();
    });

    await test.step('Klik button "+ Keranjang"', async () => {
      await detail.addToCart();
      await testInfo.attach('setelah-klik-keranjang', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png',
      });
    });

    await test.step('Verifikasi produk masuk keranjang', async () => {
      await detail.expectAddedToCart();
    });
  });
});
