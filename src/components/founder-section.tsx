export function FounderSection() {
  return (
    <section class="section founder-section">
      <div class="founder-banner-wrap">
        <img
          src="/foto-fundador.jpg"
          alt="Juan Matías Fuentes Espinoza - Fundador Radio Oceanía"
          class="founder-banner-img"
          width="1024"
          height="300"
          loading="lazy"
        />
        <div class="founder-banner-overlay">
          <div class="founder-banner-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Fundador
          </div>
        </div>
      </div>
      <div class="container">
        <div class="founder-grid">

          <div class="founder-info-col">
            <span class="founder-eyebrow">Nuestro Fundador</span>
            <h2 class="founder-name">Juan Matías<br />Fuentes Espinoza</h2>
            <p class="founder-dates">21 de noviembre de 1943 · Lota, Chile</p>

            <div class="founder-milestone">
              <div class="milestone-year">1979</div>
              <div class="milestone-text">
                Por Decreto Supremo N° 69 del 8 de junio de 1979, se otorgó la concesión de
                <strong> Radio Oceanía 93.7 FM</strong> a Juan Matías Fuentes Espinoza para
                la ciudad de Talcahuano, provincia de Concepción.
              </div>
            </div>

            <p class="founder-bio">
              Profesional en Relaciones Públicas de la Pontificia Universidad Católica de Chile,
              Juan Matías combinó su vocación comunicacional con una profunda misión de servicio.
              Como funcionario de ENAP, llevó estrategias de comunicación a la Patagonia chilena
              en misiones humanitarias hacia Coihaique.
            </p>
            <p class="founder-bio">
              Fue lector de noticias y conductor del informativo en Canal 5 de Concepción desde 1977,
              además de animador en programas de cobertura nacional.
            </p>

            <blockquote class="founder-quote">
              "Educar, entretener, culturizar e informar a los auditores"
              <cite>— Misión de Radio Oceanía</cite>
            </blockquote>

            <div class="founder-stats">
              <div class="founder-stat">
                <span class="fstat-value">1979</span>
                <span class="fstat-label">Año de fundación</span>
              </div>
              <div class="founder-stat">
                <span class="fstat-value">93.7</span>
                <span class="fstat-label">FM Talcahuano</span>
              </div>
              <div class="founder-stat">
                <span class="fstat-value">+45</span>
                <span class="fstat-label">Años en el aire</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>{founderStyles}</style>
    </section>
  )
}

const founderStyles = `
.founder-section {
  background: linear-gradient(160deg, #040D14 0%, #0B1E2D 50%, #040D14 100%);
  color: #F5F5F5;
  padding: 0 0 5rem;
}
.founder-banner-wrap {
  position: relative;
  overflow: hidden;
  max-height: 340px;
}
.founder-banner-img {
  width: 100%; height: 340px;
  object-fit: cover; object-position: center top;
  display: block;
  filter: brightness(0.92) contrast(1.05);
}
.founder-banner-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(4,13,20,0.85) 100%);
  display: flex; align-items: flex-end; padding: 1.5rem 2rem;
}
.founder-banner-badge {
  background: linear-gradient(90deg, #FFB800, #FF8C00);
  color: #000;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 0.4rem;
}
.founder-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-top: 3rem;
}

.founder-eyebrow {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #FFB800;
  margin-bottom: 0.75rem;
  opacity: 0.85;
}
.founder-name {
  font-size: 2.8rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1px;
  color: #fff;
  margin-bottom: 0.5rem;
}
.founder-dates {
  font-size: 0.82rem;
  opacity: 0.45;
  margin-bottom: 2rem;
  letter-spacing: 0.3px;
}

.founder-milestone {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  background: rgba(255,184,0,0.07);
  border: 1px solid rgba(255,184,0,0.18);
  border-left: 4px solid #FFB800;
  border-radius: 0 12px 12px 0;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}
.milestone-year {
  font-size: 2rem;
  font-weight: 900;
  color: #FFB800;
  line-height: 1;
  flex-shrink: 0;
  letter-spacing: -1px;
}
.milestone-text { font-size: 0.87rem; line-height: 1.6; opacity: 0.8; }

.founder-bio {
  font-size: 0.92rem;
  line-height: 1.75;
  opacity: 0.65;
  margin-bottom: 1rem;
}
.founder-quote {
  border-left: 3px solid #0066CC;
  padding: 0.75rem 1.25rem;
  margin: 1.5rem 0;
  background: rgba(0,102,204,0.08);
  border-radius: 0 10px 10px 0;
  font-style: italic;
  font-size: 1.05rem;
  color: rgba(255,255,255,0.85);
}
.founder-quote cite {
  display: block;
  font-size: 0.78rem;
  opacity: 0.5;
  font-style: normal;
  margin-top: 0.5rem;
}
.founder-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.founder-stat { text-align: center; }
.fstat-value {
  display: block;
  font-size: 2rem;
  font-weight: 900;
  color: #0066CC;
  letter-spacing: -1px;
  line-height: 1;
}
.fstat-label { font-size: 0.72rem; opacity: 0.45; margin-top: 0.35rem; display: block; }

@media (max-width: 768px) {
  .founder-banner-img { height: 220px; }
  .founder-name { font-size: 2.2rem; }
}
@media (max-width: 480px) {
  .founder-banner-img { height: 160px; }
  .founder-name { font-size: 1.8rem; }
  .founder-stats { gap: 1rem; }
  .fstat-value { font-size: 1.6rem; }
  .founder-milestone { flex-direction: column; gap: 0.5rem; }
  .founder-section { padding-bottom: 3rem; }
}
`
