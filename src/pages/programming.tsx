import { Layout } from '../layouts/base'
import type { PageData, ProgrammingItem } from '../types'

export function ProgrammingPage(data: PageData) {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  return (
    <Layout palette={data.palette}>
      <section class="section">
        <div class="container">
          <h2 class="section-title">Programación</h2>
          <p style="opacity:0.55; margin-bottom:2.5rem; font-size:0.95rem">
            Descubre nuestra parrilla programática. ¡Acompáñanos!
          </p>

          {data.programming.length === 0 ? (
            <div class="grid-3">
              {days.map(day => (
                <DaySchedule day={day} items={[]} />
              ))}
            </div>
          ) : (
            <div class="grid-3">
              {days.map(day => (
                <DaySchedule
                  day={day}
                  items={data.programming.filter(p => p.day === day)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="container text-center">
          <h2 class="section-title" style="text-align:center">Programas Destacados</h2>
          <div class="grid-3 mt-2">
            {programas.map(p => (
              <div class="card programa-card" key={p.nombre}>
                <div class="programa-icon">{p.icon}</div>
                <h3 style="font-size:1rem; margin-bottom:0.5rem">{p.nombre}</h3>
                <p style="opacity:0.5; font-size:0.85rem; line-height:1.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{progStyles}</style>
      </section>
    </Layout>
  )
}

function DaySchedule({ day, items }: { day: string; items: ProgrammingItem[] }) {
  return (
    <div class="card day-card">
      <h3 class="day-title">{day}</h3>
      {items.length === 0 ? (
        <p style="opacity:0.3; font-size:0.82rem">Sin programación registrada</p>
      ) : (
        <ul style="list-style:none">
          {items
            .sort((a, b) => a.time_start.localeCompare(b.time_start))
            .map(item => (
              <li class="schedule-item">
                <div style="display:flex; justify-content:space-between; align-items:baseline">
                  <strong style="font-size:0.88rem; color:#F5F5F5">{item.show_name}</strong>
                  <span class="schedule-time">
                    {item.time_start}{item.time_end ? ` - ${item.time_end}` : ''}
                  </span>
                </div>
                {item.description && (
                  <p style="font-size:0.78rem; opacity:0.45; margin-top:0.2rem">{item.description}</p>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

const programas = [
  { nombre: 'El Reloj Musical', desc: 'Los mejores clásicos de todos los tiempos.', icon: '🎵' },
  { nombre: 'Informativo', desc: 'Noticias y actualidad de Talcahuano y la región.', icon: '📰' },
  { nombre: 'Bloque Femenino', desc: 'Espacio dedicado a la mujer y su entorno.', icon: '💜' },
  { nombre: 'Tren De Los Recuerdos', desc: 'Un viaje musical por los grandes éxitos del ayer.', icon: '🚂' },
  { nombre: 'Informe En Línea', desc: 'Análisis y reportajes de actualidad.', icon: '📋' },
  { nombre: 'Los Favoritos De Siempre', desc: 'Las canciones más pedidas por la audiencia.', icon: '⭐' },
]

const progStyles = `
.day-card {
  padding: 1.5rem !important;
}
.day-title {
  color: var(--color-secondary);
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.schedule-item {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.schedule-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
.schedule-time {
  font-size: 0.72rem;
  opacity: 0.45;
  white-space: nowrap;
  background: rgba(0,102,204,0.1);
  color: var(--color-secondary);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}
.programa-card {
  text-align: center;
  padding: 2rem 1.5rem !important;
}
.programa-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
`
