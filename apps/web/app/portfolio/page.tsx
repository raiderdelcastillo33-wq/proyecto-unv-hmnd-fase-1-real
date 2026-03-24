import Image from 'next/image'

const portfolioHighlights = [
  {
    kicker: 'Comunicación visual',
    title: 'Diagramas de sistema que apoyan la propuesta',
    description: 'Los activos del portfolio no son decorativos. Ayudan a explicar el flujo de peticiones, intención de UI y estructura modular del sistema.'
  },
  {
    kicker: 'Enmarcado profesional',
    title: 'Activos alineados con la historia del producto',
    description: 'Cada visual apoya la misma narrativa usada en la landing, demo y páginas de arquitectura.'
  },
  {
    kicker: 'Preparación para entrevistas',
    title: 'Fácil de presentar en pantalla',
    description: 'La página está optimizada para permitir que un reclutador o entrevistador escanee los visuales sin necesitar contexto extra.'
  }
]

const portfolioItems = [
  {
    src: '/images/architecture-flux.svg',
    title: 'Flujo de Aplicación',
    description: 'Una visualización concisa de la cadena de ejecución Browser → Next.js → API Node.',
    impact: 'Útil para explicar por qué el frontend confía en rutas internas en lugar de llamadas directas browser-to-backend.',
    tags: ['Diseño de flujo', 'API interna', 'Explicación del sistema']
  },
  {
    src: '/images/interface-agent.svg',
    title: 'Interfaz de Demo',
    description: 'Una superficie de interfaz orientada a reclutadores enfocada en claridad, confianza y comprensión rápida.',
    impact: 'Muestra el proyecto como una superficie de producto, no solo como muestra de código.',
    tags: ['UI/UX', 'Superficie de demo', 'Pensamiento de producto']
  },
  {
    src: '/images/systeme-modulaire.svg',
    title: 'Sistema Modular',
    description: 'Un activo visual centrado en extensibilidad y límites claros del sistema.',
    impact: 'Apoya conversaciones sobre mantenibilidad, layering y escala futura.',
    tags: ['Arquitectura', 'Modularidad', 'Escalabilidad']
  }
]

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--pending">Activos del Portfolio</span>
        <h1>Portfolio Profesional</h1>
        <p>
          Una capa visual diseñada para ayudar a reclutadores e entrevistadores a entender la historia del producto,
          el flujo del sistema y la intención de ingeniería detrás de UNV-HMND.
        </p>
      </section>

      <section className="signal-grid">
        {portfolioHighlights.map((item) => (
          <article className="signal-card" key={item.title}>
            <span className="signal-kicker">{item.kicker}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="gallery-grid">
        {portfolioItems.map((item) => (
          <article className="gallery-card" key={item.src}>
            <div className="gallery-media">
              <Image alt={item.title} height={900} priority={false} src={item.src} width={1400} />
            </div>

            <div className="gallery-copy">
              <div className="gallery-title-row">
                <h2>{item.title}</h2>
                <span className="status-pill status-pill--pending">Activo local</span>
              </div>
              <p>{item.description}</p>
              <p className="gallery-impact">{item.impact}</p>

              <div className="gallery-tags">
                {item.tags.map((tag) => (
                  <span className="gallery-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
