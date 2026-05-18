import type { ProgrammingItem } from '../types'

const DECADES = [
  { 
    label: '60\'s', 
    years: '1960 - 1969', 
    color: '#E8491D',
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  { 
    label: '70\'s', 
    years: '1970 - 1979', 
    color: '#F5A623',
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
      </svg>
    )
  },
  { 
    label: '80\'s', 
    years: '1980 - 1989', 
    color: '#7B2FBE',
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3M8 22h8" />
      </svg>
    )
  },
  { 
    label: '90\'s', 
    years: '1990 - 1999', 
    color: '#2D9CDB',
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    )
  },
]

const DEFAULT_SCHEDULE = [
  { decade: '60\'s', time_start: '06:00', time_end: '10:00', desc: 'Los clásicos que marcaron una generación' },
  { decade: '70\'s', time_start: '10:00', time_end: '14:00', desc: 'La década del rock, disco y baladas' },
  { decade: '80\'s', time_start: '14:00', time_end: '18:00', desc: 'El pop, el synth y los grandes himnos' },
  { decade: '90\'s', time_start: '18:00', time_end: '22:00', desc: 'Lo mejor del rock alternativo y pop' },
  { decade: 'Clásicos', time_start: '22:00', time_end: '06:00', desc: 'Lo mejor de todas las décadas' },
]

export function MusicaRecuerdo({ programming }: { programming: ProgrammingItem[] }) {
  const schedule = programming.length > 0
    ? programming.filter(p => p.day === 'Recuerdo').map(p => ({
        decade: p.show_name,
        time_start: p.time_start,
        time_end: p.time_end,
        desc: p.description,
      }))
    : DEFAULT_SCHEDULE

  return (
    <section class="section recuerdo-section">
      <div class="container">
        <div class="recuerdo-header">
          <h2 class="section-title">Música del Recuerdo</h2>
          <p class="recuerdo-subtitle">Un viaje musical por las décadas doradas</p>
        </div>

        <div class="recuerdo-decades">
          {DECADES.map(d => (
            <div
              class="recuerdo-card"
              key={d.label}
              style={`--decade-color: ${d.color}`}
              x-data="{ expanded: false }"
            >
              <div class="recuerdo-card-front">
                <span class="recuerdo-icon">{d.icon()}</span>
                <h3 class="recuerdo-decade-label">{d.label}</h3>
                <span class="recuerdo-years">{d.years}</span>
              </div>
            </div>
          ))}
        </div>

        <div class="recuerdo-timeline">
          <h3 class="recuerdo-timeline-title">Parrilla de Programación</h3>
          <div class="timeline">
            {schedule.map((s, i) => {
              const decade = DECADES.find(d => d.label === s.decade)
              const color = decade?.color || '#C9A84C'
              const decadeIcon = decade?.icon ? decade.icon() : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
              return (
                <div class="timeline-item" key={i}>
                  <div class="timeline-dot" style={`background: ${color}`} />
                  <div class="timeline-content">
                    <div class="timeline-time">
                      <span class="timeline-badge" style={`background: ${color}`}>
                        {decadeIcon} {s.decade}
                      </span>
                      <span class="timeline-hours">{s.time_start} - {s.time_end}</span>
                    </div>
                    <p class="timeline-desc">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <style>{recuerdoStyles}</style>
    </section>
  )
}

const recuerdoStyles = `
.recuerdo-section {
  background: linear-gradient(180deg, #D4E6F1 0%, #7FB3D5 100%);
  position: relative;
  overflow: hidden;
  color: #031B33;
}
.recuerdo-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.03) 0%, transparent 60%);
  pointer-events: none;
}
.recuerdo-header { margin-bottom: 2rem; }
.recuerdo-subtitle { opacity: 0.6; font-size: 1rem; margin-top: 0.25rem; }
.recuerdo-decades {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;
}
.recuerdo-card {
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.8);
  border-radius: 16px;
  padding: 1.75rem 1rem;
  text-align: center;
  cursor: default;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.recuerdo-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--decade-color);
  opacity: 0.6;
  transition: opacity 0.3s, height 0.3s;
}
.recuerdo-card:hover {
  background: rgba(255,255,255,0.7);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.3);
}
.recuerdo-card:hover::before { opacity: 1; height: 4px; }
.recuerdo-icon { display: block; margin-bottom: 0.5rem; }
.recuerdo-icon svg { width: 40px; height: 40px; }
.recuerdo-decade-label {
  font-size: 1.5rem; font-weight: 800;
  color: var(--decade-color);
  letter-spacing: -1px;
}
.recuerdo-years { font-size: 0.8rem; opacity: 0.5; }

.recuerdo-timeline { max-width: 700px; margin: 0 auto; }
.recuerdo-timeline-title {
  font-size: 1.15rem; font-weight: 600; margin-bottom: 1.5rem;
  text-align: center; color: #031B33;
}
.timeline { position: relative; padding-left: 1.5rem; }
.timeline::before {
  content: '';
  position: absolute; left: 7px; top: 8px; bottom: 8px;
  width: 2px; background: rgba(3,27,51,0.1);
}
.timeline-item {
  position: relative; padding-bottom: 1.25rem;
  display: flex; align-items: flex-start; gap: 1rem;
}
.timeline-item:last-child { padding-bottom: 0; }
.timeline-dot {
  position: absolute; left: -1.5rem; top: 6px;
  width: 16px; height: 16px; border-radius: 50%;
  border: 3px solid #D4E6F1;
  z-index: 1;
}
.timeline-content { flex: 1; }
.timeline-time {
  display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem; flex-wrap: wrap;
}
.timeline-badge {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.2rem 0.65rem; border-radius: 20px;
  font-size: 0.75rem; font-weight: 700; color: #fff;
}
.timeline-hours { font-size: 0.8rem; font-weight: 600; opacity: 0.6; }
.timeline-desc { font-size: 0.85rem; opacity: 0.65; }

@media (max-width: 768px) {
  .recuerdo-decades { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .recuerdo-icon svg { width: 32px; height: 32px; }
  .recuerdo-decade-label { font-size: 1.25rem; }
}
@media (max-width: 480px) {
  .recuerdo-decades { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}
`
