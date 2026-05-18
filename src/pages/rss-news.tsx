import { Layout } from '../layouts/base'
import type { TrendingNews } from '../lib/trending-news'
import type { ColorPalette } from '../lib/colors'

const SOURCE_ORDER = [
  { name: 'BBC Mundo',         type: 'Internacional'  },
  { name: 'El País',           type: 'Internacional'  },
  { name: 'La Tercera',        type: 'Nacional Chile' },
  { name: 'El Ciudadano',      type: 'Nacional Chile' },
  { name: 'El Sur',            type: 'Regional'       },
  { name: 'Diario Concepción', type: 'Regional'       },
  { name: 'FayerWayer',        type: 'Tecnología'     },
  { name: 'Xataka',            type: 'Tecnología'     },
]

const CAT_COLOR: Record<string, string> = {
  'Internacional':  '#00AAFF',
  'Nacional Chile': '#0066CC',
  'Regional':       '#004F99',
  'Tecnología':     '#0088DD',
}

const CATEGORIES = ['Internacional', 'Nacional Chile', 'Regional', 'Tecnología']

export function RssNewsPage({ news, palette }: { news: TrendingNews[]; palette: ColorPalette }) {
  // Group by source (max 2 per source)
  const bySource: Record<string, TrendingNews[]> = {}
  for (const item of news) {
    if (!bySource[item.source]) bySource[item.source] = []
    if (bySource[item.source].length < 2) bySource[item.source].push(item)
  }

  // Ordered by category
  const byCategory: Record<string, { source: string; items: TrendingNews[] }[]> = {}
  for (const cat of CATEGORIES) byCategory[cat] = []
  for (const { name, type } of SOURCE_ORDER) {
    byCategory[type].push({ source: name, items: bySource[name] || [] })
  }

  const totalNews = Object.values(bySource).reduce((s, a) => s + a.length, 0)

  return (
    <Layout palette={palette}>
      <div class="rss-page">
        <div class="container">

          {/* Encabezado */}
          <div class="rss-hero">
            <div class="rss-hero-badge">
              <span class="rss-pulse"></span>
              Actualizado cada hora
            </div>
            <h1 class="rss-title">Noticias de Radio Oceanía</h1>
            <p class="rss-subtitle">
              {totalNews} noticias de {SOURCE_ORDER.length} fuentes internacionales, nacionales y regionales
            </p>
          </div>

          {/* Tabla de fuentes */}
          <div class="sources-wrap">
            <h2 class="sources-heading">Fuentes de información</h2>
            <div class="sources-table-box">
              <table class="sources-table">
                <thead>
                  <tr>
                    <th>Fuente</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {SOURCE_ORDER.map(({ name, type }) => (
                    <tr>
                      <td>{name}</td>
                      <td>
                        <span class="src-badge" style={`background:${CAT_COLOR[type]}22;color:${CAT_COLOR[type]};border:1px solid ${CAT_COLOR[type]}44`}>
                          {type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Secciones por categoría */}
          {CATEGORIES.map(cat => (
            <section class="cat-section">
              <div class="cat-header" style={`border-left:4px solid ${CAT_COLOR[cat]}`}>
                <h2 class="cat-title" style={`color:${CAT_COLOR[cat]}`}>{cat}</h2>
              </div>

              {byCategory[cat].map(({ source, items }) => (
                <div class="source-block">
                  <h3 class="source-label">{source}</h3>
                  {items.length === 0 ? (
                    <p class="no-items">Sin noticias disponibles en este momento</p>
                  ) : (
                    <div class={`news-row news-row-${items.length}`}>
                      {items.map(item => (
                        <article class="news-card">
                          {item.image_url && (
                            <div class="nc-img">
                              <img src={item.image_url} alt={item.title} loading="lazy" />
                            </div>
                          )}
                          <div class="nc-body">
                            <span class="nc-cat">{item.category}</span>
                            <h4 class="nc-title">{item.title}</h4>
                            <p class="nc-excerpt">{item.excerpt}</p>
                            <div class="nc-meta">
                              <span class="nc-source">{source}</span>
                              <span class="nc-date">{formatDate(item.published_at)}</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          ))}

          <div class="rss-footer-note">
            <p>Las noticias son obtenidas automáticamente de fuentes externas cada hora.</p>
            <a href="/" class="btn btn-outline" style="margin-top:1rem">← Volver al inicio</a>
          </div>

        </div>
      </div>
      <style>{styles}</style>
    </Layout>
  )
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffHours < 1) return 'Hace momentos'
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays === 1) return 'Ayer'
    if (diffDays < 7) return `Hace ${diffDays} días`
    return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
  } catch { return '' }
}

const styles = `
.rss-page {
  padding: 3rem 0 4rem;
  min-height: 60vh;
  color: #F5F5F5;
  background: linear-gradient(180deg, #08305e 0%, #051e3e 40%, #040D14 100%);
}

/* Hero */
.rss-hero {
  text-align: center;
  margin-bottom: 3rem;
}
.rss-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(40,167,69,0.12);
  border: 1px solid rgba(40,167,69,0.3);
  color: #28a745;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.rss-pulse {
  width: 8px; height: 8px;
  background: #28a745;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.rss-title {
  font-size: 2.4rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}
.rss-subtitle {
  color: rgba(255,255,255,0.5);
  font-size: 0.95rem;
}

/* Tabla de fuentes */
.sources-wrap {
  margin-bottom: 3rem;
}
.sources-heading {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
}
.sources-table-box {
  background: rgba(0,102,204,0.08);
  border: 1px solid rgba(0,170,255,0.15);
  border-radius: 12px;
  overflow: hidden;
}
.sources-table {
  width: 100%;
  border-collapse: collapse;
}
.sources-table th {
  background: rgba(0,102,204,0.3);
  color: rgba(255,255,255,0.85);
  padding: 0.65rem 1.25rem;
  text-align: left;
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.sources-table td {
  padding: 0.6rem 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.75);
  font-size: 0.875rem;
}
.src-badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
}

/* Sección por categoría */
.cat-section {
  margin-bottom: 3.5rem;
}
.cat-header {
  padding-left: 1rem;
  margin-bottom: 1.75rem;
}
.cat-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.3px;
}

/* Bloque por fuente */
.source-block {
  margin-bottom: 2rem;
}
.source-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.no-items {
  color: rgba(255,255,255,0.25);
  font-size: 0.85rem;
  font-style: italic;
}

/* Grid de noticias */
.news-row {
  display: grid;
  gap: 1.25rem;
}
.news-row-1 { grid-template-columns: 1fr; max-width: 600px; }
.news-row-2 { grid-template-columns: 1fr 1fr; }

/* Card */
.news-card {
  background: rgba(0,102,204,0.1);
  border: 1px solid rgba(0,170,255,0.12);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s ease;
}
.news-card:hover {
  background: rgba(0,102,204,0.2);
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(0,0,0,0.4);
  border-color: rgba(0,170,255,0.3);
}
.nc-img {
  height: 180px;
  overflow: hidden;
  background: rgba(0,0,0,0.2);
}
.nc-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.news-card:hover .nc-img img { transform: scale(1.04); }
.nc-body { padding: 1.25rem; }
.nc-cat {
  display: inline-block;
  background: rgba(0,102,204,0.2);
  color: #00AAFF;
  padding: 0.18rem 0.6rem;
  border-radius: 10px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.6rem;
}
.nc-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.nc-excerpt {
  font-size: 0.83rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.55;
  margin-bottom: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.nc-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 0.6rem;
}
.nc-source { font-weight: 600; }

/* Pie */
.rss-footer-note {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.3);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .news-row-2 { grid-template-columns: 1fr; }
  .rss-title { font-size: 1.75rem; }
  .sources-table td, .sources-table th { padding: 0.55rem 0.75rem; }
}
`
