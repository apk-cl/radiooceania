import { Layout } from '../layouts/base'
import { HeroSection } from '../components/hero-section'
// import { MusicaRecuerdo } from '../components/musica-recuerdo'
import { DailyInfoSection } from '../components/daily-info-section'
import { EfemeridesSection } from '../components/efemerides-section'
import { TrendingNewsSection } from '../components/trending-news-section'
import { FounderSection } from '../components/founder-section'
import { WeatherWidget } from '../components/weather'
import type { PageData } from '../types'

export function HomePage(data: PageData) {
  return (
    <Layout palette={data.palette}>
      <HeroSection />

      {/* <MusicaRecuerdo programming={data.programming} /> */}

      <DailyInfoSection saints={data.santoral} />

      <EfemeridesSection />

      <TrendingNewsSection news={data.trendingNews} />

      <FounderSection />

      <WeatherWidget weather={data.weather} />

      <section class="section about-section">
        <div class="container text-center">
          <div class="about-content">
            <div class="about-badge">93.7 FM · Talcahuano</div>
            <p class="about-text">
              Estación que opera en el 93.7 FM desde Talcahuano para todo el gran Concepción y el Mundo…<br />
              Música variada de los años 60 hasta hoy, con actualidad y programas de interés.
            </p>
            <div class="about-actions">
              <a href="/programacion" class="btn btn-primary">Ver Programación Completa</a>
              <a href="/contacto" class="btn btn-outline">Contacto</a>
            </div>
          </div>
        </div>
        <style>{aboutStyles}</style>
      </section>
    </Layout>
  )
}

const aboutStyles = `
.about-section {
  background: linear-gradient(180deg, #0B2333 0%, #040D14 100%);
  padding-bottom: 0;
  color: #FFFFFF;
}
.about-content {
  max-width: 640px;
  margin: 0 auto;
}
.about-badge {
  display: inline-block;
  background: rgba(0,102,204,0.3);
  color: var(--color-secondary);
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1.25rem;
}
.about-text {
  font-size: 1.05rem;
  opacity: 0.65;
  line-height: 1.75;
  margin-bottom: 2rem;
}
.about-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}
`
