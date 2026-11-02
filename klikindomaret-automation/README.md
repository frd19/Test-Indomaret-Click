# Klik Indomaret Web Automation

Automation web **tanpa login** menggunakan **Playwright + TypeScript** (Page Object Model).

## Skenario
1. Akses https://www.klikindomaret.com/
2. Pilih Meta Kategori "Makanan"
3. Pilih kategori "Madu"
4. Pilih salah satu produk Madu
5. Masuk ke halaman produk detail
6. Klik button "+ Keranjang"

## Cara menjalankan
```bash
npm install
npx playwright install chromium
npm test            # headed (default)
npm run report      # lihat HTML report
```

## Struktur
```
pages/   -> Page Object (HomePage, ProductListPage, ProductDetailPage)
tests/   -> Spec test (add-to-cart.spec.ts)
playwright.config.ts
```

## Catatan
- Dijalankan mode headed karena situs e-commerce kerap memblokir headless.
- Bila UI Klik Indomaret berubah, sesuaikan locator di folder `pages/`.
