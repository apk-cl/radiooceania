import { getEfemerides } from '../lib/efemerides'

function getMonthDay(now: Date): string {
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  const d = String(now.getUTCDate()).padStart(2, '0')
  return `${m}-${d}`
}

export function EfemeridesSection() {
  // Use Santiago time offset: Chile continental is UTC-4 (winter) / UTC-3 (summer)
  // We approximate using Intl if available, otherwise UTC
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Santiago',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const month = parts.find(p => p.type === 'month')?.value ?? String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = parts.find(p => p.type === 'day')?.value ?? String(now.getUTCDate()).padStart(2, '0')
  const key = `${month}-${day}`

  const items = getEfemerides(key)

  return (
    <section class="section efemerides-section">
      <div class="container">
        <div class="efem-header">
          <div class="efem-title-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h2 class="section-title efem-title">Efemérides del Día</h2>
          </div>
          <span class="efem-date-badge">{formatFullDate(now)}</span>
        </div>

        {items.length === 0 ? (
          <p class="efem-empty">No hay efemérides registradas para hoy.</p>
        ) : (
          <div class="efem-grid">
            {items.map((item, i) => (
              <div class={`efem-card efem-card--${i === 0 ? 'main' : 'sub'}`}>
                <span class="efem-year">{item.year}</span>
                <div class="efem-card-content">
                  <p class="efem-text">{item.text}</p>
                  <span class="efem-expand-hint">Toca para saber más</span>
                  <a
                    class="efem-wiki-link"
                    href={`https://es.wikipedia.org/w/index.php?search=${encodeURIComponent(item.year + ' ' + item.text)}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Ver en Wikipedia
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{efemStyles}</style>
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  function initEfem() {
    document.querySelectorAll('.efem-card').forEach(function(card) {
      card.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        card.classList.toggle('efem-card--open');
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEfem);
  } else {
    initEfem();
  }
})();
      `}} />
    </section>
  )
}

function formatFullDate(now: Date): string {
  return now.toLocaleDateString('es-CL', {
    timeZone: 'America/Santiago',
    day: 'numeric',
    month: 'long',
  })
}

const efemStyles = `
.efemerides-section {
  background: linear-gradient(160deg, #1a2a3a 0%, #0d1b2a 100%);
  color: #F5F5F5;
  padding: 3rem 0;
}
.efem-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}
.efem-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #00AAFF;
}
.efem-title {
  margin-bottom: 0;
  color: #00AAFF;
}
.efem-title::after { background: #0066CC; }
.efem-date-badge {
  background: rgba(0,102,204,0.15);
  border: 1px solid rgba(0,170,255,0.3);
  color: #00AAFF;
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.efem-empty {
  opacity: 0.5;
  font-style: italic;
}
.efem-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.25rem;
}
.efem-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: background 0.2s, transform 0.2s;
}
.efem-card:hover {
  background: rgba(0,102,204,0.1);
  border-color: rgba(0,170,255,0.25);
  transform: translateY(-2px);
}
.efem-card--main {
  grid-column: 1 / -1;
  background: rgba(0,102,204,0.08);
  border-color: rgba(0,170,255,0.2);
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
}
.efem-year {
  font-size: 1.65rem;
  font-weight: 800;
  color: #00AAFF;
  letter-spacing: -1px;
  line-height: 1;
  flex-shrink: 0;
}
.efem-card--main .efem-year {
  font-size: 2.5rem;
}
.efem-text {
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.88;
  margin: 0;
}
.efem-card--main .efem-text {
  font-size: 1.1rem;
  align-self: center;
}
/* Expand efemérides */
.efem-card {
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.efem-card-content { display: flex; flex-direction: column; }
.efem-expand-hint {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.22);
  margin-top: 0.5rem;
  letter-spacing: 0.3px;
}
.efem-card--open .efem-expand-hint { display: none; }
.efem-wiki-link {
  display: none;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  color: #00AAFF;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  background: rgba(0,102,204,0.18);
  border: 1px solid rgba(0,170,255,0.25);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  width: fit-content;
  transition: all 0.2s;
  font-family: inherit;
}
.efem-wiki-link:hover {
  background: rgba(0,102,204,0.35);
  border-color: rgba(0,170,255,0.5);
  color: #FFFFFF;
}
.efem-card--open .efem-wiki-link { display: inline-flex; }
.efem-card--open {
  background: rgba(0,102,204,0.12);
  border-color: rgba(0,170,255,0.3);
}

@media (max-width: 768px) {
  .efem-grid { grid-template-columns: 1fr; }
  .efem-card--main { flex-direction: column; gap: 0.5rem; }
  .efem-card--main .efem-year { font-size: 1.8rem; }
  .efem-card--main .efem-text { font-size: 1rem; }
  .efem-header { flex-direction: column; align-items: flex-start; }
}
`
