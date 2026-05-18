import { Layout } from '../layouts/base'
import type { PageData } from '../types'
import type { ColorPalette } from '../lib/colors'

export function AdminColors(data: PageData, palette: ColorPalette) {
  return (
    <Layout palette={data.palette} userEmail={data.userEmail}>
      <section class="section">
        <div class="container">
          <a href="/radioadmin" style="opacity:0.6; font-size:0.85rem">&larr; Volver al panel</a>
          <h2 class="section-title" style="margin-top:1rem">Editor de Colores</h2>
          <p style="opacity:0.7; margin-bottom:2rem">
            Los cambios se aplican inmediatamente al guardar.
          </p>

          <div class="grid-2">
            <div class="card">
              <h3>Paleta Actual</h3>
              <div class="palette-preview mt-1">
                {Object.entries(palette).map(([key, value]) => (
                  <div class="palette-item" key={key}>
                    <div class="palette-swatch" style={`background:${value}`} />
                    <div>
                      <strong style="font-size:0.85rem; text-transform:capitalize">{key}</strong>
                      <span style="font-size:0.8rem; opacity:0.6; font-family:monospace">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div class="card">
                <h3>Cambiar Colores</h3>
                <form action="/radioadmin/colors" method="post" style="margin-top:1rem">
                  <div class="form-group">
                    <label class="form-label" for="primary">Color Primario</label>
                    <div style="display:flex; gap:0.5rem">
                      <input class="form-input" type="color" id="primary" name="primary"
                        value={palette.primary} style="width:48px; height:48px; padding:4px" />
                      <input class="form-input" type="text" name="primary" value={palette.primary}
                        pattern="^#[0-9A-Fa-f]{6}$" style="font-family:monospace" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="secondary">Color Secundario</label>
                    <div style="display:flex; gap:0.5rem">
                      <input class="form-input" type="color" id="secondary" name="secondary"
                        value={palette.secondary} style="width:48px; height:48px; padding:4px" />
                      <input class="form-input" type="text" name="secondary" value={palette.secondary}
                        pattern="^#[0-9A-Fa-f]{6}$" style="font-family:monospace" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="accent">Color de Acento</label>
                    <div style="display:flex; gap:0.5rem">
                      <input class="form-input" type="color" id="accent" name="accent"
                        value={palette.accent} style="width:48px; height:48px; padding:4px" />
                      <input class="form-input" type="text" name="accent" value={palette.accent}
                        pattern="^#[0-9A-Fa-f]{6}$" style="font-family:monospace" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="bg">Color de Fondo</label>
                    <div style="display:flex; gap:0.5rem">
                      <input class="form-input" type="color" id="bg" name="bg"
                        value={palette.bg} style="width:48px; height:48px; padding:4px" />
                      <input class="form-input" type="text" name="bg" value={palette.bg}
                        pattern="^#[0-9A-Fa-f]{6}$" style="font-family:monospace" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="text">Color de Texto</label>
                    <div style="display:flex; gap:0.5rem">
                      <input class="form-input" type="color" id="text" name="text"
                        value={palette.text} style="width:48px; height:48px; padding:4px" />
                      <input class="form-input" type="text" name="text" value={palette.text}
                        pattern="^#[0-9A-Fa-f]{6}$" style="font-family:monospace" />
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Guardar Colores</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
