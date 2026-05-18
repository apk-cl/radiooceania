import { Layout } from '../layouts/base'
import type { PageData, NewsItem } from '../types'

export function AdminNews(data: PageData) {
  return (
    <Layout palette={data.palette} userEmail={data.userEmail}>
      <section class="section">
        <div class="container">
          <a href="/radioadmin" style="opacity:0.6; font-size:0.85rem">&larr; Volver al panel</a>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem">
            <h2 class="section-title" style="margin-bottom:0">Noticias</h2>
            <a href="/radioadmin/news/nueva" class="btn btn-primary">+ Nueva Noticia</a>
          </div>

          {data.news.length === 0 ? (
            <div class="card mt-2 text-center" style="padding:3rem">
              <p style="opacity:0.5">No hay noticias aún. ¡Crea la primera!</p>
            </div>
          ) : (
            <div class="mt-2" style="display:flex; flex-direction:column; gap:0.75rem">
              {data.news.map(item => (
                <NewsListItem item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

function NewsListItem({ item }: { item: NewsItem }) {
  return (
    <div class="card" style="display:flex; gap:1rem; align-items:center">
      {item.image_url && (
        <img src={item.image_url} alt={item.title}
          style="width:80px; height:60px; object-fit:cover; border-radius:6px" />
      )}
      <div style="flex:1">
        <div style="display:flex; align-items:center; gap:0.5rem">
          <h3 style="font-size:0.95rem">{item.title}</h3>
          {item.is_trending ? (
            <span style="font-size:0.7rem; background:var(--color-secondary); color:var(--color-primary); padding:2px 6px; border-radius:4px; font-weight:600">Tendencia</span>
          ) : null}
        </div>
        <p style="font-size:0.8rem; opacity:0.6; margin-top:0.25rem">{item.excerpt}</p>
      </div>
      <div style="display:flex; gap:0.5rem">
        <a href={`/radioadmin/news/${item.id}`} class="btn btn-outline" style="padding:0.4rem 0.75rem; font-size:0.8rem">Editar</a>
        <form action={`/radioadmin/news/${item.id}/delete`} method="post" style="display:inline"
          onsubmit="return confirm('¿Eliminar esta noticia?')">
          <button type="submit" class="btn btn-primary" style="padding:0.4rem 0.75rem; font-size:0.8rem; background:#dc3545">Eliminar</button>
        </form>
      </div>
    </div>
  )
}

export function AdminNewsForm(data: PageData, item?: NewsItem) {
  const isEdit = !!item
  return (
    <Layout palette={data.palette} userEmail={data.userEmail}>
      <section class="section">
        <div class="container">
          <a href="/radioadmin/news" style="opacity:0.6; font-size:0.85rem">&larr; Volver a noticias</a>
          <h2 class="section-title" style="margin-top:1rem">
            {isEdit ? 'Editar Noticia' : 'Nueva Noticia'}
          </h2>

          <div class="card mt-2" style="max-width:700px">
            <form action={isEdit ? `/radioadmin/news/${item!.id}` : '/radioadmin/news'} method="post" style="margin-top:0.5rem">
              <div class="form-group">
                <label class="form-label" for="title">Título</label>
                <input class="form-input" type="text" id="title" name="title"
                  value={item?.title || ''} required />
              </div>
              <div class="form-group">
                <label class="form-label" for="excerpt">Extracto</label>
                <input class="form-input" type="text" id="excerpt" name="excerpt"
                  value={item?.excerpt || ''} />
              </div>
              <div class="form-group">
                <label class="form-label" for="content">Contenido</label>
                <textarea class="form-textarea" id="content" name="content"
                  style="min-height:200px">{item?.content || ''}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label" for="image_url">URL de Imagen</label>
                <input class="form-input" type="url" id="image_url" name="image_url"
                  value={item?.image_url || ''} placeholder="https://..." />
              </div>
              <div class="form-group">
                <label class="form-checkbox">
                  <input type="checkbox" name="is_trending" value="1"
                    checked={item?.is_trending === 1} />
                  <span style="margin-left:0.5rem">Marcar como tendencia</span>
                </label>
              </div>
              <button type="submit" class="btn btn-primary">
                {isEdit ? 'Guardar Cambios' : 'Crear Noticia'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}
