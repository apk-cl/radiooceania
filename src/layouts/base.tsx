import { html } from 'hono/html'
import type { ColorPalette } from '../lib/colors'
import { paletteToCSS } from '../lib/colors'
import { RadioBar } from '../components/radio-bar'

export function Layout({ palette, userEmail, children }: {
  palette: ColorPalette
  userEmail?: string
  children: any
}) {
  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO primario */}
        <title>Radio Oceanía 93.7 FM | Escucha en Vivo desde Talcahuano, Concepción</title>
        <meta name="description" content="Escucha Radio Oceanía 93.7 FM en vivo online desde Talcahuano. La mejor música de los 60s, 70s, 80s y 90s para el Gran Concepción y el mundo. ¡Sintoniza ahora!" />
        <meta name="keywords" content="Radio Oceanía, 93.7 FM, radio online, radio Talcahuano, radio Concepción, radio en vivo, música del recuerdo, radio Chile, 93.7, radio Biobío" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="google-site-verification" content="zUpa4na2SGr0RXRIkxUeJclEQUKGBEf62Yr8v_32OuI" />
        <meta name="author" content="Radio Oceanía 93.7 FM" />
        <meta name="theme-color" content="#0D1B2A" />
        <link rel="canonical" href="https://radiooceania.cl" />

        {/* Geo */}
        <meta name="geo.region" content="CL-BI" />
        <meta name="geo.placename" content="Talcahuano, Concepción, Chile" />
        <meta name="geo.position" content="-36.7249;-73.1174" />
        <meta name="ICBM" content="-36.7249, -73.1174" />

        {/* Open Graph — optimizado para WhatsApp, Facebook e iMessage */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Radio Oceanía 93.7 FM" />
        <meta property="og:locale" content="es_CL" />
        <meta property="og:url" content="https://radiooceania.cl" />
        <meta property="og:title" content="🎵 Radio Oceanía 93.7 FM — ¡Escúchanos en vivo!" />
        <meta property="og:description" content="📻 La radio de Talcahuano para el Gran Concepción y el mundo. Los mejores éxitos de los 60s, 70s, 80s y 90s en línea, gratis y sin interrupciones." />
        <meta property="og:image" content="https://radiooceania.cl/logo.png" />
        <meta property="og:image:secure_url" content="https://radiooceania.cl/logo.png" />
        <meta property="og:image:width" content="1443" />
        <meta property="og:image:height" content="843" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Radio Oceanía 93.7 FM — Escúchanos en vivo desde Talcahuano" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@radiooceania" />
        <meta name="twitter:title" content="🎵 Radio Oceanía 93.7 FM — ¡Escúchanos en vivo!" />
        <meta name="twitter:description" content="📻 La radio de Talcahuano para el Gran Concepción y el mundo. Los mejores éxitos en línea, gratis." />
        <meta name="twitter:image" content="https://radiooceania.cl/logo.png" />
        <meta name="twitter:image:alt" content="Radio Oceanía 93.7 FM" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="https://radiooceania.cl/logo.png" />
        <link rel="apple-touch-icon" href="https://radiooceania.cl/logo.png" />

        {/* JSON-LD: RadioStation para Google */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RadioStation",
          "name": "Radio Oceanía",
          "alternateName": "Radio Oceanía 93.7 FM",
          "url": "https://radiooceania.cl",
          "logo": "https://radiooceania.cl/logo.png",
          "image": "https://radiooceania.cl/og-image.png",
          "description": "Estación de radio que opera en el 93.7 FM desde Talcahuano para el Gran Concepción y el mundo. La mejor música de los 60s, 70s, 80s y 90s.",
          "broadcastFrequency": "93.7 FM",
          "broadcastTimezone": "America/Santiago",
          "areaServed": {
            "@type": "City",
            "name": "Concepción",
            "containedInPlace": {
              "@type": "State",
              "name": "Biobío",
              "containedInPlace": { "@type": "Country", "name": "Chile" }
            }
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Talcahuano",
            "addressRegion": "Biobío",
            "addressCountry": "CL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -36.7249,
            "longitude": -73.1174
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "oceaniatalcahuano@gmail.com",
            "availableLanguage": "Spanish"
          },
          "potentialAction": {
            "@type": "ListenAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://radiooceania.cl",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            },
            "expectsAcceptanceOf": {
              "@type": "Offer",
              "category": "free"
            }
          },
          "sameAs": [
            "https://www.facebook.com/radiooceania937",
            "https://radiooceania.cl"
          ]
        }) }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer />
        <style>{paletteToCSS(palette)}</style>
        <style>{css}</style>
      </head>
      <body>
        <Header userEmail={userEmail} palette={palette} />
        <main class="main">{children}</main>
        <Footer palette={palette} />
        <RadioBar />
        <WhatsAppButton />
        <script dangerouslySetInnerHTML={{ __html: oceanScrollScript }} />
        <script dangerouslySetInnerHTML={{ __html: pjaxScript }} />
      </body>
    </html>
  )
}

function Header({ userEmail, palette: _p }: { userEmail?: string; palette: ColorPalette }) {
  return (
    <header class="header">
      <div class="container header-inner">
        <a href="/" class="logo">
          <span class="logo-img-wrap">
            <img
              src="/logo.png"
              alt="Radio Oceanía"
              width="1443"
              height="843"
            />
          </span>
          <div class="logo-text">
            <span class="logo-title">Radio Oceanía</span>
            <span class="logo-subtitle">93.7 FM · La de la Buena Música</span>
          </div>
        </a>
        <nav class="nav" x-data="{ open: false }">
          <button class="nav-toggle" x-on:click="open = !open" aria-label="Menú">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <ul class="nav-links" x-bind:class="{ 'nav-open': open }">
            <li><a href="/" class="nav-link">Inicio</a></li>
            <li><a href="/programacion" class="nav-link">Programación</a></li>
            <li><a href="/contacto" class="nav-link">Contacto</a></li>
            {userEmail && <li><a href="/radioadmin" class="nav-link nav-admin">Admin</a></li>}
          </ul>
        </nav>
        <div class="social-header">
          <a href="https://www.instagram.com/radio_oceania_talcahuano/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://radiooceania.cl/oficial/index.php/feed/rss/" target="_blank" rel="noopener" aria-label="RSS">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16M4 18a3 3 0 013 3" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer({ palette: _p }: { palette: ColorPalette }) {
  return (
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-col">
          <h4>Radio Oceanía</h4>
          <p>93.7 FM · Talcahuano, Chile</p>
          <p>La de la Buena Música</p>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <p>Pasaje Desiderio García 451, Talcahuano</p>
          <p>Tel: <a href="tel:0413215600">041-3215600</a></p>
          <p>Email: <a href="mailto:oceaniatalcahuano@gmail.com">oceaniatalcahuano@gmail.com</a></p>
        </div>
        <div class="footer-col">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/programacion">Programación</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div class="footer-col footer-social">
          <h4>Síguenos</h4>
          <div class="social-links">
            <a href="https://www.instagram.com/radio_oceania_talcahuano/" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
            <a href="https://radiooceania.cl/oficial/index.php/feed/rss/" target="_blank" rel="noopener" aria-label="RSS">RSS</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; {new Date().getFullYear()} Radio Oceanía. Todos los derechos reservados.</p>
          <p class="footer-dev">
            Desarrollado por <a href="https://apk.cl" target="_blank" rel="noopener">APK.CL</a> · Soluciones sin Fronteras · 2026
          </p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  const number = '56985302627'
  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent('🎧 Radio Oceanía 93.7 FM - La de la Buena Música\n🌐 https://radios.apk.cl')}`}
      target="_blank"
      rel="noopener"
      class="whatsapp-btn"
      aria-label="Chat por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
      <span>Escríbenos</span>
    </a>
  )
}

const pjaxScript = `
(function() {
  function navigate(url) {
    fetch(url)
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var doc = (new DOMParser()).parseFromString(html, 'text/html');
        var newMain = doc.querySelector('main');
        var curMain = document.querySelector('main');
        if (!newMain || !curMain) { location.href = url; return; }
        document.title = doc.title;
        curMain.innerHTML = newMain.innerHTML;
        Array.from(curMain.querySelectorAll('script')).forEach(function(old) {
          var s = document.createElement('script');
          s.textContent = old.textContent;
          document.head.appendChild(s);
          document.head.removeChild(s);
        });
        history.pushState(null, doc.title, url);
        window.scrollTo(0, 0);
      })
      .catch(function() { location.href = url; });
  }

  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
    try {
      var url = new URL(a.href, location.origin);
      if (url.origin !== location.origin) return;
      if (url.pathname.indexOf('/radioadmin') === 0) return;
      if (url.href === location.href) return;
      e.preventDefault();
      navigate(url.href);
    } catch(ex) {}
  });

  window.addEventListener('popstate', function() {
    navigate(location.href);
  });
})();
`

const oceanScrollScript = `
(function() {
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        document.documentElement.style.setProperty('--scroll-depth', pct.toFixed(3));
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
`

const css = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 16px; scroll-behavior: smooth; --scroll-depth: 0; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(
    to bottom,
    #FFFFFF 0%,
    #EBF5FB 6%,
    #AED6F1 18%,
    #5DADE2 34%,
    #2980B9 48%,
    #1A5276 62%,
    #0D2137 78%,
    #040D14 100%
  );
  background-attachment: local;
  color: #1A1A1A;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a { color: var(--color-secondary); text-decoration: none; transition: opacity 0.2s, color 0.2s; }
a:hover { opacity: 0.85; }
img { max-width: 100%; height: auto; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* ── Header ── */
.header {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  position: sticky; top: 0; z-index: 100;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.header-inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.75rem 1.5rem; gap: 1.5rem;
}
.logo {
  display: flex; align-items: center; gap: 0.75rem; color: #031B33;
}
.logo-img-wrap {
  display: flex;
  background: #fff; border-radius: 10px; padding: 4px 10px;
  height: 58px; flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.logo img { height: 50px; width: auto; display: block; }
.logo-text { display: flex; flex-direction: column; }
.logo-title { font-size: 1.15rem; font-weight: 700; letter-spacing: -0.5px; color: #031B33; }
.logo-subtitle { font-size: 0.68rem; opacity: 0.7; color: #031B33; }
.nav-links { display: flex; list-style: none; gap: 0.25rem; }
.nav-link {
  padding: 0.5rem 1rem; border-radius: 8px; color: #031B33;
  font-size: 0.85rem; font-weight: 500; transition: all 0.2s;
}
.nav-link:hover { background: rgba(0,0,0,0.05); color: var(--color-secondary); }
.nav-admin { background: var(--color-secondary); color: #fff !important; }
.nav-admin:hover { background: var(--color-secondary); opacity: 0.9; }
.nav-toggle { display: none; background: none; border: none; color: #031B33; cursor: pointer; padding: 4px; }
.social-header { display: flex; gap: 1rem; }
.social-header a { color: #031B33; opacity: 0.7; transition: all 0.2s; }
.social-header a:hover { opacity: 1; color: var(--color-secondary); }

.main { flex: 1; }

/* ── Footer ── */
.footer {
  background: #020A10;
  padding-top: 3.5rem; margin-top: 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  color: #F5F5F5;
}
.footer-inner {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem; padding-bottom: 2.5rem;
}
.footer-col h4 { font-size: 0.9rem; margin-bottom: 1rem; color: var(--color-secondary); font-weight: 600; letter-spacing: 0.3px; }
.footer-col p, .footer-col li { font-size: 0.82rem; opacity: 0.5; margin-bottom: 0.5rem; }
.footer-col ul { list-style: none; }
.footer-col a { color: rgba(245,245,245,0.6); }
.footer-col a:hover { color: var(--color-secondary); }
.social-links { display: flex; gap: 1.25rem; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.04); padding: 1.5rem 0;
  text-align: center; font-size: 0.75rem; opacity: 0.4;
}
.footer-dev {
  margin-top: 0.35rem; font-size: 0.7rem; opacity: 0.6;
  letter-spacing: 0.3px;
}
.footer-dev a { color: rgba(255,255,255,0.5); text-decoration: none; }
.footer-dev a:hover { color: var(--color-secondary); opacity: 1; }

/* ── WhatsApp Button ── */
.whatsapp-btn {
  position: fixed; bottom: 4.75rem; right: 2rem; z-index: 999;
  display: flex; align-items: center; gap: 0.75rem;
  background: #25D366; color: #fff !important;
  padding: 0.875rem 1.5rem; border-radius: 50px;
  font-weight: 600; font-size: 0.85rem;
  box-shadow: 0 4px 20px rgba(37,211,102,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.whatsapp-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(37,211,102,0.4); }

@media (max-width: 768px) {
  .nav-toggle { display: block; }
  .nav-links {
    display: none; position: absolute; top: 100%; left: 0; right: 0;
    background: rgba(255,255,255,0.98); backdrop-filter: blur(12px);
    flex-direction: column; padding: 1rem;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .nav-links.nav-open { display: flex; }
  .social-header { display: none; }
  .logo-img-wrap { height: 48px; padding: 3px 8px; }
  .logo img { height: 42px; }
  .logo-title { font-size: 1rem; }
  .logo-subtitle { display: none; }
  .whatsapp-btn { bottom: 4.75rem; right: 1.5rem; padding: 0.75rem; border-radius: 50%; width: 52px; height: 52px; justify-content: center; }
  .whatsapp-btn span { display: none; }
}
@media (max-width: 400px) {
  .logo-img-wrap { display: none; }
}

/* ── Sections & Cards ── */
.section { padding: 4rem 0; }
.section-title {
  font-size: 1.6rem; font-weight: 700; margin-bottom: 2rem;
  color: var(--color-secondary); position: relative; padding-bottom: 0.75rem;
  letter-spacing: -0.3px;
}
.section-title::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 48px; height: 3px; background: var(--color-secondary); border-radius: 2px;
}

.card {
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  padding: 1.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255,255,255,0.06);
}
.card:hover { 
  transform: translateY(-4px); 
  box-shadow: 0 12px 32px rgba(0,0,0,0.25); 
}

.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.75rem; border-radius: 8px; font-weight: 600;
  font-size: 0.85rem; cursor: pointer; border: none; transition: all 0.2s;
  font-family: inherit;
}
.btn-primary { background: var(--color-secondary); color: #fff; }
.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,102,204,0.3); }
.btn-outline {
  background: transparent; border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
}
.btn-outline:hover { background: var(--color-secondary); color: #fff; }

/* ── Forms (admin) ── */
.form-group { margin-bottom: 1.25rem; }
.form-label { display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.5rem; opacity: 0.8; }
.form-input, .form-textarea, .form-select {
  width: 100%; padding: 0.75rem 1rem; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05);
  color: #F5F5F5; font-size: 0.85rem; transition: border-color 0.2s;
  font-family: inherit;
}
.form-input:focus, .form-textarea:focus, .form-select:focus {
  outline: none; border-color: var(--color-secondary); box-shadow: 0 0 0 3px rgba(0,102,204,0.15);
}
.form-input::placeholder, .form-textarea::placeholder { color: rgba(245,245,245,0.25); }
.form-textarea { min-height: 120px; resize: vertical; }
.form-error { color: #ff6b6b; font-size: 0.8rem; margin-top: 0.25rem; }

/* ── Grid System ── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .section { padding: 2.5rem 0; }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .grid-3 { grid-template-columns: 1fr 1fr; }
  .grid-4 { grid-template-columns: 1fr 1fr; }
}

/* ── Utilities ── */
.text-center { text-align: center; }
.mt-1 { margin-top: 1rem; }
.mt-2 { margin-top: 2rem; }
.mb-1 { margin-bottom: 1rem; }
.mb-2 { margin-bottom: 2rem; }

/* ── Admin Styles ── */
.admin-card { display: block; text-decoration: none !important; color: #F5F5F5 !important; }
.admin-card-icon { margin-bottom: 0.75rem; color: var(--color-secondary); }
.stat { text-align: center; padding: 1rem; }
.stat-value { display: block; font-size: 2rem; font-weight: 700; color: var(--color-secondary); }
.stat-label { font-size: 0.8rem; opacity: 0.5; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #EBF5FB; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #AED6F1, #1A5276);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #5DADE2, #0D2137); }

/* ── Selection ── */
::selection { background: var(--color-secondary); color: #fff; }
`
