const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

export async function getSantoralForDate(db: D1Database, month: number, day: number): Promise<string[]> {
  const monthDay = `${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`

  try {
    const row = await db.prepare('SELECT names FROM santoral WHERE month_day = ?')
      .bind(monthDay).first<{ names: string }>()
    if (row?.names) return JSON.parse(row.names)
  } catch {}

  const names = await fetchFromWikipedia(month, day)

  if (names.length > 0) {
    try {
      await db.prepare(
        "INSERT OR REPLACE INTO santoral (month_day, names, updated_at) VALUES (?, ?, datetime('now'))"
      ).bind(monthDay, JSON.stringify(names)).run()
    } catch {}
  }

  return names
}

async function fetchFromWikipedia(month: number, day: number): Promise<string[]> {
  try {
    const monthName = MONTHS_ES[month - 1]
    const url = `https://es.wikipedia.org/w/api.php?action=query&titles=${day}_de_${monthName}&prop=revisions&rvprop=content&format=json&rvslots=main`

    const res = await fetch(url, {
      headers: { 'User-Agent': 'RadioOceania/1.0 (radios.apk.cl)' },
      // @ts-ignore
      cf: { cacheTtl: 3600 },
    })
    if (!res.ok) return []

    const data: any = await res.json()
    const pages = data?.query?.pages
    if (!pages) return []

    const content: string = pages[Object.keys(pages)[0]]?.revisions?.[0]?.slots?.main?.['*'] || ''
    if (!content) return []

    const match =
      content.match(/===\s*Santoral\s+[Cc]at[oó]lico\s*===\s*([\s\S]*?)(?:===|==\s*[A-ZÁÉÍÓÚ]|$)/i) ||
      content.match(/==\s*Santoral\s*==\s*([\s\S]*?)(?:==|$)/i)

    if (!match) return []

    const names: string[] = []
    for (const line of match[1].split('\n')) {
      if (!line.trim().startsWith('*')) continue
      let name = line.trim()
        .replace(/^[*:]+\s*/, '')
        .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
        .replace(/\[\[([^\]]+)\]\]/g, '$1')
        .replace(/'''([^']+)'''/g, '$1')
        .replace(/''([^']+)''/g, '$1')
        .replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .split(/[—\-\(]/)[0]
        .trim()
      if (name.length > 2 && name.length < 80) names.push(name)
    }

    return names.slice(0, 6)
  } catch {
    return []
  }
}
