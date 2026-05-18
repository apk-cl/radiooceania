export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  bg: string
  text: string
}

export const DEFAULT_PALETTE: ColorPalette = {
  primary: '#FFFFFF',
  secondary: '#0066CC',
  accent: '#FFB800',
  bg: '#F5F7FA',
  text: '#1A1A1A',
}

const KV_KEY = 'color_palette'

export async function getPalette(kv: KVNamespace): Promise<ColorPalette> {
  try {
    const raw = await kv.get(KV_KEY)
    if (raw) {
      return { ...DEFAULT_PALETTE, ...JSON.parse(raw) }
    }
  } catch {}
  return DEFAULT_PALETTE
}

export async function setPalette(kv: KVNamespace, palette: ColorPalette): Promise<void> {
  await kv.put(KV_KEY, JSON.stringify(palette))
}

export function paletteToCSS(p: ColorPalette): string {
  return `
:root {
  --color-primary: ${p.primary};
  --color-secondary: ${p.secondary};
  --color-accent: ${p.accent};
  --color-bg: ${p.bg};
  --color-text: ${p.text};
}`
}
