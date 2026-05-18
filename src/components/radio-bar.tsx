const STREAM_URL = 'https://archi-us.digitalproserver.com/oceania-fm.aac'

export function RadioBar() {
  return (
    <div class="radio-bar" id="radio-bar">
      <div class="rbar-eq" id="rbar-eq">
        <span class="rbar-eqbar"></span>
        <span class="rbar-eqbar"></span>
        <span class="rbar-eqbar"></span>
        <span class="rbar-eqbar"></span>
        <span class="rbar-eqbar"></span>
      </div>

      <div class="rbar-info">
        <span class="rbar-dot" id="rbar-dot"></span>
        <div class="rbar-text">
          <span class="rbar-name">Radio Oceanía <strong>93.7 FM</strong></span>
          <span class="rbar-status" id="rbar-status">SINTONIZA</span>
        </div>
      </div>

      <div class="rbar-controls">
        <button class="rbar-play-btn" id="rbar-play-btn" aria-label="Reproducir / Pausar">
          <svg id="rbar-play-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
          <svg id="rbar-pause-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="display:none">
            <rect x="5" y="3" width="5" height="18" rx="1" />
            <rect x="14" y="3" width="5" height="18" rx="1" />
          </svg>
          <svg id="rbar-load-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <circle cx="12" cy="12" r="10" stroke-dasharray="50" stroke-dashoffset="20">
              <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </button>

        <div class="rbar-volume-wrap">
          <button class="rbar-mute-btn" id="rbar-mute-btn" aria-label="Silenciar">
            <svg id="rbar-vol-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
            </svg>
            <svg id="rbar-vol-mute-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="display:none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          </button>
          <input type="range" min="0" max="1" step="0.05" value="0.7" id="rbar-vol-slider" class="rbar-vol-slider" />
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  if (window.__radioBarInit) return;
  window.__radioBarInit = true;

  var audio = null;
  var isPlaying = false;
  var isMuted = false;
  var savedVol = 0.7;
  var streamUrl = '${STREAM_URL}';
  var autoplayDismissed = false;

  var g = function(id) { return document.getElementById(id); };
  var playBtn    = g('rbar-play-btn');
  var playIcon   = g('rbar-play-icon');
  var pauseIcon  = g('rbar-pause-icon');
  var loadIcon   = g('rbar-load-icon');
  var dot        = g('rbar-dot');
  var statusEl   = g('rbar-status');
  var volSlider  = g('rbar-vol-slider');
  var muteBtn    = g('rbar-mute-btn');
  var volIcon    = g('rbar-vol-icon');
  var volMuteIcon= g('rbar-vol-mute-icon');
  var eqBars     = document.querySelectorAll('.rbar-eqbar');
  var banner     = g('autoplay-banner');

  function setIcon(el) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'none';
    loadIcon.style.display = 'none';
    el.style.display = 'block';
  }

  function setEq(active) {
    eqBars.forEach(function(b) { b.classList[active ? 'add' : 'remove']('rbar-eqbar--on'); });
  }

  function hideBanner() {
    if (banner && !autoplayDismissed) {
      autoplayDismissed = true;
      banner.style.opacity = '0';
      banner.style.pointerEvents = 'none';
      setTimeout(function() { banner.style.display = 'none'; }, 400);
    }
  }

  function initAudio() {
    if (audio) { audio.pause(); audio.removeAttribute('src'); audio.load(); }
    audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'none';
    audio.volume = savedVol;

    window.__radioAudio = audio;

    audio.addEventListener('playing', function() {
      isPlaying = true; setIcon(pauseIcon);
      dot.classList.add('rbar-dot--live');
      statusEl.textContent = 'EN VIVO'; setEq(true);
      hideBanner();
      document.dispatchEvent(new Event('radio:playing'));
    });
    audio.addEventListener('waiting', function() {
      setIcon(loadIcon); statusEl.textContent = 'CARGANDO...';
      document.dispatchEvent(new Event('radio:loading'));
    });
    audio.addEventListener('pause', function() {
      isPlaying = false; setIcon(playIcon);
      dot.classList.remove('rbar-dot--live');
      statusEl.textContent = 'SINTONIZA'; setEq(false);
      document.dispatchEvent(new Event('radio:paused'));
    });
    audio.addEventListener('error', function() {
      isPlaying = false; setIcon(playIcon);
      dot.classList.remove('rbar-dot--live');
      setEq(false); statusEl.textContent = 'NO DISPONIBLE';
      document.dispatchEvent(new Event('radio:paused'));
      setTimeout(function() { if (!isPlaying) statusEl.textContent = 'SINTONIZA'; }, 5000);
    });
    return audio;
  }

  function startStream(muted) {
    setIcon(loadIcon); statusEl.textContent = 'CONECTANDO...';
    audio = initAudio();
    if (muted) audio.muted = true;
    audio.src = streamUrl + '?_t=' + Date.now();
    return audio.play();
  }

  // Intento de autoplay al cargar la página
  window.addEventListener('DOMContentLoaded', function() {
    // Truco: iniciar muteado (siempre permitido) y desmutear de inmediato
    startStream(true).then(function() {
      audio.muted = false;
      hideBanner();
    }).catch(function() {
      // iOS Safari y casos extremos — mostrar banner y esperar primer toque
      setIcon(playIcon);
      statusEl.textContent = 'SINTONIZA';
      if (banner) {
        banner.style.display = 'flex';
        setTimeout(function() { banner.style.opacity = '1'; }, 50);
      }
      function onFirstInteraction() {
        if (isPlaying) return;
        document.removeEventListener('click', onFirstInteraction);
        document.removeEventListener('touchend', onFirstInteraction);
        startStream(false).catch(function() {
          setIcon(playIcon);
          statusEl.textContent = 'SINTONIZA';
        });
      }
      document.addEventListener('click', onFirstInteraction);
      document.addEventListener('touchend', onFirstInteraction);
    });
  });

  playBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (isPlaying && audio) {
      audio.pause(); audio.removeAttribute('src'); audio.load();
      isPlaying = false;
    } else {
      startStream(false).catch(function() { setIcon(playIcon); statusEl.textContent = 'SINTONIZA'; });
    }
  });

  volSlider.addEventListener('input', function(e) {
    savedVol = parseFloat(e.target.value);
    if (audio) audio.volume = savedVol;
    isMuted = savedVol === 0;
    volIcon.style.display = isMuted ? 'none' : 'block';
    volMuteIcon.style.display = isMuted ? 'block' : 'none';
  });

  muteBtn.addEventListener('click', function() {
    isMuted = !isMuted;
    if (isMuted) {
      savedVol = audio ? audio.volume : parseFloat(volSlider.value);
      if (audio) audio.volume = 0;
      volSlider.value = '0';
      volIcon.style.display = 'none'; volMuteIcon.style.display = 'block';
    } else {
      if (audio) audio.volume = savedVol || 0.7;
      volSlider.value = String(savedVol || 0.7);
      volIcon.style.display = 'block'; volMuteIcon.style.display = 'none';
    }
  });
})();
      `}} />

      <style>{radioBarStyles}</style>

      {/* Banner autoplay — visible solo si el navegador bloquea autoplay */}
      <div id="autoplay-banner" style="display:none;opacity:0;transition:opacity 0.4s ease;">
        <style>{`
          #autoplay-banner {
            position: fixed;
            inset: 0;
            bottom: 60px;
            top: auto;
            z-index: 999;
            background: linear-gradient(135deg, rgba(0,102,204,0.97) 0%, rgba(0,30,80,0.97) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
            padding: 1rem 2rem;
            cursor: pointer;
            border-top: 1px solid rgba(255,255,255,0.15);
            animation: none;
          }
          #autoplay-banner:hover { background: linear-gradient(135deg, rgba(0,122,224,0.99) 0%, rgba(0,40,100,0.99) 100%); }
          .abanner-icon {
            width: 52px; height: 52px;
            border-radius: 50%;
            background: rgba(255,255,255,0.15);
            border: 2px solid rgba(255,255,255,0.5);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          .abanner-text { color: #fff; }
          .abanner-text strong { display: block; font-size: 1.1rem; font-weight: 700; }
          .abanner-text span { font-size: 0.82rem; opacity: 0.75; }
        `}</style>
        <div class="abanner-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="none">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </div>
        <div class="abanner-text">
          <strong>Toca para escuchar Radio Oceanía</strong>
          <span>93.7 FM · En vivo ahora</span>
        </div>
      </div>
    </div>
  )
}

const radioBarStyles = `
.radio-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 1000;
  height: 60px;
  background: rgba(4,13,20,0.97);
  backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.4);
}

/* EQ animation */
.rbar-eq {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 28px;
  flex-shrink: 0;
}
.rbar-eqbar {
  display: block;
  width: 4px;
  height: 6px;
  background: #0066CC;
  border-radius: 2px 2px 0 0;
  opacity: 0.35;
}
.rbar-eqbar--on {
  opacity: 1;
  animation: rbarBounce 0.7s ease-in-out infinite alternate;
}
.rbar-eqbar--on:nth-child(1) { animation-delay: 0s; }
.rbar-eqbar--on:nth-child(2) { animation-delay: 0.12s; }
.rbar-eqbar--on:nth-child(3) { animation-delay: 0.24s; }
.rbar-eqbar--on:nth-child(4) { animation-delay: 0.08s; }
.rbar-eqbar--on:nth-child(5) { animation-delay: 0.18s; }
@keyframes rbarBounce {
  0%   { height: 5px; }
  100% { height: 24px; }
}

/* Station info */
.rbar-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}
.rbar-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  flex-shrink: 0;
  transition: background 0.3s;
}
.rbar-dot--live {
  background: #28a745;
  box-shadow: 0 0 8px rgba(40,167,69,0.7);
  animation: rbarPulse 1.5s ease-in-out infinite;
}
@keyframes rbarPulse {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
.rbar-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.rbar-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #F5F5F5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rbar-name strong { color: #00AAFF; }
.rbar-status {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}

/* Controls */
.rbar-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}
.rbar-play-btn {
  width: 42px; height: 42px;
  border-radius: 50%;
  border: 2px solid #0066CC;
  background: rgba(0,102,204,0.2);
  color: #00AAFF;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.rbar-play-btn:hover {
  background: #0066CC;
  color: #fff;
  transform: scale(1.08);
  box-shadow: 0 0 16px rgba(0,102,204,0.5);
}
.rbar-play-btn:active { transform: scale(0.95); }

.rbar-volume-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.rbar-mute-btn {
  background: none; border: none;
  color: rgba(255,255,255,0.55);
  cursor: pointer; padding: 4px;
  display: flex; align-items: center;
  transition: color 0.2s;
}
.rbar-mute-btn:hover { color: #fff; }
.rbar-vol-slider {
  width: 80px; height: 3px;
  accent-color: #0066CC;
  cursor: pointer;
}

@media (max-width: 600px) {
  .rbar-eq { display: none; }
  .rbar-vol-slider { width: 60px; }
  .radio-bar { gap: 0.75rem; padding: 0 1rem; }
}
@media (max-width: 400px) {
  .rbar-vol-slider { display: none; }
  .rbar-name { font-size: 0.75rem; }
}
`
