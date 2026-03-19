import { CatalogItem, CatalogLesson, CatalogResource, CatalogResponse } from '../../app/types'
import { formatLessonType, formatLevel } from '../../app/utils/format'
import { escapeHtml } from '../../app/utils/html'

export function renderCatalogIdle(container: HTMLElement): void {
  container.innerHTML = `
    <div class="empty-state">
      <span class="empty-state-badge">Ready</span>
      <h3>El contenido aun no se ha cargado</h3>
      <p>
        Cuando pulses "Cargar catalogo", aqui veras una vista editorial del contenido disponible y
        los recursos base sembrados por la aplicacion.
      </p>
    </div>
  `
}

export function renderCatalogError(container: HTMLElement, message: string): void {
  container.innerHTML = `<div class="catalog-error">${escapeHtml(message)}</div>`
}

export function renderCatalog(container: HTMLElement, catalog: CatalogResponse): void {
  const { items, resources } = catalog

  if (items.length === 0 && resources.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-badge">Sin contenido</span>
        <h3>No hay cursos ni recursos publicados todavia</h3>
        <p>La estructura visual ya esta preparada. Cuando el backend publique contenido, aparecera aqui.</p>
      </div>
    `
    return
  }

  const coursesMarkup =
    items.length > 0
      ? items.map(renderCourseCard).join('')
      : `<div class="course-empty">Todavia no hay cursos publicados. Los recursos base siguen disponibles en la columna lateral.</div>`

  const resourcesMarkup =
    resources.length > 0
      ? resources.map(renderResourceCard).join('')
      : `<div class="course-empty">Todavia no hay recursos de apoyo cargados.</div>`

  container.innerHTML = `
    <div class="catalog-layout">
      <section class="catalog-column">
        <div class="catalog-column-header">
          <div>
            <p class="catalog-section-tag">Published courses</p>
            <h3>Ruta de aprendizaje</h3>
            <p>Cada curso aparece con su estructura interna para que el producto se sienta navegable y escalable.</p>
          </div>
        </div>
        ${coursesMarkup}
      </section>

      <aside class="catalog-column">
        <div class="catalog-column-header">
          <div>
            <p class="catalog-section-tag">Knowledge assets</p>
            <h3>Recursos base</h3>
            <p>Plantillas, snippets y piezas de apoyo listas para convertirse en una biblioteca real.</p>
          </div>
        </div>
        <div class="resource-list">
          ${resourcesMarkup}
        </div>
      </aside>
    </div>
  `
}

function renderCourseCard(item: CatalogItem): string {
  const moduleCount = item.modules.length
  const lessonCount = item.modules.reduce((total, moduleItem) => total + moduleItem.lessons.length, 0)

  const modulesMarkup =
    item.modules.length > 0
      ? item.modules
          .map(
            (moduleItem) => `
              <div class="module-card">
                <div class="module-title-row">
                  <div class="module-index">${String(moduleItem.module.position).padStart(2, '0')}</div>
                  <div>
                    <h4>${escapeHtml(moduleItem.module.title)}</h4>
                    <div class="lesson-meta">${moduleItem.lessons.length} lecciones</div>
                  </div>
                </div>
                <div class="module-lessons">
                  ${moduleItem.lessons.map(renderLesson).join('')}
                </div>
              </div>
            `
          )
          .join('')
      : `<div class="course-empty">Este curso aun no tiene modulos publicados.</div>`

  return `
    <article class="course-card">
      <div class="course-card-top">
        <div>
          <h3>${escapeHtml(item.course.title)}</h3>
          <p class="course-description">${escapeHtml(item.course.description)}</p>
        </div>
        <span class="course-level">${escapeHtml(formatLevel(item.course.level))}</span>
      </div>

      <div class="course-inline-stats">
        <span>${moduleCount} modulos</span>
        <span>${lessonCount} lecciones</span>
      </div>

      <div class="module-stack">
        ${modulesMarkup}
      </div>
    </article>
  `
}

function renderResourceCard(resource: CatalogResource): string {
  const detail = resource.content ?? resource.url ?? 'Contenido de apoyo preparado para evolucionar con el producto.'

  return `
    <article class="resource-card">
      <div class="course-card-top">
        <div>
          <h4>${escapeHtml(resource.title)}</h4>
          <p>${escapeHtml(resource.description)}</p>
        </div>
        <span class="resource-category">${escapeHtml(resource.category)}</span>
      </div>
      <div class="resource-content">${escapeHtml(detail)}</div>
    </article>
  `
}

function renderLesson(lesson: CatalogLesson): string {
  return `
    <article class="lesson-item">
      <strong>${escapeHtml(lesson.title)}</strong>
      <div class="lesson-meta">${escapeHtml(formatLessonType(lesson.type))} · ${lesson.durationMinutes} min</div>
      <p class="lesson-objective">${escapeHtml(lesson.objective)}</p>
    </article>
  `
}
