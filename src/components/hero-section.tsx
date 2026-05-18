export function HeroSection() {
  return (
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content container">
        <div class="hero-logo-wrap" id="hero-logo-wrap" role="button" tabindex={0} aria-label="Ver logo ampliado">
          <img
            src="/logo.png"
            alt="Radio Oceanía 93.7 FM"
            class="hero-logo"
            width="600"
            height="350"
          />
        </div>
        <div class="hero-text">
          <div class="hero-freq">93.7 FM · Talcahuano</div>
          <h1 class="hero-title">Radio Oceanía</h1>
          <p class="hero-slogan">La de la Buena Música</p>
          <p class="hero-desc">
            Transmitiendo desde Talcahuano para el Gran Concepción y el Mundo.<br />
            Música variada, actualidad y programas de interés desde 1979.
          </p>
        </div>
      </div>
      <div class="hero-wave">
        {/* Cada SVG tiene 200% de ancho con el patrón repetido → translateX(-50%) crea un loop perfecto */}
        <div class="wave-track wave-track--1">
          <svg viewBox="0 0 2880 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,45 C360,85 1080,5 1440,45 C1800,85 2520,5 2880,45 L2880,90 L0,90 Z" fill="rgba(0,170,255,0.10)"/>
          </svg>
        </div>
        <div class="wave-track wave-track--2">
          <svg viewBox="0 0 2880 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,55 C480,15 960,85 1440,55 C1920,15 2400,85 2880,55 L2880,90 L0,90 Z" fill="rgba(255,255,255,0.06)"/>
          </svg>
        </div>
        <div class="wave-track wave-track--3">
          <svg viewBox="0 0 2880 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,38 C320,72 1120,8 1440,38 C1760,72 2560,8 2880,38 L2880,90 L0,90 Z" fill="rgba(0,102,204,0.08)"/>
          </svg>
        </div>
      </div>

      {/* Logo lightbox modal */}
      <div class="logo-modal" id="logo-modal" role="dialog" aria-modal="true" aria-label="Logo Radio Oceanía" aria-hidden="true">
        <div class="logo-modal-overlay" id="logo-modal-overlay"></div>
        <div class="logo-modal-box">
          <img src="/logo.png" alt="Radio Oceanía 93.7 FM" class="logo-modal-img" />
          <button class="logo-modal-close" id="logo-modal-close" aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var wrap    = document.getElementById('hero-logo-wrap');
  var modal   = document.getElementById('logo-modal');
  var overlay = document.getElementById('logo-modal-overlay');
  var closeBtn= document.getElementById('logo-modal-close');
  if (!wrap || !modal) return;

  function open() {
    modal.classList.add('logo-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('logo-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  wrap.addEventListener('click', open);
  wrap.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
})();
      `}} />

      <style>{heroStyles}</style>
    </section>
  )
}

const heroStyles = `
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #020d1a 0%, #0a1f38 40%, #0d2e54 70%, #082040 100%);
  overflow: hidden;
  padding: 3.5rem 0 2rem;
  color: #F5F5F5;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,102,204,0.18) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 10% 80%, rgba(0,170,255,0.10) 0%, transparent 60%);
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 3rem;
  justify-content: center;
}
.hero-logo-wrap {
  flex-shrink: 0;
  background: #fff;
  border-radius: 16px;
  padding: 12px 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08);
  cursor: zoom-in;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}
.hero-logo-wrap:hover {
  transform: scale(1.04);
  box-shadow: 0 28px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(0,170,255,0.4);
}
.hero-logo-wrap:focus-visible {
  box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 3px #00AAFF;
}
.hero-logo {
  height: 140px;
  width: auto;
  display: block;
}
.hero-text { max-width: 520px; }
.hero-freq {
  display: inline-block;
  background: rgba(0,102,204,0.25);
  border: 1px solid rgba(0,170,255,0.3);
  color: #00AAFF;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -1.5px;
  color: #fff;
  margin-bottom: 0.4rem;
}
.hero-slogan {
  font-size: 1.3rem;
  font-weight: 600;
  color: #00AAFF;
  margin-bottom: 1rem;
  letter-spacing: 0.3px;
}
.hero-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.6;
}
.hero-wave {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 90px;
  overflow: hidden;
  pointer-events: none;
}
.wave-track {
  position: absolute;
  bottom: 0;
  width: 200%;
  height: 100%;
  will-change: transform;
}
.wave-track svg { width: 100%; height: 100%; display: block; }

.wave-track--1 { animation: waveMove 14s linear infinite; }
.wave-track--2 { animation: waveMove  9s linear infinite reverse; }
.wave-track--3 { animation: waveMove 20s linear infinite; }

@keyframes waveMove {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── Logo lightbox ── */
.logo-modal {
  position: fixed; inset: 0; z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s ease;
}
.logo-modal--open {
  opacity: 1; pointer-events: all;
}
.logo-modal-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(10px);
}
.logo-modal-box {
  position: relative; z-index: 1;
  background: #fff;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.6);
  transform: scale(0.78);
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
  max-width: 90vw;
}
.logo-modal--open .logo-modal-box {
  transform: scale(1);
}
.logo-modal-img {
  display: block;
  max-width: min(580px, 80vw);
  max-height: 70vh;
  width: auto; height: auto;
}
.logo-modal-close {
  position: absolute; top: 0.6rem; right: 0.6rem;
  width: 34px; height: 34px; border-radius: 50%;
  border: none; background: rgba(0,0,0,0.08);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #333;
  transition: background 0.2s, transform 0.2s;
}
.logo-modal-close:hover { background: rgba(0,0,0,0.18); transform: scale(1.1); }

@media (max-width: 768px) {
  .hero-content { flex-direction: column; gap: 1.75rem; text-align: center; }
  .hero-logo { height: 100px; }
  .hero-logo-wrap { padding: 10px 16px; }
  .hero-title { font-size: 2.4rem; }
  .hero-slogan { font-size: 1.05rem; }
  .hero-desc { font-size: 0.88rem; }
  .hero-section { padding: 2.5rem 0 1.5rem; }
}
@media (max-width: 480px) {
  .hero-title { font-size: 1.9rem; }
  .hero-logo { height: 80px; }
}
`
