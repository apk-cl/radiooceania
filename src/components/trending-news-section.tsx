import type { TrendingNews } from '../lib/trending-news'

export function TrendingNewsSection({ news }: { news: TrendingNews[] }) {
  if (!news || news.length === 0) {
    return (
      <section class="section">
        <div class="container">
          <h2 class="section-title">Noticias Oceania</h2>
          <p style="opacity:0.6">No hay noticias disponibles.</p>
        </div>
      </section>
    )
  }

  return (
    <section class="section trending-section">
      <div class="container">
        <div class="trending-header">
          <h2 class="section-title">Noticias Oceania</h2>
          <span class="trending-live-badge">
            <span class="trending-pulse"></span>
            Actualizado
          </span>
        </div>

        {/* Banner principal */}
        <div class="trending-banner">
          <div class="banner-image-wrap">
            {news[0].image_url ? (
              <img
                src={news[0].image_url}
                alt={news[0].title}
                class="banner-image"
                width="600"
                height="400"
                loading="lazy"
              />
            ) : (
              <div class="banner-image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
            <div class="banner-overlay"></div>
          </div>
          <div class="banner-text">
            <span class="banner-category">{news[0].category}</span>
            <h3 class="banner-title">{news[0].title}</h3>
            <p class="banner-excerpt">{news[0].excerpt}</p>
            <div class="banner-full-content" style="display: none;" dangerouslySetInnerHTML={{ __html: news[0].content }}></div>
            <div class="banner-meta">
              <span class="banner-source">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
                {news[0].source}
              </span>
              <span class="banner-date">{formatRelativeDate(news[0].published_at)}</span>
            </div>
          </div>
        </div>

        {/* Grid de noticias adicionales */}
        {news.length > 1 && (
          <div class="trending-grid mt-2">
            {news.slice(1, 5).map((item) => (
              <article class="trending-card">
                <div class="trending-card-img-wrap">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      class="trending-card-image"
                      width="300"
                      height="200"
                      loading="lazy"
                    />
                  ) : (
                    <div class="trending-card-placeholder">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>
                <div class="trending-card-body">
                  <span class="trending-category">{item.category}</span>
                  <h4 class="trending-card-title">{item.title}</h4>
                  <p class="trending-card-excerpt">{item.excerpt}</p>
                  <div class="trending-card-full-content" style="display: none;" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                  <div class="trending-card-meta">
                    <span class="trending-source">{item.source}</span>
                    <span class="trending-date">{formatRelativeDate(item.published_at)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <style>{trendingStyles}</style>
      <script dangerouslySetInnerHTML={{
        __html: `
        document.addEventListener('DOMContentLoaded', function() {
          var els = document.querySelectorAll('.trending-banner, .trending-card');
          els.forEach(function(el) {
            el.addEventListener('click', function() {
              this.classList.toggle('expanded');
            });
          });
        });
      ` }} />
    </section>
  )
}

function formatRelativeDate(dateStr: string): string {
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
  } catch {
    return ''
  }
}

const trendingStyles = `
.trending-section {
  background: linear-gradient(180deg, #7FB3D5 0%, #2980B9 100%);
  color: #031B33;
}
.trending-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.trending-live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(40,167,69,0.12);
  border: 1px solid rgba(40,167,69,0.3);
  color: #28a745;
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.trending-pulse {
  width: 8px; height: 8px;
  background: #28a745;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.trending-banner {
  position: relative;
  background: rgba(255,255,255,0.8);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  min-height: 400px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  color: #031B33;
}
.trending-banner::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.95) 100%);
  pointer-events: none;
}
.banner-image-wrap {
  position: relative;
  overflow: hidden;
  min-width: 40%;
}
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.trending-banner:hover .banner-image {
  transform: scale(1.03);
}
.banner-image-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: #e2e8f0;
}
.banner-text {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.banner-category {
  display: inline-block;
  background: var(--color-secondary);
  color: #fff;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  width: fit-content;
  text-transform: uppercase;
}
.banner-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1rem;
  color: #031B33;
  letter-spacing: -0.5px;
}
.banner-excerpt {
  font-size: 1.1rem;
  color: #334e68;
  line-height: 1.6;
  margin-bottom: 1rem;
}
.banner-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #627d98;
}
.banner-source {
  display: flex; align-items: center; gap: 0.4rem;
  font-weight: 500;
}
.banner-date { opacity: 0.6; }

.trending-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-top: 2rem;
}
.trending-card {
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  color: #031B33;
}
.trending-banner.expanded .banner-excerpt { display: none; }
.trending-banner.expanded .banner-full-content {
  display: block !important;
  font-size: 0.95rem;
  color: #334e68;
  margin-bottom: 1rem;
  line-height: 1.6;
}
.trending-card.expanded .trending-card-excerpt { display: none; }
.trending-card.expanded .trending-card-full-content {
  display: block !important;
  font-size: 0.85rem;
  color: #486581;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}
.trending-card:hover {
  transform: translateY(-4px);
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  border-color: rgba(255,255,255,0.8);
}
.trending-card-img-wrap {
  position: relative;
  overflow: hidden;
  height: 160px;
}
.trending-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.trending-card:hover .trending-card-image {
  transform: scale(1.05);
}
.trending-card-body {
  padding: 1.25rem;
}
.trending-category {
  display: inline-block;
  background: rgba(0,102,204,0.1);
  color: var(--color-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.trending-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  color: #031B33;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.trending-card-excerpt {
  font-size: 0.9rem;
  color: #486581;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.trending-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #9fb3c8;
}

@media (max-width: 1024px) {
  .trending-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .trending-banner { flex-direction: column; min-height: auto; }
  .trending-banner::after {
    background: linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.95) 100%);
  }
  .banner-image-wrap { width: 100%; height: 250px; }
  .banner-text { padding: 2rem 1.5rem; }
  .banner-title { font-size: 1.75rem; }
  .trending-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .trending-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
`
