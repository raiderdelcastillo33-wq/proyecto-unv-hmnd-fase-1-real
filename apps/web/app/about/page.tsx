import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arquitectura Técnica - Portfolio Frontend Developer',
  description: 'Resumen técnico de la arquitectura del Sistema de Agentes IA, decisiones de entrega y estrategia de despliegue.'
}

const principles = [
  {
    title: 'Fundamento App Router',
    description: 'Páginas, layouts y rutas de servidor están organizadas en una estructura Next.js moderna que se mantiene legible conforme el proyecto crece.'
  },
  {
    title: 'Proxy de API interna',
    description: 'El browser habla primero con Next.js, y Next retransmite peticiones al backend a través de rutas internas controladas.'
  },
  {
    title: 'Ruta de despliegue monorepo',
    description: 'El frontend vive en `apps/web`, con un path de build seguro para producción y configuración amigable con Vercel.'
  }
]

const stack = [
  'Next.js 15',
  'React 19',
  'TypeScript estricto',
  'App Router',
  'Rutas servidor internas',
  'Setup monorepo Vercel-ready'
]

const delivery = [
  'Página landing con narrativa clara de contratación',
  'Demo funcional vía `/demo`',
  'Activos visuales del portfolio',
  'Superficie de entrega de CV',
  'Documentación lista para despliegue',
  'Repositorio público limpio para exportar'
]

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Resumen Técnico</span>
        <h1>Arquitectura del Sistema</h1>
        <p>
          UNV-HMND está estructurado para demostrar ejecución frontend pulida, integración backend realista y un path de despliegue limpio
          dentro de una configuración monorepo.
        </p>
      </section>

      <section className="grid-3">
        {principles.map((item) => (
          <article className="info-card" key={item.title}>
            <p className="result-eyebrow">Principle</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="workspace">
        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Execution Flow</p>
            <h2>Browser → Next.js → API Node</h2>
            <p>
              The frontend does not depend on direct browser calls to the backend service. Interactive
              pages go through Next.js server routes so the system remains more robust, more deployable,
              and easier to expose publicly.
            </p>
          </div>

          <div className="response-meta">
            <span className="info-chip">Public UI</span>
            <span className="info-chip">Internal routing</span>
            <span className="info-chip">Vercel ready</span>
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Stack</p>
            <h2>Technologies</h2>
          </div>

          <ul className="bullet-list bullet-list--dense">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="workspace">
        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Public Deliverables</p>
            <h2>Recruiter-facing version</h2>
          </div>

          <ul className="bullet-list bullet-list--dense">
            {delivery.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Deployment</p>
            <h2>Production</h2>
            <p>
              The frontend is prepared for Vercel deployment with `apps/web` as the project root. `UNV_API_BASE_URL`
              is optional and only needed when you want to point the app to an external backend.
            </p>
          </div>

          <div className="response-meta">
            <span className="info-chip">Root Directory: apps/web</span>
            <span className="info-chip">Build: next build</span>
          </div>
        </article>
      </section>
    </main>
  )
}
