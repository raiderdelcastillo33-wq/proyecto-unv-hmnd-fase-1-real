import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Raider del Castillo - Frontend Developer & AI Integration Specialist',
  description:
    'Portfolio profesional de desarrollador frontend con experiencia en React, Next.js, TypeScript y integración de IA. Arquitectura modular, UX/UI moderna y soluciones escalables.'
}

const systemSignals = [
  {
    kicker: 'Frontend execution',
    title: 'Arquitectura modular orientada a producto',
    description: 'Sistema construido con Next.js 15, TypeScript estricto y separación clara entre frontend, backend y servicios de IA.'
  },
  {
    kicker: 'Engineering quality',
    title: 'Integración tipada de IA',
    description: 'Flujo controlado Browser → Next.js → API interna → Servicios de IA, con manejo robusto de errores y estados de carga.'
  },
  {
    kicker: 'Production mindset',
    title: 'Preparado para despliegue empresarial',
    description: 'Monorepo optimizado para Vercel, con rutas API internas, validación de tipos y estrategias de fallback en producción.'
  }
]

const stackHighlights = [
  'Next.js 15 App Router',
  'React 19 + TypeScript',
  'Arquitectura modular',
  'Integración IA',
  'API REST tipada',
  'Monorepo escalable'
]

const walkthrough = [
  {
    step: '01',
    title: 'Explora el portfolio profesional',
    description: 'Conoce mi experiencia en desarrollo frontend moderno, integración de IA y construcción de productos escalables.'
  },
  {
    step: '02',
    title: 'Interactúa con la demo funcional',
    description: 'Prueba el sistema de IA en tiempo real: envía mensajes y observa el flujo completo Browser → API → IA.'
  },
  {
    step: '03',
    title: 'Revisa la arquitectura técnica',
    description: 'Entiende las decisiones técnicas, patrones de diseño y estrategias de despliegue implementadas.'
  }
]

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Portfolio Profesional - Desarrollador Frontend</span>
          <h1>Sistema de Agentes IA</h1>
          <p>
            UNV-HMND es una aplicación Next.js de nivel producción que demuestra pensamiento de producto,
            orquestación de APIs internas y ejecución frontend consciente de producción en un recorrido claro.
          </p>

          <div className="tag-row">
            {stackHighlights.map((item) => (
              <span className="tech-pill" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <Link className="primary-button" href="/demo">
              Probar Demo Interactiva
            </Link>
            <Link className="secondary-button" href="/about">
              Ver Arquitectura
            </Link>
            <Link className="secondary-button" href="/portfolio">
              Explorar Portfolio
            </Link>
            <Link className="secondary-button" href="/gallery">
              Ver Galería
            </Link>
            <Link className="secondary-button" href="/download">
              Descargar CV
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Lo que demuestra este proyecto</p>
          <h2>Browser → Next.js → API Interna → Servicios IA</h2>
          <p className="meta-text">
            La experiencia está construida para comunicar cómo un ingeniero frontend piensa sobre UX de producto,
            límites de servidor tipados, despliegue en producción y flujos orientados a IA.
          </p>

          <div className="metrics-grid">
            <article className="metric-card">
              <strong className="metric-value">Demo funcional</strong>
              <span className="metric-label">Flujo completo de petición y respuesta</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Stack tipado</strong>
              <span className="metric-label">TypeScript estricto en UI y rutas</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">UI desplegable</strong>
              <span className="metric-label">Configuración monorepo lista para Vercel</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Historia clara del sistema</strong>
              <span className="metric-label">Fácil de explicar en entrevistas técnicas</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="result-eyebrow">Señales de Contratación</p>
          <h2 className="section-title">Lo que un reclutador o manager técnico puede entender rápidamente</h2>
          <p>
            El objetivo no es solo verse pulido. El objetivo es hacer visible el juicio técnico en el
            primer scroll: estructura, intención, confiabilidad y claridad del sistema.
          </p>
        </div>

        <div className="signal-grid">
          {systemSignals.map((item) => (
            <article className="signal-card" key={item.title}>
              <span className="signal-kicker">{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="result-eyebrow">Recorrido</p>
          <h2 className="section-title">Una historia de producto corta con un payoff técnico claro</h2>
          <p>
            Cada página tiene un trabajo: orientar al espectador, probar que la demo funciona, y hacer la arquitectura
            más fácil de confiar.
          </p>
        </div>

        <div className="timeline-grid">
          {walkthrough.map((item) => (
            <article className="timeline-card" key={item.step}>
              <span className="step-index">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <article className="story-card">
          <div>
            <p className="result-eyebrow">Próximo paso</p>
            <h2 className="section-title">Ve directamente a la parte que prueba que el sistema funciona</h2>
            <p>
              Abre la demo para validar el flujo de ejecución, luego usa la página de arquitectura para revisar las
              decisiones técnicas detrás de ella.
            </p>
          </div>

          <div className="story-card__actions">
            <Link className="primary-button" href="/demo">
              Ejecutar Demo
            </Link>
            <Link className="secondary-button" href="/about">
              Leer Arquitectura
            </Link>
          </div>
        </article>
      </section>
    </main>
  )
}
