// SANTORAL: prop conservado, display desactivado hasta tener listado chileno correcto
export function DailyInfoSection({ saints: _saints }: { saints: string[] }) {
  return (
    <section class="section daily-section">
      <div class="container">
        <div class="daily-grid">

          {/* Fecha */}
          <div class="daily-card daily-card--date">
            <div class="daily-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p class="daily-label">Hoy es</p>
            <p class="daily-date" id="daily-date">&nbsp;</p>
            {/* SANTORAL DESACTIVADO - reactivar cuando se tenga listado chileno correcto
            <div class="daily-saints" id="daily-saints" style="display:none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="daily-saints-label">Celebran hoy:</span>
              <span class="daily-saints-names" id="daily-saints-names"></span>
            </div>
            */}
          </div>

          {/* Horas en Chile */}
          <div class="daily-card daily-card--clocks">
            <div class="daily-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p class="daily-label">Hora en Chile</p>
            <div class="clocks-list">
              <div class="clock-item">
                <span class="clock-region">Continental</span>
                <span class="clock-time" id="clock-santiago">--:--:--</span>
              </div>
              <div class="clock-divider"></div>
              <div class="clock-item">
                <span class="clock-region">Magallanes</span>
                <span class="clock-time" id="clock-magallanes">--:--:--</span>
              </div>
              <div class="clock-divider"></div>
              <div class="clock-item">
                <span class="clock-region">Insular</span>
                <span class="clock-time" id="clock-insular">--:--:--</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          function fmtTime(tz) {
            try {
              return new Intl.DateTimeFormat('es-CL', {
                timeZone: tz, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
              }).format(new Date());
            } catch(e) { return '--:--:--'; }
          }
          function fmtDate() {
            try {
              return new Intl.DateTimeFormat('es-CL', {
                timeZone: 'America/Santiago',
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
              }).format(new Date());
            } catch(e) { return ''; }
          }
          /* SANTORAL - reactivar con listado chileno correcto
          function initSaints(saints) {
            if (saints && saints.length > 0) {
              var el = document.getElementById('daily-saints');
              var names = document.getElementById('daily-saints-names');
              if (el && names) { names.textContent = saints.join(', '); el.style.display = 'flex'; }
            }
          }
          */
          function tick() {
            var d = document.getElementById('daily-date');
            var s = document.getElementById('clock-santiago');
            var m = document.getElementById('clock-magallanes');
            var i = document.getElementById('clock-insular');
            if (d) d.textContent = fmtDate();
            if (s) s.textContent = fmtTime('America/Santiago');
            if (m) m.textContent = fmtTime('America/Punta_Arenas');
            if (i) i.textContent = fmtTime('Pacific/Easter');
          }
          tick();
          setInterval(tick, 1000);
        })();
      `}} />

      <style>{dailyStyles}</style>
    </section>
  )
}

const dailyStyles = `
.daily-section {
  background: linear-gradient(160deg, #0a1628 0%, #0d2137 60%, #0a1628 100%);
  color: #F5F5F5;
  padding: 2.5rem 0;
}
.daily-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.daily-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
.daily-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  border-radius: 16px 16px 0 0;
}
.daily-card--date::before { background: linear-gradient(90deg, #FFB800, #FF8C00); }
.daily-card--clocks::before { background: linear-gradient(90deg, #0066CC, #00AAFF); }

.daily-card-icon {
  color: rgba(255,255,255,0.35);
  margin-bottom: 0.75rem;
}
.daily-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.45;
  margin-bottom: 0.5rem;
}
.daily-date {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
  color: #FFB800;
  text-transform: capitalize;
}
.daily-saints {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  background: rgba(255,184,0,0.07);
  border: 1px solid rgba(255,184,0,0.15);
  border-radius: 10px;
  padding: 0.6rem 0.85rem;
  font-size: 0.82rem;
  flex-wrap: wrap;
  color: rgba(255,255,255,0.75);
}
.daily-saints svg { margin-top: 2px; flex-shrink: 0; color: #FFB800; }
.daily-saints-label { font-weight: 600; color: #FFB800; }
.daily-saints-names { opacity: 0.85; }

.clocks-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.clock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 0;
}
.clock-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
}
.clock-region {
  font-size: 0.82rem;
  font-weight: 600;
  opacity: 0.6;
  letter-spacing: 0.3px;
}
.clock-time {
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #00AAFF;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}

@media (max-width: 768px) {
  .daily-grid { grid-template-columns: 1fr; }
  .daily-date { font-size: 1.15rem; }
  .clock-time { font-size: 1.3rem; }
  .daily-card { padding: 1.5rem; }
}
`
