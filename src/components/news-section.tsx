import type { NewsItem } from '../types'

export function NewsSection({ news }: { news: NewsItem[] }) {
  if (!news.length) {
    return (
      <section class="section news-section">
        <div class="container">
          <h2 class="section-title">Noticias de la Radio</h2>
          <p style="opacity:0.6">Próximamente noticias y novedades.</p>
        </div>
      </section>
    )
  }

  const trending = news.filter(n => n.is_trending)
  const latest = news.slice(0, 6)

  return (
    <section class="section news-section">
      <div class="container">
        <h2 class="section-title">Noticias de la Radio</h2>

        {trending.length > 0 && (
          <div class="grid-2 mb-2">
            {trending.slice(0, 2).map(item => (
              <TrendingCard item={item} />
            ))}
          </div>
        )}

        {latest.length > 0 && (
          <div class="grid-3">
            {latest.map(item => (
              <NewsCard item={item} />
            ))}
          </div>
        )}
      </div>
      <style>{newsStyles}</style>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          var els = document.querySelectorAll('.local-news-card, .local-trending-card');
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

function TrendingCard({ item }: { item: NewsItem }) {
  return (
    <article class="card local-trending-card">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} class="local-trending-img" loading="lazy" />
      ) : (
        <div class="local-news-placeholder">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
      <div class="local-trending-body">
        <span class="local-trending-badge">Tendencia</span>
        <h3>{item.title}</h3>
        <p class="excerpt">{item.excerpt}</p>
        <div class="full-content" style="display: none;" dangerouslySetInnerHTML={{ __html: item.content }}></div>
        <time>{new Date(item.created_at).toLocaleDateString('es-CL', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}</time>
      </div>
    </article>
  )
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article class="card local-news-card">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} class="local-news-img" loading="lazy" />
      ) : (
        <div class="local-news-placeholder local-news-placeholder--small">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
      <div class="local-news-body">
        <h3>{item.title}</h3>
        <p class="excerpt">{item.excerpt}</p>
        <div class="full-content" style="display: none;" dangerouslySetInnerHTML={{ __html: item.content }}></div>
        <time>{new Date(item.created_at).toLocaleDateString('es-CL', {
          day: 'numeric', month: 'short'
        })}</time>
      </div>
    </article>
  )
}

const newsStyles = `
.news-section {
  background: linear-gradient(180deg, #2980B9 0%, #154360 100%);
  color: #FFFFFF;
}
.local-trending-card, .local-news-card {
  background: rgba(0,0,0,0.2) !important;
  border-radius: 12px;
  padding: 0 !important;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1) !important;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  color: #FFFFFF;
}
.local-trending-card.expanded .excerpt, .local-news-card.expanded .excerpt { display: none; }
.local-trending-card.expanded .full-content, .local-news-card.expanded .full-content {
  display: block;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.85);
  margin-bottom: 0.75rem;
  line-height: 1.5;
}
.local-trending-img, .local-news-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.local-trending-card:hover .local-trending-img,
.local-news-card:hover .local-news-img {
  transform: scale(1.05);
}
.local-trending-card:hover, .local-news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  background: rgba(0,0,0,0.3) !important;
}
.local-news-placeholder {
  width: 100%; height: 200px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, rgba(0,102,204,0.05) 0%, rgba(0,0,0,0.08) 100%);
}
.local-news-placeholder--small { height: 160px; }
.local-trending-body, .local-news-body {
  padding: 1.25rem;
}
.local-trending-badge {
  display: inline-block;
  background: var(--color-secondary);
  color: #fff;
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}
.local-trending-body h3, .local-news-body h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.35;
  color: #F5F5F5;
}
.local-trending-body p, .local-news-body p {
  font-size: 0.85rem;
  opacity: 0.55;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.local-trending-body time, .local-news-body time {
  font-size: 0.72rem;
  opacity: 0.35;
}
`
