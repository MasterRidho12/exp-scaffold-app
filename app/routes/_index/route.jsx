import { useState } from "react";
import { redirect } from "react-router";
import { Form, useLoaderData } from "react-router";

import { login } from "../../shopify.server";
import styles from "./styles.css?url";

export const links = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }) {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
}

export default function App() {
  const { showForm } = useLoaderData();
  const [activeMode, setActiveMode] = useState("cart");

  return (
    <div className="landing-page">
      {/* HEADER */}
      <header className="site-header">
        <div className="container nav-row">
          <a className="brand-mark" href="/" aria-label="QR Studio Beranda">
            <svg
              className="brand-mark__icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
              <path d="M14 14h3v3h-3z"></path>
              <path d="M17 20h4v-3"></path>
              <path d="M21 14v.01"></path>
            </svg>
            <span>QR Studio</span>
          </a>

          <nav className="nav-links" aria-label="Navigasi Utama">
            <a className="nav-link" href="#how-to-use">Cara Pakai</a>
            <a className="nav-link" href="#destinations">Rute Scan</a>
            <a className="nav-link" href="#features">Spesifikasi</a>
            <a className="nav-link" href="#faq">FAQ</a>
            <a className="btn btn--secondary btn--compact" href="#shop-connect">
              Buka di Shopify
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="shop-connect">
          <div className="container hero-grid">
            <div className="hero__copy">
              <div className="tech-badge">
                <span className="tech-badge__dot"></span>
                Shopify Metaobject Engine
              </div>
              <h1>Label QR Code Presisi Terhubung ke Shopify Checkout.</h1>
              <p className="lead">
                Cetak label stiker barcode dan QR dinamis untuk produk fisik Anda. Hasil scan langsung melompat ke checkout dengan varian otomatis terpasang—bebas login untuk pelanggan.
              </p>

              {showForm && (
                <Form method="post" action="/auth/login" className="connect-form">
                  <div className="field-group">
                    <label className="field-label" htmlFor="shop-domain">
                      Shopify Store Domain
                    </label>
                    <div className="field-row">
                      <input
                        id="shop-domain"
                        className="field-input"
                        type="text"
                        name="shop"
                        placeholder="contoh-toko.myshopify.com"
                        autoComplete="url"
                        required
                      />
                      <button type="submit" className="btn btn--primary">
                        Buka di Shopify
                      </button>
                    </div>
                  </div>
                  <span className="field-help">
                    Masukkan domain .myshopify.com toko Anda untuk login ke dashboard Admin.
                  </span>
                </Form>
              )}
            </div>

            {/* REALISTIC PHYSICAL STICKER TRAY */}
            <div className="sticker-tray">
              <div className="sticker-tray__header">
                <span className="sticker-tray__title">Preview Label Cetak</span>
                <div className="mode-pills" role="tablist" aria-label="Mode Tujuan">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeMode === "cart"}
                    className={`mode-pill ${activeMode === "cart" ? "is-active" : ""}`}
                    onClick={() => setActiveMode("cart")}
                  >
                    Direct Cart Checkout
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeMode === "product"}
                    className={`mode-pill ${activeMode === "product" ? "is-active" : ""}`}
                    onClick={() => setActiveMode("product")}
                  >
                    Product Page
                  </button>
                </div>
              </div>

              <div className="sticker-canvas">
                <div className="physical-sticker">
                  {/* Corner crop marks */}
                  <div className="sticker-crop-mark crop-tl"></div>
                  <div className="sticker-crop-mark crop-tr"></div>
                  <div className="sticker-crop-mark crop-bl"></div>
                  <div className="sticker-crop-mark crop-br"></div>

                  <div className="sticker-content">
                    <div className="sticker-qr-box">
                      <svg viewBox="0 0 250 250" style={{ width: "100%", height: "100%" }} aria-label="QR Code Matrix">
                        <rect width="250" height="250" fill="#ffffff" />
                        {/* Finder Top-Left */}
                        <rect x="18" y="18" width="64" height="64" rx="8" fill="none" stroke="#0f172a" strokeWidth="12" />
                        <rect x="34" y="34" width="32" height="32" rx="4" fill="#0f172a" />
                        {/* Finder Top-Right */}
                        <rect x="168" y="18" width="64" height="64" rx="8" fill="none" stroke="#0f172a" strokeWidth="12" />
                        <rect x="184" y="34" width="32" height="32" rx="4" fill="#0f172a" />
                        {/* Finder Bottom-Left */}
                        <rect x="18" y="168" width="64" height="64" rx="8" fill="none" stroke="#0f172a" strokeWidth="12" />
                        <rect x="34" y="184" width="32" height="32" rx="4" fill="#0f172a" />
                        {/* Data Pattern Cells */}
                        <rect x="98" y="24" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="122" y="24" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="98" y="48" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="142" y="48" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="98" y="72" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="122" y="72" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="24" y="98" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="48" y="98" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="72" y="98" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="98" y="98" width="16" height="16" rx="2" fill="#2563eb" />
                        <rect x="122" y="98" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="146" y="98" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="170" y="98" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="202" y="98" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="24" y="122" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="72" y="122" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="98" y="122" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="142" y="122" width="16" height="16" rx="2" fill="#2563eb" />
                        <rect x="170" y="122" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="202" y="122" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="48" y="144" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="98" y="144" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="122" y="144" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="170" y="144" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="98" y="172" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="122" y="172" width="16" height="16" rx="2" fill="#2563eb" />
                        <rect x="146" y="172" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="170" y="172" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="98" y="198" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="142" y="198" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="170" y="198" width="16" height="16" rx="2" fill="#0f172a" />
                        <rect x="202" y="198" width="16" height="16" rx="2" fill="#2563eb" />
                      </svg>
                    </div>

                    <div className="sticker-meta">
                      <span className="sticker-tag">
                        {activeMode === "cart" ? "Cart Auto-Add" : "Storefront Page"}
                      </span>
                      <div className="sticker-title">
                        {activeMode === "cart" ? "Merino Travel Pack (Black / M)" : "Merino Travel Pack"}
                      </div>
                      <div className="sticker-url-pill">
                        {activeMode === "cart"
                          ? "shop.com/cart/4492018812:1?discount=PACK15"
                          : "shop.com/products/merino-travel-pack"}
                      </div>
                    </div>
                  </div>

                  <div className="sticker-perforated-stub">
                    <span className="sticker-sku">SKU: MTP-092-BLK // $app:qr_code</span>
                    <span className="stamp-badge">
                      {activeMode === "cart" ? "CODE PACK15" : "IN-STOCK"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sticker-tray__footer">
                <span>RUTE: {activeMode === "cart" ? "DIRECT CART CHECKOUT" : "PRODUCT CATALOG PAGE"}</span>
                <span>RESOLUSI: 1024×1024 PNG • PRINT READY</span>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW PIPELINE SECTION ("CARA PAKAI") */}
        <section className="section-pipeline" id="how-to-use">
          <div className="container">
            <div className="section-head">
              <div className="tech-badge">
                <span className="tech-badge__dot"></span>
                Alur Kerja Merchant
              </div>
              <h2>Cara Menggunakan Aplikasi</h2>
              <p className="lead">
                Panduan praktis langkah demi langkah dari pengaturan toko hingga pemindaian label stiker di kasir.
              </p>
            </div>

            <div className="pipeline-grid">
              {/* Step 1 */}
              <div className="pipeline-card">
                <div className="card-top">
                  <span className="card-step-id">01 // AUTENTIKASI</span>
                  <span className="card-code-pill">OAuth 2.0</span>
                </div>
                <h3>Buka Aplikasi di Admin</h3>
                <p>
                  Masukkan domain toko Anda pada form di atas atau buka langsung lewat menu <strong>Apps</strong> di Shopify Admin toko Anda.
                </p>
                <div className="card-code-block">
                  admin.shopify.com/store/{`{toko}`}/apps
                </div>
              </div>

              {/* Step 2 */}
              <div className="pipeline-card">
                <div className="card-top">
                  <span className="card-step-id">02 // INISIALISASI</span>
                  <span className="card-code-pill">New Record</span>
                </div>
                <h3>Buat QR Code Baru</h3>
                <p>
                  Klik tombol <strong>"Create QR code"</strong> pada dashboard. Masukkan judul label yang spesifik untuk memudahkan manajemen stok.
                </p>
                <div className="card-code-block">
                  Title: "Display Kasir - Gift Card 100K"
                </div>
              </div>

              {/* Step 3 */}
              <div className="pipeline-card">
                <div className="card-top">
                  <span className="card-step-id">03 // SELEKSI KATALOG</span>
                  <span className="card-code-pill">ResourcePicker</span>
                </div>
                <h3>Pilih Produk &amp; Varian</h3>
                <p>
                  Pilih produk dari katalog Shopify Store Anda. Tentukan varian target spesifik yang ingin dihubungkan ke kode QR.
                </p>
                <div className="card-code-block">
                  Variant ID: gid://shopify/ProductVariant/...
                </div>
              </div>

              {/* Step 4 */}
              <div className="pipeline-card">
                <div className="card-top">
                  <span className="card-step-id">04 // RUTE TUJUAN</span>
                  <span className="card-code-pill">302 Redirect</span>
                </div>
                <h3>Tentukan Mode Scan</h3>
                <p>
                  Pilih <strong>Cart Checkout</strong> (otomatis masuk keranjang &amp; kasir) atau <strong>Product Page</strong> (halaman detail katalog website).
                </p>
                <div className="card-code-block">
                  Destination: "cart" | "product"
                </div>
              </div>

              {/* Step 5 */}
              <div className="pipeline-card">
                <div className="card-top">
                  <span className="card-step-id">05 // PRODUKSI FISIK</span>
                  <span className="card-code-pill">PNG High-Res</span>
                </div>
                <h3>Unduh &amp; Cetak Label</h3>
                <p>
                  Download file PNG beresolusi tajam. Cetak pada stiker kemasan produk, tag pakaian, selebaran promo, atau akrilik meja kasir fisik.
                </p>
                <div className="card-code-block">
                  Format: 1024x1024px lossless PNG
                </div>
              </div>

              {/* Step 6 */}
              <div className="pipeline-card">
                <div className="card-top">
                  <span className="card-step-id">06 // PELACAKAN</span>
                  <span className="card-code-pill">Real-time DB</span>
                </div>
                <h3>Pantau Statistik Scan</h3>
                <p>
                  Ketika pembeli memindai QR lewat kamera ponsel (tanpa login), server secara otomatis menambah counter scan di metaobject Shopify Anda.
                </p>
                <div className="card-code-block">
                  scans: scans + 1 (Metaobject sync)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION SPECS & DESTINATIONS */}
        <section className="section-specs" id="destinations">
          <div className="container">
            <div className="section-head-split">
              <div>
                <div className="tech-badge">
                  <span className="tech-badge__dot"></span>
                  Spesifikasi Teknis
                </div>
                <h2>Dua Rute Scan, Satu Label Cetak.</h2>
              </div>
              <p className="lead">
                Fleksibilitas penuh untuk mengubah tujuan pemindaian kapan saja tanpa perlu mencetak ulang fisik stiker yang sudah tertempel di produk.
              </p>
            </div>

            <div className="spec-container">
              <dl className="spec-table">
                <div className="spec-entry">
                  <dt>Mode Scan</dt>
                  <dd>Direct Cart Checkout / Product Page</dd>
                </div>
                <div className="spec-entry">
                  <dt>Resolved Path</dt>
                  <dd className="mono">{`{shop}.myshopify.com/cart/{variant_id}:1`}</dd>
                </div>
                <div className="spec-entry">
                  <dt>Storage Type</dt>
                  <dd className="mono">$app:qr_code (Shopify Metaobject)</dd>
                </div>
                <div className="spec-entry">
                  <dt>Akses Pemindai</dt>
                  <dd>Publik Instan (Tanpa login Vercel atau akun toko)</dd>
                </div>
                <div className="spec-entry">
                  <dt>Lifecycle Scan</dt>
                  <dd className="mono">GET /qrcodes/:id/scan → 302 Found</dd>
                </div>
              </dl>

              <div className="spec-callout">
                <h3>Keunggulan Rute Cart Checkout</h3>
                <p>
                  Mengeliminasi gesekan proses belanja online. Konsumen di toko fisik atau pameran cukup mengarahkan kamera HP ke stiker, dan produk yang diinginkan langsung masuk ke keranjang pembayaran Shopify dalam 1 detik.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FEATURES */}
        <section className="section-features" id="features">
          <div className="container">
            <div className="section-head">
              <div className="tech-badge">
                <span className="tech-badge__dot"></span>
                Arsitektur Bawaan
              </div>
              <h2>Keamanan &amp; Performa Kelas Industri</h2>
            </div>

            <div className="features-grid">
              <div className="feature-box">
                <h3>Kartu Berbagi Publik</h3>
                <p>
                  Setiap QR code memiliki URL kartu publik bersih (<span className="mono">/qrcodes/:id</span>) untuk pratinjau instan dan download aset PNG resolusi tinggi.
                </p>
                <span className="feature-tag">ENDPOINT: /qrcodes/:id</span>
              </div>

              <div className="feature-box">
                <h3>Native Metaobjects</h3>
                <p>
                  Data disimpan langsung di dalam cloud Shopify Store Anda menggunakan Metaobjects resmi (<span className="mono">$app:qr_code</span>), bebas ketergantungan database pihak ketiga yang lambat.
                </p>
                <span className="feature-tag">DEFINITION: $app:qr_code</span>
              </div>

              <div className="feature-box">
                <h3>Auto-Increment Counter</h3>
                <p>
                  Setiap scan kamera dihitung secara atomik saat HTTP redirect berlangsung, memberikan metrik analitik pemindaian offline yang presisi.
                </p>
                <span className="feature-tag">COUNTER: Atomic Update</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FAQ */}
        <section className="section-faq" id="faq">
          <div className="container faq-layout">
            <div>
              <div className="tech-badge">
                <span className="tech-badge__dot"></span>
                Dokumentasi
              </div>
              <h2>Pertanyaan Umum</h2>
              <p className="lead" style={{ marginTop: "12px" }}>
                Jawaban ringkas seputar privasi pelanggan, scan tanpa login, dan sinkronisasi produk.
              </p>
            </div>

            <div className="faq-list">
              <div className="faq-item">
                <h3>Apakah pembeli yang scan butuh login?</h3>
                <p>
                  Sama sekali tidak. URL scan bersifat publik murni. Kamera ponsel iPhone maupun Android akan langsung membuka browser dan mengarahkan pembeli ke produk atau checkout toko Anda tanpa rintangan login.
                </p>
              </div>

              <div className="faq-item">
                <h3>Di mana data QR code disimpan?</h3>
                <p>
                  Semua data QR tersimpan aman langsung di dalam metaobjects toko Shopify Anda, terhubung dengan sesi terenkripsi PostgreSQL di backend server.
                </p>
              </div>

              <div className="faq-item">
                <h3>Bisakah mengubah rute setelah QR dicetak?</h3>
                <p>
                  Bisa. Barcode yang tercetak mengarah ke rute pengalih dinamis kami. Anda bebas mengganti varian atau mengubah rute dari Product ke Cart kapan saja di Shopify Admin tanpa perlu mencetak ulang fisik stiker.
                </p>
              </div>

              <div className="faq-item">
                <h3>Bagaimana penghitungan scan bekerja?</h3>
                <p>
                  Saat scanner mengakses URL scan, sistem secara otomatis mengeksekusi mutasi counter `scans` sebesar +1 di Shopify Metaobject sebelum mengirimkan respons HTTP 302 ke halaman checkout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="cta-band">
          <div className="container cta-row">
            <div className="cta-copy">
              <h2>Mulai Kelola Label QR di Shopify Admin.</h2>
              <p>Sambungkan katalog toko fisik dan online Anda dengan pengalaman checkout instan.</p>
            </div>
            <a href="#shop-connect" className="btn btn--primary">
              Hubungkan Toko
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-row">
            <div>
              <a className="brand-mark" href="/">
                <svg
                  className="brand-mark__icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                  <path d="M14 14h3v3h-3z"></path>
                  <path d="M17 20h4v-3"></path>
                  <path d="M21 14v.01"></path>
                </svg>
                <span>QR Studio</span>
              </a>
              <p className="footer-note">
                Shopify Metaobject QR Engine. All rights reserved.
              </p>
            </div>

            <nav className="footer-links" aria-label="Footer Navigasi">
              <a className="nav-link" href="#how-to-use">Cara Pakai</a>
              <a className="nav-link" href="#destinations">Rute Scan</a>
              <a className="nav-link" href="#features">Spesifikasi</a>
              <a className="nav-link" href="#faq">FAQ</a>
              <a className="nav-link" href="#shop-connect">Store Login</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}


