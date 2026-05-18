import { Layout } from '../layouts/base'
import type { PageData } from '../types'

export function AdminDashboard(data: PageData) {
  return (
    <Layout palette={data.palette} userEmail={data.userEmail}>
      <section class="section">
        <div class="container">
          <h2 class="section-title">Panel de Administración</h2>
          <p style="opacity:0.7; margin-bottom:2rem">
            Bienvenido, {data.userEmail || 'admin'}
          </p>

          <div class="grid-3">
            <a href="/radioadmin/colors" class="card admin-card">
              <div class="admin-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm5.5 11c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-4c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zM5 11.5c0-.83.67-1.5 1.5-1.5S8 10.67 8 11.5 7.33 13 6.5 13 5 12.33 5 11.5zm6-4c0 .83-.67 1.5-1.5 1.5S8 8.33 8 7.5 8.67 6 9.5 6s1.5.67 1.5 1.5z"/>
                </svg>
              </div>
              <h3>Colores</h3>
              <p style="opacity:0.6; font-size:0.85rem">Personaliza la paleta de colores del sitio</p>
            </a>

            <a href="/radioadmin/news" class="card admin-card">
              <div class="admin-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5zm2-4h10v2H7v-2zm0-4h10v2H7v-2zm0-4h10v2H7V7z"/>
                </svg>
              </div>
              <h3>Noticias</h3>
              <p style="opacity:0.6; font-size:0.85rem">Administra las noticias y tendencias</p>
            </a>

            <a href="/radioadmin/programacion" class="card admin-card">
              <div class="admin-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <h3>Programación</h3>
              <p style="opacity:0.6; font-size:0.85rem">Gestiona la parrilla de programación</p>
            </a>
          </div>

          <div class="card mt-2">
            <h3>🎵 Música del Recuerdo</h3>
            <p style="opacity:0.6; font-size:0.85rem; margin-bottom:0.75rem">
              Configura la parrilla de programación por décadas (60's, 70's, 80's, 90's)
            </p>
            <a href="/radioadmin/programacion/nuevo" class="btn btn-primary" style="font-size:0.85rem">
              + Agregar Década a la Parrilla
            </a>
          </div>

          <div class="card mt-2" style="border:1px solid rgba(40,167,69,0.2)">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
              <div>
                <h3>Noticias Tendencia (RSS)</h3>
                <p style="opacity:0.6; font-size:0.82rem; margin-top:0.3rem">
                  {data.trendingNews.length} noticias en la base de datos · Cron cada hora (0 * * * *)
                </p>
              </div>
              <form method="post" action="/radioadmin/refresh-news">
                <button type="submit" class="btn btn-primary" style="font-size:0.82rem;background:#28a745;border:none">
                  ↻ Actualizar ahora
                </button>
              </form>
            </div>
          </div>

          <div class="card mt-2">
            <h3>Resumen</h3>
            <div class="grid-3 mt-1">
              <div class="stat">
                <span class="stat-value">{data.news.length}</span>
                <span class="stat-label">Noticias</span>
              </div>
              <div class="stat">
                <span class="stat-value">{data.programming.length}</span>
                <span class="stat-label">Programas</span>
              </div>
              <div class="stat">
                <span class="stat-value">{data.weather ? 'OK' : '--'}</span>
                <span class="stat-label">Clima</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
