export function StreamPlayer({ streamUrl }: { streamUrl: string }) {
  return (
    <section class="stream-section">
      <div class="container">
        <div class="stream-card" id="stream-card">
          <div class="stream-visual">
            <div class="stream-eq" id="stream-eq">
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
            </div>
          </div>
          <div class="stream-info">
            <div class="stream-status" id="stream-status">
              <span class="stream-dot" id="stream-dot" />
              <span id="stream-status-text">SINTONIZA</span>
            </div>
            <h2 class="stream-title">Radio Oceanía <span class="stream-freq">93.7 FM</span></h2>
            <p class="stream-slogan">La de la Buena Música</p>
          </div>
          <div class="stream-controls">
            <button
              class="stream-play-btn"
              id="play-btn"
              aria-label="Reproducir / Pausar"
            >
              <svg id="play-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <svg id="pause-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="display:none">
                <rect x="5" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="3" width="5" height="18" rx="1" />
              </svg>
              <svg id="loading-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
                <circle cx="12" cy="12" r="10" stroke-dasharray="50" stroke-dashoffset="20">
                  <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite" />
                </circle>
              </svg>
            </button>
            <div class="stream-volume">
              <button class="volume-btn" id="mute-btn" aria-label="Silenciar">
                <svg id="vol-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 010 7.07" />
                  <path d="M19.07 4.93a10 10 0 010 14.14" />
                </svg>
                <svg id="vol-mute-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:none">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              </button>
              <input type="range" min="0" max="1" step="0.05" value="0.7" id="volume-slider" class="volume-slider" />
            </div>
          </div>
          <script dangerouslySetInnerHTML={{ __html: `
            (function() {
              // Este player refleja el estado del audio global manejado por radio-bar
              var playBtn     = document.getElementById('play-btn');
              var playIcon    = document.getElementById('play-icon');
              var pauseIcon   = document.getElementById('pause-icon');
              var loadingIcon = document.getElementById('loading-icon');
              var dot         = document.getElementById('stream-dot');
              var statusText  = document.getElementById('stream-status-text');
              var volSlider   = document.getElementById('volume-slider');
              var muteBtn     = document.getElementById('mute-btn');
              var volIcon     = document.getElementById('vol-icon');
              var volMuteIcon = document.getElementById('vol-mute-icon');
              var eqBars      = document.querySelectorAll('.eq-bar');

              function showIcon(icon) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'none';
                loadingIcon.style.display = 'none';
                icon.style.display = 'block';
              }
              function setEq(active) {
                eqBars.forEach(function(b) { b.classList[active ? 'add' : 'remove']('eq-active'); });
              }

              // Sincronizar con el estado del audio global (gestionado por radio-bar)
              function syncFromGlobal() {
                var a = window.__radioAudio;
                if (!a) return;
                if (!a.paused && !a.ended) {
                  showIcon(pauseIcon);
                  dot.classList.add('stream-dot--live');
                  statusText.textContent = 'EN VIVO';
                  setEq(true);
                  volSlider.value = String(a.volume);
                } else {
                  showIcon(playIcon);
                  dot.classList.remove('stream-dot--live');
                  statusText.textContent = 'SINTONIZA';
                  setEq(false);
                }
              }

              // Esperar a que radio-bar inicialice el audio global
              var syncInterval = setInterval(function() {
                if (window.__radioAudio) { syncFromGlobal(); clearInterval(syncInterval); }
              }, 200);

              // Escuchar eventos del audio global via eventos personalizados
              document.addEventListener('radio:playing', function() {
                showIcon(pauseIcon);
                dot.classList.add('stream-dot--live');
                statusText.textContent = 'EN VIVO';
                setEq(true);
                if (window.__radioAudio) volSlider.value = String(window.__radioAudio.volume);
              });
              document.addEventListener('radio:paused', function() {
                showIcon(playIcon);
                dot.classList.remove('stream-dot--live');
                statusText.textContent = 'SINTONIZA';
                setEq(false);
              });
              document.addEventListener('radio:loading', function() {
                showIcon(loadingIcon);
                statusText.textContent = 'CARGANDO...';
              });

              // El botón de este player delega al botón de la barra
              playBtn.addEventListener('click', function() {
                var rbarBtn = document.getElementById('rbar-play-btn');
                if (rbarBtn) rbarBtn.click();
              });

              volSlider.addEventListener('input', function(e) {
                var vol = parseFloat(e.target.value);
                if (window.__radioAudio) window.__radioAudio.volume = vol;
                var rbarSlider = document.getElementById('rbar-vol-slider');
                if (rbarSlider) rbarSlider.value = String(vol);
                var isMuted = vol === 0;
                volIcon.style.display = isMuted ? 'none' : 'block';
                volMuteIcon.style.display = isMuted ? 'block' : 'none';
              });

              muteBtn.addEventListener('click', function() {
                var rbarMute = document.getElementById('rbar-mute-btn');
                if (rbarMute) rbarMute.click();
              });
            })();
          ` }} />
        </div>
      </div>
      <style>{streamStyles}</style>
    </section>
  )
}

const streamStyles = `
.stream-section {
  padding: 3rem 0;
  background: linear-gradient(135deg, #FFFFFF 0%, #D4E6F1 100%);
  position: relative;
  overflow: hidden;
}
.stream-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(0,102,204,0.04) 0%, transparent 60%);
  pointer-events: none;
}
.stream-card {
  display: flex; align-items: center; justify-content: space-between;
  gap: 2rem; flex-wrap: wrap; position: relative; z-index: 1;
}
.stream-visual {
  display: flex; align-items: flex-end; gap: 4px;
  height: 48px; padding: 0 8px;
}
.eq-bar {
  display: inline-block;
  width: 6px;
  height: 8px;
  background: var(--color-secondary);
  border-radius: 3px 3px 0 0;
  opacity: 0.3;
  transition: height 0.2s ease;
}
.eq-bar.eq-active {
  opacity: 1;
  animation: eqBounce 0.8s ease-in-out infinite alternate;
}
.eq-bar.eq-active:nth-child(1) { animation-delay: 0s; }
.eq-bar.eq-active:nth-child(2) { animation-delay: 0.15s; }
.eq-bar.eq-active:nth-child(3) { animation-delay: 0.3s; }
.eq-bar.eq-active:nth-child(4) { animation-delay: 0.1s; }
.eq-bar.eq-active:nth-child(5) { animation-delay: 0.25s; }

@keyframes eqBounce {
  0% { height: 8px; }
  100% { height: 40px; }
}

.stream-info { flex: 1; }
.stream-status {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.8rem; font-weight: 600; letter-spacing: 2px;
  margin-bottom: 0.75rem; color: #031B33;
}
.stream-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: rgba(3,27,51,0.2);
  transition: background 0.3s;
}
.stream-dot--live { background: #28a745; box-shadow: 0 0 12px rgba(40,167,69,0.6); animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 12px rgba(40,167,69,0.6); }
  50% { opacity: 0.5; box-shadow: 0 0 4px rgba(40,167,69,0.2); }
}
.stream-title { font-size: 2rem; font-weight: 800; line-height: 1.2; color: #031B33; letter-spacing: -0.5px; }
.stream-freq { color: var(--color-secondary); }
.stream-slogan { font-size: 1.1rem; opacity: 0.7; margin-top: 0.25rem; color: #031B33; }
.stream-controls { display: flex; align-items: center; gap: 1.5rem; }
.stream-play-btn {
  width: 72px; height: 72px; border-radius: 50%; border: 3px solid var(--color-secondary);
  background: rgba(0,102,204,0.15); color: var(--color-secondary);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}
.stream-play-btn:hover {
  background: var(--color-secondary); color: #fff;
  transform: scale(1.08);
  box-shadow: 0 0 24px rgba(0,102,204,0.4);
}
.stream-play-btn:active { transform: scale(0.95); }
.stream-volume { display: flex; align-items: center; gap: 0.5rem; }
.volume-btn {
  background: none; border: none; color: #031B33; cursor: pointer;
  padding: 4px; opacity: 0.6; transition: opacity 0.2s;
}
.volume-btn:hover { opacity: 1; }
.volume-slider {
  width: 90px; height: 4px;
  accent-color: var(--color-secondary);
  cursor: pointer;
}

@media (max-width: 768px) {
  .stream-section { padding: 2rem 0; }
  .stream-card { flex-direction: column; text-align: center; }
  .stream-visual { justify-content: center; }
  .stream-status { justify-content: center; }
  .stream-title { font-size: 1.5rem; }
  .stream-controls { justify-content: center; }
}
`

