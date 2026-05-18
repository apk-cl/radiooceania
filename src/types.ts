import type { ColorPalette } from './lib/colors'
import type { WeatherData } from './lib/weather'
import type { TrendingNews } from './lib/trending-news'

export interface Env {
  DB: D1Database
  KV: KVNamespace
SITE_NAME: string
  STREAM_URL: string
  STREAM_URL_HLS: string
  DEFAULT_PRIMARY_COLOR: string
  DEFAULT_SECONDARY_COLOR: string
  DEFAULT_BG_COLOR: string
  DEFAULT_TEXT_COLOR: string
  DEFAULT_ACCENT_COLOR: string
  WEATHER_API_KEY: string
  CONTACT_EMAIL: string
  WHATSAPP_NUMBER: string
}

export interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  image_url: string
  is_trending: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export interface ProgrammingItem {
  id: number
  day: string
  time_start: string
  time_end: string
  show_name: string
  description: string
}

export interface PageData {
  palette: ColorPalette
  weather: WeatherData | null
  news: NewsItem[]
  programming: ProgrammingItem[]
  trendingNews: TrendingNews[]
  santoral: string[]
  userEmail?: string
}
