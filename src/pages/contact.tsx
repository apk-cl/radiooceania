import { Layout } from '../layouts/base'
import type { PageData } from '../types'

export function ContactPage(data: PageData, contactEmail: string, whatsappNumber: string) {
  return (
    <Layout palette={data.palette}>
      <section class="section">
        <div class="container">
          <h2 class="section-title">Contacto</h2>
          <div class="grid-2 mt-2">
            <div>
              <div class="card mb-1">
                <h3 style="color:var(--color-secondary); margin-bottom:1rem">Información</h3>
                <div style="display:flex; flex-direction:column; gap:0.75rem">
                  <div class="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Pasaje Desiderio García 451, Talcahuano</span>
                  </div>
                  <div class="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <a href="tel:0412593534">041-2593534</a>
                  </div>
                  <div class="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </div>
                  <div class="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener">+{whatsappNumber}</a>
                  </div>
                </div>
              </div>
              <div class="card">
                <h3 style="color:var(--color-secondary); margin-bottom:1rem">Redes Sociales</h3>
                <div style="display:flex; gap:1.25rem">
                  <a href="https://www.instagram.com/radio_oceania_talcahuano/" target="_blank" rel="noopener" class="social-link-card">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </a>
                  <a href="https://radiooceania.cl/oficial/index.php/feed/rss/" target="_blank" rel="noopener" class="social-link-card">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16M4 18a3 3 0 013 3" />
                    </svg>
                    RSS
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div class="card">
                <h3 style="color:var(--color-secondary); margin-bottom:1.25rem">Envíanos un mensaje</h3>
                <form action="/api/contact" method="post">
                  <div class="form-group">
                    <label class="form-label" for="name">Nombre</label>
                    <input class="form-input" type="text" id="name" name="name" placeholder="Tu nombre" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="email">Email</label>
                    <input class="form-input" type="email" id="email" name="email" placeholder="tu@email.com" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="phone">Teléfono (opcional)</label>
                    <input class="form-input" type="tel" id="phone" name="phone" placeholder="+56 9 1234 5678" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="message">Mensaje</label>
                    <textarea class="form-textarea" id="message" name="message" placeholder="Escribe tu mensaje aquí..." required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary" style="width:100%">Enviar Mensaje</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{contactStyles}</style>
    </Layout>
  )
}

const contactStyles = `
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.88rem;
  opacity: 0.75;
}
.contact-item a {
  color: var(--color-secondary);
}
.social-link-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  color: rgba(245,245,245,0.7) !important;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s;
}
.social-link-card:hover {
  background: rgba(0,102,204,0.1);
  border-color: rgba(0,102,204,0.2);
  color: var(--color-secondary) !important;
}
`
