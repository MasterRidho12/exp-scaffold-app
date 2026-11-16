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
              width="24"
              height="24"
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
            <a className="nav-link" href="#destinations">Tujuan Scan</a>
            <a className="nav-link" href="#features">Fitur</a>
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
              <span className="badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
                </svg>
                Shopify Native App
              </span>
              <h1>Label QR Code Interaktif Terhubung ke Shopify Checkout.</h1>
              <p className="lead">
                Buat QR code instan untuk produk atau keranjang belanja Shopify. Pembeli dapat memindai dari ponsel untuk langsung checkout tanpa perlu login.
              </p>

              {showForm && (
                <Form method="post" action="/auth/login" className="connect-form">
                  <div className="field-group">
                    <label className="field-label" htmlFor="shop-domain">
                      Domain Toko Shopify
                    </label>
                    <div className="field-row">
                      <input
                        id="shop-domain"
                        className="field-input"
                        type="text"
                        name="shop"
                        placeholder="toko-anda.myshopify.com"
                        autoComplete="url"
                        required
                      />
                      <button type="submit" className="btn btn--primary">
                        Buka di Shopify
                      </button>
                    </div>
                  </div>
                  <p className="field-help">
                    Masukkan domain .myshopify.com Anda untuk membuka dashboard QR di Shopify Admin.
                  </p>
                </Form>
              )}
            </div>

            {/* INTERACTIVE STICKER TRAY */}
            <div className="sticker-tray">
              <div className="sticker-tray__header">
                <span className="sticker-tray__title">Contoh Output Stiker QR</span>
                <div className="mode-pills" role="tablist" aria-label="Mode Tujuan">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeMode === "cart"}
                    className={`mode-pill ${activeMode === "cart" ? "is-active" : ""}`}
                    onClick={() => setActiveMode("cart")}
                  >
                    Cart checkout
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeMode === "product"}
                    className={`mode-pill ${activeMode === "product" ? "is-active" : ""}`}
                    onClick={() => setActiveMode("product")}
                  >
                    Product page
                  </button>
                </div>
              </div>

              <div className="sticker-sheet">
                <div className="sticker-qr-wrap">
                  {/* Clean SVG QR code vector */}
                  <svg viewBox="0 0 250 250" className="sticker-qr-img" aria-label="QR Code Preview">
                    <rect width="250" height="250" fill="#ffffff" />
                    {/* Top-Left Outer Finder */}
                    <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="#0a563a" strokeWidth="12" />
                    <rect x="36" y="36" width="28" height="28" rx="4" fill="#0a563a" />
                    {/* Top-Right Outer Finder */}
                    <rect x="170" y="20" width="60" height="60" rx="10" fill="none" stroke="#0a563a" strokeWidth="12" />
                    <rect x="186" y="36" width="28" height="28" rx="4" fill="#0a563a" />
                    {/* Bottom-Left Outer Finder */}
                    <rect x="20" y="170" width="60" height="60" rx="10" fill="none" stroke="#0a563a" strokeWidth="12" />
                    <rect x="36" y="186" width="28" height="28" rx="4" fill="#0a563a" />
                    {/* Pattern Matrix Dots */}
                    <rect x="100" y="25" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="125" y="25" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="100" y="50" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="145" y="50" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="100" y="75" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="125" y="75" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="25" y="100" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="50" y="100" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="75" y="100" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="100" y="100" width="16" height="16" rx="3" fill="#0a563a" />
                    <rect x="125" y="100" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="150" y="100" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="175" y="100" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="200" y="100" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="25" y="125" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="75" y="125" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="100" y="125" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="145" y="125" width="16" height="16" rx="3" fill="#0a563a" />
                    <rect x="175" y="125" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="205" y="125" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="50" y="145" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="100" y="145" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="125" y="145" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="175" y="145" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="100" y="175" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="125" y="175" width="16" height="16" rx="3" fill="#0a563a" />
                    <rect x="150" y="175" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="175" y="175" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="100" y="200" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="145" y="200" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="175" y="200" width="16" height="16" rx="3" fill="#111a15" />
                    <rect x="205" y="200" width="16" height="16" rx="3" fill="#0a563a" />
                  </svg>
                </div>

                <div className="sticker-meta">
                  <span className="sticker-badge">
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0f7a53", display: "inline-block" }}></span>
                    {activeMode === "cart" ? "Direct Checkout" : "Storefront Link"}
                  </span>
                  <div className="sticker-name">
                    {activeMode === "cart" ? "Gift Card Spesial (Rp 100.000)" : "Gift Card Spesial"}
                  </div>
                  <div className="sticker-route mono">
                    {activeMode === "cart"
                      ? "toko-anda.myshopify.com/cart/4492018812:1"
                      : "toko-anda.myshopify.com/products/gift-card"}
                  </div>
                  <div className="sticker-stub">
                    <span className="mono" style={{ fontSize: "0.8rem", color: "#4d6356" }}>
                      {activeMode === "cart" ? "scans: 48 | auto-cart" : "scans: 120 | product"}
                    </span>
                    <span className="seal-stamp seal-stamp--tilted">
                      {activeMode === "cart" ? "Tersambung Kasir" : "Katalog Toko"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sticker-tray__footer">
                <span>
                  Mode: <strong>{activeMode === "cart" ? "Direct Cart Checkout" : "Storefront Product Page"}</strong>
                </span>
                <span>Format: PNG HD, Batch Export, Print Label</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CARA MEMAKAI APPS (PANDUAN LENGKAP) */}
        <section className="section-how-to-use" id="how-to-use">
          <div className="container">
            <div className="section-head-center">
              <span className="badge">Panduan Praktis</span>
              <h2>Cara Menggunakan Aplikasi QR Code</h2>
              <p className="lead">
                Ikuti 6 langkah mudah berikut untuk mulai membuat, mencetak, dan melacak label QR code untuk produk toko Shopify Anda.
              </p>
            </div>

            <div className="steps-grid">
              {/* Step 1 */}
              <div className="step-card">
                <div className="step-header">
                  <span className="step-number">Langkah 01</span>
                  <div className="step-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                      <path d="M9 3v18"></path>
                    </svg>
                  </div>
                </div>
                <h3>Buka Aplikasi di Shopify Admin</h3>
                <p>
                  Masukkan domain toko Anda pada formulir login di atas, atau buka aplikasi langsung melalui menu <strong>Apps</strong> di halaman Shopify Admin toko Anda.
                </p>
              </div>

              {/* Step 2 */}
              <div className="step-card">
                <div className="step-header">
                  <span className="step-number">Langkah 02</span>
                  <div className="step-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </div>
                </div>
                <h3>Buat QR Code Baru</h3>
                <p>
                  Pada dashboard aplikasi, klik tombol <strong>"Create QR code"</strong>. Masukkan judul QR code yang deskriptif untuk memudahkan pencarian di kemudian hari.
                </p>
              </div>

              {/* Step 3 */}
              <div className="step-card">
                <div className="step-header">
                  <span className="step-number">Langkah 03</span>
                  <div className="step-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                      <path d="M3 6h18"></path>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                </div>
                <h3>Pilih Produk & Varian</h3>
                <p>
                  Klik tombol <strong>"Select product"</strong> untuk membuka pemilih produk katalog Shopify Anda. Tentukan varian spesifik yang ingin dihubungkan ke QR code ini.
                </p>
              </div>

              {/* Step 4 */}
              <div className="step-card">
                <div className="step-header">
                  <span className="step-number">Langkah 04</span>
                  <div className="step-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="13 17 18 12 13 7"></polyline>
                      <polyline points="6 17 11 12 6 7"></polyline>
                    </svg>
                  </div>
                </div>
                <h3>Tentukan Tujuan Scan (Destination)</h3>
                <p>
                  Pilih <strong>"Product page"</strong> untuk mengarahkan pembeli membaca detail produk, atau <strong>"Checkout with product in cart"</strong> untuk langsung memasukkan barang ke keranjang pembayaran.
                </p>
              </div>

              {/* Step 5 */}
              <div className="step-card">
                <div className="step-header">
                  <span className="step-number">Langkah 05</span>
                  <div className="step-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                </div>
                <h3>Unduh & Cetak Label QR</h3>
                <p>
                  Unduh gambar QR code berkualitas tinggi (PNG). Cetak stiker untuk ditempelkan pada kemasan produk fisik, kartu ucapan, hangtag pakaian, atau standing banner kasir.
                </p>
              </div>

              {/* Step 6 */}
              <div className="step-card">
                <div className="step-header">
                  <span className="step-number">Langkah 06</span>
                  <div className="step-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                </div>
                <h3>Pantau Statistik Scan</h3>
                <p>
                  Setiap kali pelanggan memindai QR code dengan kamera HP (tanpa perlu login), counter scan bertambah secara otomatis. Pantau total scan langsung di dashboard aplikasi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: DUA MODE SCAN */}
        <section className="section-destinations" id="destinations">
          <div className="container">
            <div className="section-head-split">
              <div>
                <span className="badge">Fleksibilitas Penuh</span>
                <h2>Dua Rute Scan, Satu Kode Cetak.</h2>
              </div>
              <p className="lead">
                Pilih apakah label yang dipindai mengarahkan pembeli ke halaman detail katalog atau melompat langsung ke halaman checkout keranjang belanja.
              </p>
            </div>

            <div className="switcher-panel">
              <dl className="spec-list">
                <div className="spec-row">
                  <dt>Mode Scan</dt>
                  <dd>Direct Cart Checkout / Product Page</dd>
                </div>
                <div className="spec-row">
                  <dt>URL Resolved</dt>
                  <dd className="mono">toko-anda.myshopify.com/cart/{`{variant_id}`}:1</dd>
                </div>
                <div className="spec-row">
                  <dt>Penyimpanan</dt>
                  <dd className="mono">$app:qr_code (Shopify Metaobject)</dd>
                </div>
                <div className="spec-row">
                  <dt>Akses Scanner</dt>
                  <dd>Publik &amp; Instan (Tanpa Login Vercel / Shopify)</dd>
                </div>
              </dl>

              <div className="switcher-info">
                <h3>Kenapa Mode Cart Sangat Populer?</h3>
                <p>
                  Mode Cart memotong rintangan berbelanja: pembeli di toko fisik atau event offline cukup mengarahkan kamera ponsel ke label stiker, dan produk incaran otomatis berada di keranjang siap dibayar dalam sekejap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FITUR UNGGULAN (DARK BAND) */}
        <section className="band--ink" id="features">
          <div className="container">
            <div className="band-head">
              <h2>Cetak Label Mandiri &amp; Pantau Performa.</h2>
              <p className="lead">
                Setiap kode QR selalu tersinkronisasi dengan katalog toko Shopify Anda tanpa memerlukan software desain tambahan.
              </p>
            </div>

            <div className="exports-grid">
              <div className="export-item">
                <h3>Kartu QR Publik Berbagi</h3>
                <p className="export-item__desc">
                  Tautan halaman publik yang bersih untuk mengunduh gambar PNG atau melihat pratinjau produk bagi tim desain.
                </p>
                <span className="export-item__meta">Rute: /qrcodes/:id</span>
              </div>

              <div className="export-item">
                <h3>Shopify Native Metaobjects</h3>
                <p className="export-item__desc">
                  Data QR tersimpan aman langsung di dalam ekosistem Shopify Store Anda dengan struktur metaobject resmi.
                </p>
                <span className="export-item__meta">Tipe: $app:qr_code</span>
              </div>

              <div className="export-item">
                <h3>Real-time Scan Analytics</h3>
                <p className="export-item__desc">
                  Setiap pemindaian kamera HP secara otomatis menambah jumlah scan counter sehingga efektivitas promosi Anda terukur.
                </p>
                <span className="export-item__meta">Tracking: Auto Increment</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FAQ */}
        <section className="section-faq" id="faq">
          <div className="container faq-layout">
            <div>
              <span className="badge">FAQ</span>
              <h2>Pertanyaan Umum</h2>
              <p className="lead" style={{ marginTop: "12px" }}>
                Jawaban seputar cara kerja QR code, privasi pembeli, dan integrasi Shopify.
              </p>
            </div>

            <div className="faq-list">
              <div className="faq-row">
                <h3>Apakah pembeli yang memindai QR code harus login?</h3>
                <p>
                  Tidak. Scan berjalan 100% publik dan instan. Pembeli cukup membuka kamera ponsel pintar mereka, mengarahkan ke QR code, dan langsung diarahkan ke halaman produk atau keranjang belanja Shopify Anda.
                </p>
              </div>

              <div className="faq-row">
                <h3>Di mana data QR code disimpan?</h3>
                <p>
                  Semua data QR code disimpan langsung di dalam toko Shopify Anda menggunakan arsitektur Shopify Metaobjects resmi (<span className="mono">$app:qr_code</span>), aman dan terenkripsi.
                </p>
              </div>

              <div className="faq-row">
                <h3>Bagaimana scan dihitung?</h3>
                <p>
                  Setiap kali URL scan dipanggil oleh browser ponsel pembeli, server secara otomatis mencatat dan menambah angka penghitung scan sebelum mengarahkan ke link checkout atau produk.
                </p>
              </div>

              <div className="faq-row">
                <h3>Bisakah saya mengubah tujuan setelah stiker dicetak?</h3>
                <p>
                  Bisa. QR code bersifat dinamis. Anda dapat mengubah tujuan (dari Product Page ke Cart Checkout) atau mengganti varian kapan saja dari dashboard tanpa perlu mencetak ulang fisik kode QR.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="close-band">
          <div className="container close-band__row">
            <div className="close-band__copy">
              <h2>Mulai Buat Label QR di Shopify Admin.</h2>
              <p>Tingkatkan penjualan toko offline &amp; online Anda dengan QR code dinamis.</p>
            </div>
            <a href="#shop-connect" className="btn btn--primary">
              Hubungkan Toko Sekarang
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
                  width="20"
                  height="20"
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
                Generator QR Code Terintegrasi Shopify Admin &amp; Checkout.
              </p>
            </div>

            <nav className="footer-links" aria-label="Footer Navigasi">
              <a className="nav-link" href="#how-to-use">Cara Pakai</a>
              <a className="nav-link" href="#destinations">Tujuan Scan</a>
              <a className="nav-link" href="#features">Fitur</a>
              <a className="nav-link" href="#faq">FAQ</a>
              <a className="nav-link" href="#shop-connect">Store Login</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

