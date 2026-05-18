import { Hono } from 'hono'
import type { Env, NewsItem, ProgrammingItem, ContactMessage, PageData } from './types'
import { getPalette, setPalette, DEFAULT_PALETTE } from './lib/colors'
import { getWeather } from './lib/weather'
import { getTrendingNews, getAllTrendingNews, fetchAndStoreTrendingNews } from './lib/trending-news'
import { getSantoralForDate } from './lib/santoral-fetch'
import { HomePage } from './pages/home'
import { ProgrammingPage } from './pages/programming'
import { ContactPage } from './pages/contact'
import { RssNewsPage } from './pages/rss-news'
import { AdminDashboard } from './admin/dashboard'
import { AdminColors } from './admin/colors'
import { AdminNews, AdminNewsForm } from './admin/news-editor'
import { AdminProgramming, AdminProgrammingForm } from './admin/programming-editor'

const app = new Hono<{ Bindings: Env }>()

app.get('/stream', async (c) => {
  const streamUrl = c.env.STREAM_URL || 'http://sonando-us.digitalproserver.com:80/oceania-fm.aac'
  try {
    const response = await fetch(streamUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StreamPlayer/1.0)',
        'Icy-MetaData': '1',
        'Connection': 'keep-alive',
      },
      // @ts-ignore
      cf: {
        cacheEverything: false,
      },
    })
    if (!response.ok) {
      return c.text('Stream unavailable', 503)
    }
    // Stream the response with proper headers
    const headers = new Headers()
    headers.set('Content-Type', 'audio/aac')
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Cache-Control', 'no-cache')
    headers.set('Connection', 'keep-alive')
    
    // Handle ICY metadata if present
    const icyHeaders = ['icy-br', 'icy-genre', 'icy-name', 'icy-description', 'icy-url']
    for (const h of icyHeaders) {
      const val = response.headers.get(h)
      if (val) headers.set(h, val)
    }
    
    return new Response(response.body, {
      status: 200,
      headers: headers,
    })
  } catch (e) {
    console.error('Stream proxy error:', e)
    return c.text('Stream unavailable', 503)
  }
})

function getUserEmail(c: any): string | undefined {
  return c.req.header('Cf-Access-Authenticated-User-Email')
}

function requireAdmin(c: any): string | undefined {
  const email = getUserEmail(c)
  if (!email) {
    c.status(302)
    c.res.headers.set('Location', '/')
    return undefined
  }
  return email
}

async function getPageData(c: any): Promise<PageData> {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Santiago',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const month = parseInt(parts.find((p: any) => p.type === 'month')?.value ?? '1')
  const day   = parseInt(parts.find((p: any) => p.type === 'day')?.value ?? '1')

  const [palette, weather, news, programming, trendingNews, santoral] = await Promise.all([
    getPalette(c.env.KV),
    getWeather(c.env.KV, c.env.WEATHER_API_KEY),
    loadNews(c),
    loadProgramming(c),
    getTrendingNews(c.env.DB),
    getSantoralForDate(c.env.DB, month, day),
  ])
  return { palette, weather, news, programming, trendingNews, santoral, userEmail: getUserEmail(c) }
}

async function loadNews(c: any): Promise<NewsItem[]> {
  try {
    const result: any = await c.env.DB.prepare(
      'SELECT id, title, excerpt, content, image_url, is_trending, created_at, updated_at FROM news ORDER BY created_at DESC LIMIT 20'
    ).all()
    return (result.results || []) as NewsItem[]
  } catch {
    return []
  }
}

async function loadProgramming(c: any): Promise<ProgrammingItem[]> {
  try {
    const result: any = await c.env.DB.prepare(
      'SELECT id, day, time_start, time_end, show_name, description FROM programming ORDER BY day, time_start'
    ).all()
    return (result.results || []) as ProgrammingItem[]
  } catch {
    return []
  }
}

async function loadMessages(c: any): Promise<ContactMessage[]> {
  try {
    const result: any = await c.env.DB.prepare(
      'SELECT id, name, email, phone, message, created_at FROM contacts ORDER BY created_at DESC'
    ).all()
    return (result.results || []) as ContactMessage[]
  } catch {
    return []
  }
}

const FOTO_SRC = 'https://radiooceania.cl/wp-content/uploads/elementor/thumbs/Screenshot_2026-01-13-15-21-15-001_com.facebook.katana-e1769998908846-rijinbaalzb6rokgvk89b80zo071w5und6itzdbfeg.jpg'

app.get('/logo.png', async (c) => {
  try {
    const res = await fetch('https://radios.apk.cl/logo.png')
    if (!res.ok) throw new Error('upstream')
    return new Response(res.body, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=2592000',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return c.redirect('https://radios.apk.cl/logo.png', 302)
  }
})
app.get('/foto-fundador.jpg', async (c) => {
  try {
    const res = await fetch('https://radios.apk.cl/foto-fundador.jpg')
    if (!res.ok) throw new Error('upstream')
    return new Response(res.body, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=2592000',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return c.redirect(FOTO_SRC, 302)
  }
})

const NO_CACHE = { 'Cache-Control': 'no-store, must-revalidate' }

// Imagen OG 1200x630 para WhatsApp, Facebook e iMessage
app.get('/og-image.png', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0B2333"/>
      <stop offset="100%" style="stop-color:#040D14"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0066CC"/>
      <stop offset="100%" style="stop-color:#00AAFF"/>
    </linearGradient>
  </defs>

  <!-- Fondo -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Franja decorativa superior -->
  <rect width="1200" height="6" fill="url(#accent)"/>

  <!-- Círculos decorativos -->
  <circle cx="980" cy="100" r="280" fill="#0066CC" opacity="0.06"/>
  <circle cx="1050" cy="500" r="180" fill="#00AAFF" opacity="0.05"/>
  <circle cx="150" cy="530" r="200" fill="#0066CC" opacity="0.04"/>

  <!-- Ecualizador decorativo -->
  <rect x="80" y="420" width="18" height="80" rx="4" fill="#0066CC" opacity="0.5"/>
  <rect x="108" y="390" width="18" height="110" rx="4" fill="#0066CC" opacity="0.5"/>
  <rect x="136" y="440" width="18" height="60" rx="4" fill="#0066CC" opacity="0.5"/>
  <rect x="164" y="410" width="18" height="90" rx="4" fill="#0066CC" opacity="0.5"/>
  <rect x="192" y="430" width="18" height="70" rx="4" fill="#0066CC" opacity="0.5"/>

  <!-- Badge FM -->
  <rect x="80" y="100" width="160" height="44" rx="22" fill="#0066CC" opacity="0.9"/>
  <text x="160" y="129" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">93.7 FM</text>

  <!-- Nombre de la radio -->
  <text x="80" y="240" font-family="Arial,sans-serif" font-size="88" font-weight="900" fill="#FFFFFF" letter-spacing="-2">Radio</text>
  <text x="80" y="340" font-family="Arial,sans-serif" font-size="88" font-weight="900" fill="#00AAFF" letter-spacing="-2">Oceanía</text>

  <!-- Slogan -->
  <text x="80" y="400" font-family="Arial,sans-serif" font-size="32" fill="#FFFFFF" opacity="0.65">La de la Buena Música · Talcahuano, Chile</text>

  <!-- Separador -->
  <rect x="80" y="490" width="500" height="2" fill="#0066CC" opacity="0.4"/>

  <!-- CTA -->
  <text x="80" y="540" font-family="Arial,sans-serif" font-size="26" fill="#FFFFFF" opacity="0.5">🎵  Escúchanos en vivo en</text>
  <text x="80" y="578" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#00AAFF">radiooceania.cl</text>

  <!-- Onda de radio derecha -->
  <g transform="translate(900,315)" fill="none" stroke="#0066CC" stroke-width="3" opacity="0.35">
    <path d="M0,0 Q30,-60 0,-120" />
    <path d="M0,0 Q60,-100 0,-200" />
    <path d="M0,0 Q90,-140 0,-280" />
    <path d="M0,0 Q-30,-60 0,-120" />
    <path d="M0,0 Q-60,-100 0,-200" />
    <path d="M0,0 Q-90,-140 0,-280" />
  </g>
  <circle cx="900" cy="315" r="14" fill="#0066CC" opacity="0.6"/>
  <circle cx="900" cy="315" r="6" fill="#00AAFF"/>
</svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=604800',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

app.get('/sitemap.xml', (c) => {
  const base = 'https://radiooceania.cl'
  const today = new Date().toISOString().split('T')[0]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${base}/rss</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${base}/programacion</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${base}/contacto</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`
  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=UTF-8',
    'Cache-Control': 'public, max-age=86400',
  })
})

app.get('/robots.txt', (c) => {
  return c.text(
    `User-agent: *\nAllow: /\nDisallow: /radioadmin/\nSitemap: https://radiooceania.cl/sitemap.xml\n`,
    200,
    { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=86400' }
  )
})

app.get('/rss', async (c) => {
  const [palette, news] = await Promise.all([
    getPalette(c.env.KV),
    getAllTrendingNews(c.env.DB),
  ])
  return c.html(RssNewsPage({ news, palette }), 200, NO_CACHE)
})

app.get('/', async (c) => {
  const data = await getPageData(c)
  return c.html(HomePage(data), 200, NO_CACHE)
})

app.get('/programacion', async (c) => {
  const data = await getPageData(c)
  return c.html(ProgrammingPage(data), 200, NO_CACHE)
})

app.get('/contacto', async (c) => {
  const data = await getPageData(c)
  return c.html(ContactPage(data, c.env.CONTACT_EMAIL, c.env.WHATSAPP_NUMBER), 200, NO_CACHE)
})

app.post('/api/contact', async (c) => {
  const form = await c.req.formData()
  const name = form.get('name')?.toString() || ''
  const email = form.get('email')?.toString() || ''
  const phone = form.get('phone')?.toString() || ''
  const message = form.get('message')?.toString() || ''

  if (!name || !email || !message) {
    const data = await getPageData(c)
    return c.html(ContactPage(data, c.env.CONTACT_EMAIL, c.env.WHATSAPP_NUMBER))
  }

  try {
    await c.env.DB.prepare(
      'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)'
    ).bind(name, email, phone, message).run()
  } catch {}

  const data = await getPageData(c)
  return c.html(ContactPage(data, c.env.CONTACT_EMAIL, c.env.WHATSAPP_NUMBER))
})

app.get('/radioadmin', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const data = await getPageData(c)
  data.userEmail = email
  return c.html(AdminDashboard(data))
})

app.get('/radioadmin/colors', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const palette = await getPalette(c.env.KV)
  const data = await getPageData(c)
  data.userEmail = email
  return c.html(AdminColors(data, palette))
})

app.post('/radioadmin/colors', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const form = await c.req.formData()

  const palette = {
    primary: form.get('primary')?.toString() || DEFAULT_PALETTE.primary,
    secondary: form.get('secondary')?.toString() || DEFAULT_PALETTE.secondary,
    accent: form.get('accent')?.toString() || DEFAULT_PALETTE.accent,
    bg: form.get('bg')?.toString() || DEFAULT_PALETTE.bg,
    text: form.get('text')?.toString() || DEFAULT_PALETTE.text,
  }

  await setPalette(c.env.KV, palette)
  const data = await getPageData(c)
  data.userEmail = email
  return c.html(AdminColors(data, palette))
})

app.get('/radioadmin/news', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const data = await getPageData(c)
  data.userEmail = email
  return c.html(AdminNews(data))
})

app.get('/radioadmin/news/nueva', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const data = await getPageData(c)
  data.userEmail = email
  return c.html(AdminNewsForm(data))
})

app.post('/radioadmin/news', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const form = await c.req.formData()

  try {
    await c.env.DB.prepare(
      'INSERT INTO news (title, excerpt, content, image_url, is_trending) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      form.get('title')?.toString() || '',
      form.get('excerpt')?.toString() || '',
      form.get('content')?.toString() || '',
      form.get('image_url')?.toString() || '',
      form.get('is_trending') ? 1 : 0
    ).run()
  } catch {}

  return c.redirect('/radioadmin/news')
})

app.get('/radioadmin/news/:id', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const id = c.req.param('id')
  const data = await getPageData(c)
  data.userEmail = email

  try {
    const result = await c.env.DB.prepare(
      'SELECT * FROM news WHERE id = ?'
    ).bind(id).first<NewsItem>()
    if (result) {
      return c.html(AdminNewsForm(data, result))
    }
  } catch {}

  return c.redirect('/radioadmin/news')
})

app.post('/radioadmin/news/:id', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const id = c.req.param('id')
  const form = await c.req.formData()

  try {
    await c.env.DB.prepare(
      'UPDATE news SET title = ?, excerpt = ?, content = ?, image_url = ?, is_trending = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(
      form.get('title')?.toString() || '',
      form.get('excerpt')?.toString() || '',
      form.get('content')?.toString() || '',
      form.get('image_url')?.toString() || '',
      form.get('is_trending') ? 1 : 0,
      id
    ).run()
  } catch {}

  return c.redirect('/radioadmin/news')
})

app.post('/radioadmin/news/:id/delete', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const id = c.req.param('id')

  try {
    await c.env.DB.prepare('DELETE FROM news WHERE id = ?').bind(id).run()
  } catch {}

  return c.redirect('/radioadmin/news')
})

app.get('/radioadmin/programacion', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const data = await getPageData(c)
  data.userEmail = email
  return c.html(AdminProgramming(data))
})

app.get('/radioadmin/programacion/nuevo', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const data = await getPageData(c)
  data.userEmail = email
  return c.html(AdminProgrammingForm(data))
})

app.post('/radioadmin/programacion', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const form = await c.req.formData()

  try {
    await c.env.DB.prepare(
      'INSERT INTO programming (day, time_start, time_end, show_name, description) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      form.get('day')?.toString() || '',
      form.get('time_start')?.toString() || '',
      form.get('time_end')?.toString() || '',
      form.get('show_name')?.toString() || '',
      form.get('description')?.toString() || ''
    ).run()
  } catch {}

  return c.redirect('/radioadmin/programacion')
})

app.post('/radioadmin/programacion/:id/delete', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const id = c.req.param('id')

  try {
    await c.env.DB.prepare('DELETE FROM programming WHERE id = ?').bind(id).run()
  } catch {}

  return c.redirect('/radioadmin/programacion')
})

app.get('/radioadmin/messages', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')
  const data = await getPageData(c)
  data.userEmail = email
  const messages = await loadMessages(c)

  return c.html(`
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensajes - Admin Radio Oceanía</title>
    <link rel="icon" href="https://radiooceania.cl/wp-content/uploads/2025/12/cropped-Logo_Oceania-32x32.png" />
    </head>
    <body style="font-family:sans-serif; background:#0D1B2A; color:#F5F5F5; padding:2rem">
      <a href="/radioadmin" style="color:#C9A84C">&larr; Volver al panel</a>
      <h1 style="color:#C9A84C; margin-top:1rem">Mensajes de Contacto</h1>
      ${
        messages.length === 0
          ? '<p style="opacity:0.5">No hay mensajes.</p>'
          : messages.map(m => `
            <div style="background:rgba(255,255,255,0.05); border-radius:8px; padding:1rem; margin-bottom:0.75rem">
              <strong>${m.name}</strong> - <span style="opacity:0.6">${m.email}</span>
              ${m.phone ? `<span style="opacity:0.4"> | ${m.phone}</span>` : ''}
              <span style="opacity:0.4; float:right">${new Date(m.created_at).toLocaleString('es-CL')}</span>
              <p style="margin-top:0.5rem; opacity:0.8">${m.message}</p>
            </div>
          `).join('')
      }
    </body>
    </html>
  `, 200, { 'Content-Type': 'text/html; charset=utf-8' })
})

// ── Admin: forzar actualización de noticias ───────────────────────────────

app.post('/radioadmin/refresh-news', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')

  // Borrar caché KV para forzar fetch real
  try { await c.env.KV.delete('trending_gran_concepcion') } catch {}

  try {
    await fetchAndStoreTrendingNews(c.env.DB, c.env.KV)
    const result: any = await c.env.DB.prepare('SELECT COUNT(*) as n FROM trending_news').first()
    const count = result?.n ?? 0
    return c.html(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
      <meta http-equiv="refresh" content="2;url=/radioadmin">
      <title>Actualizando…</title></head>
      <body style="font-family:sans-serif;background:#0D1B2A;color:#F5F5F5;padding:2rem;text-align:center">
        <h2 style="color:#28a745">✓ Noticias actualizadas</h2>
        <p style="opacity:.7">${count} noticias en la base de datos.</p>
        <p style="opacity:.5;margin-top:.5rem">Redirigiendo al panel…</p>
      </body></html>`, 200, { 'Content-Type': 'text/html;charset=utf-8' })
  } catch (e) {
    return c.html(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
      <meta http-equiv="refresh" content="3;url=/radioadmin">
      <title>Error</title></head>
      <body style="font-family:sans-serif;background:#0D1B2A;color:#F5F5F5;padding:2rem;text-align:center">
        <h2 style="color:#ff6b6b">✗ Error al actualizar</h2>
        <p style="opacity:.7">${String(e)}</p>
      </body></html>`, 500, { 'Content-Type': 'text/html;charset=utf-8' })
  }
})

// ── Admin: estado del sistema de noticias ─────────────────────────────────

app.get('/radioadmin/news-status', async (c) => {
  const email = requireAdmin(c)
  if (!email) return c.redirect('/')

  const cached = await c.env.KV.get('trending_gran_concepcion').catch(() => null)
  const cacheData = cached ? JSON.parse(cached) : null
  const dbResult: any = await c.env.DB.prepare(
    'SELECT COUNT(*) as total, MAX(created_at) as last_update FROM trending_news'
  ).first().catch(() => null)

  const cacheAge = cacheData
    ? Math.round((Date.now() - cacheData.timestamp) / 60000)
    : null

  return c.json({
    db_count: dbResult?.total ?? 0,
    db_last_update: dbResult?.last_update ?? null,
    cache_age_minutes: cacheAge,
    cache_count: cacheData?.count ?? null,
  })
})


export default {
  fetch: app.fetch,
  async scheduled(event: any, env: Env, ctx: any) {
    // El cron siempre borra el caché antes de intentar actualizar
    try { await env.KV.delete('trending_gran_concepcion') } catch {}
    ctx.waitUntil(fetchAndStoreTrendingNews(env.DB, env.KV))
  },
}
