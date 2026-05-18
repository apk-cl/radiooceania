import type { Env } from '../types'

export interface TrendingNews {
  id?: number
  title: string
  excerpt: string
  content: string
  image_url: string
  source: string
  published_at: string
  category: string
  created_at?: string
}

const CACHE_KEY = 'trending_gran_concepcion'
const CACHE_TTL = 3600 // 1 hour

// ── Imágenes referenciales por categoría ──────────────────────────────────

const CONCEPCION_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
  'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
  'https://images.unsplash.com/photo-1574444192149-f584a81cdf94?w=800&q=80',
  'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80',
]

const SPACE_IMAGES = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
  'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&q=80',
  'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80',
]

const TECH_IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  'https://images.unsplash.com/photo-1591238372338-f96c52b93e47?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
]

// Detecta si el contenido pertenece a espacio o tecnología
function classifyContent(source: string, category: string, title: string): 'space' | 'tech' | 'local' {
  const TECH_SOURCES = new Set(['FayerWayer', 'Xataka'])
  const SPACE_SOURCES = new Set(['NASA'])
  const INTL_SOURCES = new Set(['DW Español', 'BBC Mundo', 'La Tercera', 'T13'])

  const t = (title + ' ' + category).toLowerCase()

  if (SPACE_SOURCES.has(source) ||
      /\b(espaci|astro|nasa|cohete|satélite|satelite|planeta|galaxia|universo|iss|telescopi|órbita|orbita|exoplaneta|nebulosa)\b/.test(t)) {
    return 'space'
  }
  if (TECH_SOURCES.has(source) ||
      /\b(tecnol|inteligencia artificial|robot|software|app\b|startup|digital|ciberseguridad|ia\b|chip|procesador|smartphone|apple|google|microsoft|openai|gemini|gpt)\b/.test(t)) {
    return 'tech'
  }
  return 'local'
}

// Selección consistente basada en hash del título
function pickImage(pool: string[], seed: string): string {
  const hash = seed.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0)
  return pool[Math.abs(hash) % pool.length]
}

function getFallbackImage(title: string, source: string, category: string): string {
  const kind = classifyContent(source, category, title)
  if (kind === 'space') return pickImage(SPACE_IMAGES, title)
  if (kind === 'tech') return pickImage(TECH_IMAGES, title)
  return pickImage(CONCEPCION_IMAGES, title)
}

// ── RSS Feeds ──────────────────────────────────────────────────────────────

const RSS_FEEDS = [
  // Internacional
  { url: 'https://rss.dw.com/rdf/rss-es-all', source: 'DW Español', category: 'Internacional' },
  { url: 'https://feeds.bbci.co.uk/mundo/rss.xml', source: 'BBC Mundo', category: 'Internacional' },
  // Nacional Chile
  { url: 'https://www.latercera.com/feed/', source: 'La Tercera', category: 'Nacional' },
  { url: 'https://www.t13.cl/rss.xml', source: 'T13', category: 'Nacional' },
  // Regional
  { url: 'https://sabes.cl/feed/', source: 'Sabes.cl', category: 'Regional' },
  { url: 'https://www.diarioconcepcion.cl/feed/', source: 'Diario Concepción', category: 'Regional' },
  // Tecnología
  { url: 'https://www.fayerwayer.com/feed/', source: 'FayerWayer', category: 'Tecnología' },
  { url: 'https://feeds.weblogssl.com/xataka', source: 'Xataka', category: 'Tecnología' },
]

// ── Funciones públicas ─────────────────────────────────────────────────────

export async function getTrendingNews(db: D1Database): Promise<TrendingNews[]> {
  try {
    const result: any = await db.prepare(
      'SELECT * FROM trending_news ORDER BY published_at DESC LIMIT 10'
    ).all()
    return (result.results || []) as TrendingNews[]
  } catch {
    return []
  }
}

export async function fetchAndStoreTrendingNews(db: D1Database, kv: KVNamespace): Promise<void> {
  try {
    const cached = await kv.get(CACHE_KEY)
    if (cached) {
      const data = JSON.parse(cached)
      if (data.timestamp > Date.now() - CACHE_TTL * 1000) return
    }

    const news = await fetchFromRSS()

    if (news.length > 0) {
      await db.prepare('DELETE FROM trending_news').run()
      for (const item of news) {
        await db.prepare(`
          INSERT INTO trending_news (title, excerpt, content, image_url, source, published_at, category)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          item.title, item.excerpt, item.content,
          item.image_url, item.source, item.published_at, item.category
        ).run()
      }
      await kv.put(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), count: news.length }), {
        expirationTtl: CACHE_TTL,
      })
      console.log(`Trending news updated: ${news.length} items`)
    } else {
      console.warn('RSS returned no items; keeping existing DB data')
      await kv.put(CACHE_KEY, JSON.stringify({ timestamp: Date.now() - CACHE_TTL * 1000 + 1800 * 1000, count: 0 }), {
        expirationTtl: 1800,
      })
    }
  } catch (e) {
    console.error('fetchAndStoreTrendingNews error:', e)
  }
}

// ── Fetch & parse ──────────────────────────────────────────────────────────

async function fetchFromRSS(): Promise<TrendingNews[]> {
  const allNews: TrendingNews[] = []

  for (const feed of RSS_FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RadioOceania/1.0; +https://radios.apk.cl)',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        // @ts-ignore
        cf: { cacheTtl: 300 },
      })
      if (!res.ok) {
        console.warn(`RSS ${feed.source} → HTTP ${res.status}`)
        continue
      }
      const text = await res.text()
      const items = parseRSSItems(text, feed.source, feed.category)
      console.log(`RSS ${feed.source}: ${items.length} items`)
      allNews.push(...items)
    } catch (e) {
      console.error(`RSS fetch failed [${feed.source}]:`, e)
    }
  }

  // Deduplicar por prefijo de título
  const seen = new Set<string>()
  const unique: TrendingNews[] = []
  for (const item of allNews) {
    const key = item.title.trim().toLowerCase().substring(0, 60)
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(item)
    }
  }

  return unique.slice(0, 10)
}

function parseRSSItems(xml: string, source: string, defaultCategory: string): TrendingNews[] {
  const items: TrendingNews[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
    const raw = match[1]
    const title = extractTag(raw, 'title')
    if (!title) continue

    const description = extractTag(raw, 'description')
    const encoded = extractTag(raw, 'content:encoded') || extractTag(raw, 'encoded')
    const pubDate = extractTag(raw, 'pubDate')
    const rawCategory = extractTag(raw, 'category') || defaultCategory
    const bodyText = encoded || description || ''

    // Imagen: desde el feed primero, si no hay → referencial
    let imageUrl = extractImage(raw, description, encoded)
    if (!imageUrl) {
      imageUrl = getFallbackImage(title, source, rawCategory)
    }

    const category = decodeHTMLEntities(rawCategory)

    items.push({
      title: decodeHTMLEntities(title),
      excerpt: decodeHTMLEntities(stripHTML(bodyText)).substring(0, 220),
      content: bodyText,
      image_url: decodeHTMLEntities(imageUrl),
      source,
      published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      category,
    })
  }

  return items
}

// ── Helpers ────────────────────────────────────────────────────────────────

function extractImage(itemXml: string, description: string, encoded: string): string {
  // 1. media:content o media:thumbnail con url= (cualquier variante de namespace)
  const media1 = itemXml.match(/media:(?:content|thumbnail)[^>]+url=["']([^"']+)/i)
  if (media1?.[1] && isImageUrl(media1[1])) return media1[1]

  // 2. url= antes de media:content (algunos feeds invierten atributos)
  const media2 = itemXml.match(/url=["']([^"']+)[^>]+media:/i)
  if (media2?.[1] && isImageUrl(media2[1])) return media2[1]

  // 3. enclosure con tipo imagen
  const enclosure = itemXml.match(/<enclosure[^>]+url=["']([^"']+)/i)
  if (enclosure?.[1] && isImageUrl(enclosure[1])) return enclosure[1]

  // 4. <img src= dentro de content:encoded
  if (encoded) {
    const img = encoded.match(/<img[^>]+src=["']([^"']+)/i)
    if (img?.[1] && isImageUrl(img[1])) return img[1]
  }

  // 5. <img src= dentro de description
  if (description) {
    const img = description.match(/<img[^>]+src=["']([^"']+)/i)
    if (img?.[1] && isImageUrl(img[1])) return img[1]
  }

  // 6. Cualquier URL con extensión de imagen en el XML crudo
  const anyImg = itemXml.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\s"'<>]*)?/i)
  if (anyImg?.[0]) return anyImg[0]

  return ''
}

function isImageUrl(url: string): boolean {
  return /^https?:\/\/.+/.test(url) && !/^data:/.test(url)
}

function extractTag(xml: string, tag: string): string {
  const cdata = xml.match(new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i'))
  if (cdata) return cdata[1].trim()
  const plain = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
  return plain ? plain[1].trim() : ''
}

function stripHTML(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8230;/g, '…')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, ' ')
}
