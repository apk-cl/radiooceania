export interface WeatherData {
  temp: number
  condition: string
  icon: string
  humidity: number
  wind: number
  location: string
  forecast?: ForecastDay[]
}

export interface ForecastDay {
  date: string
  maxtemp: number
  mintemp: number
  condition: string
  icon: string
}

const CACHE_KEY = 'weather_talcahuano_v2'
const CACHE_TTL = 1800 // 30 min

// Talcahuano coordinates
const LAT = -36.7337
const LON = -73.1189

// WMO weather code → Spanish text + WeatherAPI icon code
const WMO: Record<number, { text: string; code: number }> = {
  0:  { text: 'Despejado',                code: 113 },
  1:  { text: 'Principalmente despejado', code: 116 },
  2:  { text: 'Parcialmente nublado',     code: 116 },
  3:  { text: 'Nublado',                  code: 119 },
  45: { text: 'Neblina',                  code: 248 },
  48: { text: 'Niebla helada',            code: 260 },
  51: { text: 'Llovizna leve',            code: 266 },
  53: { text: 'Llovizna moderada',        code: 266 },
  55: { text: 'Llovizna intensa',         code: 266 },
  61: { text: 'Lluvia leve',              code: 296 },
  63: { text: 'Lluvia moderada',          code: 302 },
  65: { text: 'Lluvia intensa',           code: 308 },
  71: { text: 'Nevada leve',              code: 326 },
  73: { text: 'Nevada moderada',          code: 329 },
  75: { text: 'Nevada intensa',           code: 338 },
  77: { text: 'Granizo menudo',           code: 326 },
  80: { text: 'Chubascos leves',          code: 299 },
  81: { text: 'Chubascos',               code: 302 },
  82: { text: 'Chubascos fuertes',        code: 305 },
  85: { text: 'Chubascos de nieve',       code: 335 },
  86: { text: 'Nevada en chubascos',      code: 338 },
  95: { text: 'Tormenta eléctrica',       code: 389 },
  96: { text: 'Tormenta con granizo',     code: 392 },
  99: { text: 'Tormenta intensa',         code: 395 },
}

function wmoIcon(code: number, isDay: boolean): string {
  const w = WMO[code] ?? { text: 'Variable', code: 116 }
  const slot = isDay ? 'day' : 'night'
  return `//cdn.weatherapi.com/weather/64x64/${slot}/${w.code}.png`
}

function wmoText(code: number): string {
  return (WMO[code] ?? { text: 'Variable' }).text
}

async function fetchOpenMeteo(): Promise<WeatherData | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=America%2FSantiago&forecast_days=3`

    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      // @ts-ignore
      cf: { cacheTtl: 1800 },
    })
    if (!res.ok) return null

    const data: any = await res.json()
    const cur = data.current
    const isDay = cur.is_day === 1
    const wCode: number = cur.weather_code

    return {
      temp: Math.round(cur.temperature_2m),
      condition: wmoText(wCode),
      icon: wmoIcon(wCode, isDay),
      humidity: cur.relative_humidity_2m,
      wind: Math.round(cur.wind_speed_10m),
      location: 'Talcahuano',
      forecast: (data.daily.time as string[]).slice(0, 3).map((date: string, i: number) => ({
        date,
        maxtemp: Math.round(data.daily.temperature_2m_max[i]),
        mintemp: Math.round(data.daily.temperature_2m_min[i]),
        condition: wmoText(data.daily.weather_code[i]),
        icon: wmoIcon(data.daily.weather_code[i], true), // forecast always daytime icon
      })),
    }
  } catch {
    return null
  }
}

export async function getWeather(kv: KVNamespace, _apiKey: string): Promise<WeatherData | null> {
  try {
    const cached = await kv.get(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (parsed._ts && Date.now() - parsed._ts < CACHE_TTL * 1000) {
        const { _ts, ...weather } = parsed
        return weather as WeatherData
      }
    }

    const weather = await fetchOpenMeteo()
    if (weather) {
      await kv.put(CACHE_KEY, JSON.stringify({ ...weather, _ts: Date.now() }), {
        expirationTtl: CACHE_TTL,
      })
      return weather
    }

    return getFallbackWeather()
  } catch {
    return getFallbackWeather()
  }
}

function getFallbackWeather(): WeatherData {
  const now = new Date()
  const isDay = now.getHours() >= 7 && now.getHours() < 20
  const slot = isDay ? 'day' : 'night'
  const days = [0, 1, 2].map(offset => {
    const d = new Date(now)
    d.setDate(d.getDate() + offset)
    return d.toISOString().split('T')[0]
  })
  return {
    temp: 13,
    condition: 'Parcialmente nublado',
    icon: `//cdn.weatherapi.com/weather/64x64/${slot}/116.png`,
    humidity: 78,
    wind: 18,
    location: 'Talcahuano',
    forecast: [
      { date: days[0], maxtemp: 15, mintemp: 10, condition: 'Parcialmente nublado', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
      { date: days[1], maxtemp: 14, mintemp: 9,  condition: 'Nublado',              icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' },
      { date: days[2], maxtemp: 13, mintemp: 8,  condition: 'Lluvia leve',          icon: '//cdn.weatherapi.com/weather/64x64/day/296.png' },
    ],
  }
}
