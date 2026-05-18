import { Layout } from '../layouts/base'
import type { PageData, ProgrammingItem } from '../types'

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Recuerdo']

export function AdminProgramming(data: PageData) {
  const recuerdoItems = data.programming.filter(p => p.day === 'Recuerdo')
  const regularItems = data.programming.filter(p => p.day !== 'Recuerdo')

  return (
    <Layout palette={data.palette} userEmail={data.userEmail}>
      <section class="section">
        <div class="container">
          <a href="/radioadmin" style="opacity:0.6; font-size:0.85rem">&larr; Volver al panel</a>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem">
            <h2 class="section-title" style="margin-bottom:0">Programación</h2>
            <a href="/radioadmin/programacion/nuevo" class="btn btn-primary">+ Nuevo Programa</a>
          </div>

          {recuerdoItems.length > 0 && (
            <>
              <h3 style="color:var(--color-secondary); margin-top:2rem; margin-bottom:1rem">
                🎵 Música del Recuerdo — Parrilla por Décadas
              </h3>
              <div class="card mb-2">
                {recuerdoItems
                  .sort((a, b) => a.time_start.localeCompare(b.time_start))
                  .map(item => (
                    <div style="display:flex; justify-content:space-between; align-items:center;
                      padding:0.75rem 0; border-bottom:1px solid rgba(255,255,255,0.05)">
                      <div style="display:flex; align-items:center; gap:0.75rem">
                        <span style="font-size:0.9rem; font-weight:700; color:var(--color-secondary); min-width:60px">
                          {item.show_name}
                        </span>
                        <span style="font-size:0.8rem; opacity:0.6">
                          {item.time_start}{item.time_end ? ` - ${item.time_end}` : ''}
                        </span>
                        <span style="font-size:0.8rem; opacity:0.5">{item.description}</span>
                      </div>
                      <form action={`/radioadmin/programacion/${item.id}/delete`} method="post"
                        onsubmit="return confirm('¿Eliminar este programa?')">
                        <button type="submit" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:0.8rem">X</button>
                      </form>
                    </div>
                  ))}
              </div>
            </>
          )}

          <h3 style="color:var(--color-secondary); margin-top:2rem; margin-bottom:1rem">
            Programación Semanal
          </h3>
          <div class="grid-3">
            {DAYS.filter(d => d !== 'Recuerdo').map(day => (
              <div class="card" key={day}>
                <h3 style="color:var(--color-secondary); margin-bottom:0.75rem">{day}</h3>
                {regularItems.filter(p => p.day === day).length === 0 ? (
                  <p style="opacity:0.4; font-size:0.85rem">Sin programas</p>
                ) : (
                  <ul style="list-style:none">
                    {regularItems
                      .filter(p => p.day === day)
                      .sort((a, b) => a.time_start.localeCompare(b.time_start))
                      .map(item => (
                        <li style="margin-bottom:0.5rem; padding-bottom:0.5rem;
                          border-bottom:1px solid rgba(255,255,255,0.05);
                          display:flex; justify-content:space-between; align-items:center">
                          <div>
                            <strong style="font-size:0.85rem">{item.show_name}</strong>
                            <span style="font-size:0.75rem; opacity:0.5; display:block">
                              {item.time_start}{item.time_end ? ` - ${item.time_end}` : ''}
                            </span>
                          </div>
                          <form action={`/radioadmin/programacion/${item.id}/delete`} method="post"
                            onsubmit="return confirm('¿Eliminar este programa?')">
                            <button type="submit" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:0.8rem">X</button>
                          </form>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export function AdminProgrammingForm(data: PageData, item?: ProgrammingItem) {
  const isEdit = !!item

  return (
    <Layout palette={data.palette} userEmail={data.userEmail}>
      <section class="section">
        <div class="container">
          <a href="/radioadmin/programacion" style="opacity:0.6; font-size:0.85rem">&larr; Volver a programación</a>
          <h2 class="section-title" style="margin-top:1rem">
            {isEdit ? 'Editar Programa' : 'Nuevo Programa'}
          </h2>

          <div class="card mt-2" style="max-width:500px">
            <form action={isEdit ? `/radioadmin/programacion/${item!.id}` : '/radioadmin/programacion'} method="post" style="margin-top:0.5rem">
              <div class="form-group">
                <label class="form-label" for="day">Día / Sección</label>
                <select class="form-select" id="day" name="day" required>
                  {DAYS.map(d => (
                    <option value={d} selected={item?.day === d}>{d}</option>
                  ))}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="show_name">
                  {item?.day === 'Recuerdo' ? 'Década' : 'Nombre del Programa'}
                </label>
                <input class="form-input" type="text" id="show_name" name="show_name"
                  value={item?.show_name || ''} required
                  placeholder={item?.day === 'Recuerdo' ? '60\'s, 70\'s, 80\'s, 90\'s...' : ''} />
              </div>
              <div class="grid-2" style="gap:1rem">
                <div class="form-group">
                  <label class="form-label" for="time_start">Hora Inicio</label>
                  <input class="form-input" type="time" id="time_start" name="time_start"
                    value={item?.time_start || ''} required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="time_end">Hora Fin</label>
                  <input class="form-input" type="time" id="time_end" name="time_end"
                    value={item?.time_end || ''} />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="description">Descripción</label>
                <textarea class="form-textarea" id="description" name="description"
                  style="min-height:80px"
                  placeholder={item?.day === 'Recuerdo' ? 'Describe los hits de esta década...' : ''}>{item?.description || ''}</textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                {isEdit ? 'Guardar Cambios' : 'Crear Programa'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}
