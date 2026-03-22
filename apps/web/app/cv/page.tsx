import { existsSync } from 'node:fs'
import path from 'node:path'

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Git / GitHub',
  'Architecture modulaire',
  'Intégration API'
]

const projects = [
  'UNV-HMND : plateforme web avec frontend Next.js et backend Node.',
  'Démo structurée avec les routes /demo, /portfolio, /cv et /about.',
  'Validation terminal et architecture Browser -> Next -> API.'
]

const contactDetails = [
  'Bordeaux, France',
  'GitHub : raiderdelcastillo33-wq'
]

export default function CvPage() {
  const pdfPath = path.join(process.cwd(), 'public', 'cv', 'raider-cv.pdf')
  const hasPdf = existsSync(pdfPath)

  return (
    <main className="page-shell cv-page">
      <section className="page-intro">
        <span className="status-pill status-pill--success">CV professionnel</span>
        <h1>Curriculum vitae</h1>
        <p>
          Une présentation claire et professionnelle du profil, des compétences et des objectifs pour
          entrer en mode emploi sans toucher au système existant.
        </p>
      </section>

      <section className="cv-layout">
        <aside className="cv-sidebar">
          <div className="cv-sidebar__identity">
            <p className="result-eyebrow">Nom</p>
            <h2>Raider del Castillo</h2>
            <p className="cv-title">Développeur Frontend en formation avancée</p>
          </div>

          <div className="tag-row">
            {skills.slice(0, 6).map((skill) => (
              <span className="tech-pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>

          <div className="cv-download-card">
            {hasPdf ? (
              <a
                className="primary-button cv-download-button"
                download="raider-cv.pdf"
                href="/cv/raider-cv.pdf"
                rel="noreferrer"
                target="_blank"
              >
                Télécharger mon CV
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="secondary-button cv-download-button cv-download-button--placeholder"
                role="button"
              >
                Télécharger mon CV
              </span>
            )}
            <p className="cv-download-note">
              {hasPdf
                ? 'Version PDF prête au téléchargement.'
                : 'Espace déjà préparé pour connecter plus tard /public/cv/raider-cv.pdf.'}
            </p>
          </div>

          <div className="cv-contact-card">
            <p className="result-eyebrow">Contact</p>
            <ul className="bullet-list">
              {contactDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="cv-content">
          <article className="info-card cv-section">
            <p className="result-eyebrow">Profil</p>
            <h2>Profil</h2>
            <p>
              Développeur en progression, orienté architecture propre, interfaces modernes et intégration
              frontend/backend. Je construis des applications web avec Next.js, Node.js et TypeScript,
              avec une approche structurée et évolutive.
            </p>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Compétences</p>
            <h2>Compétences</h2>
            <ul className="bullet-list bullet-list--dense">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Projets</p>
            <h2>Projets</h2>
            <ul className="bullet-list">
              {projects.map((project) => (
                <li key={project}>{project}</li>
              ))}
            </ul>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Objectif professionnel</p>
            <h2>Objectif professionnel</h2>
            <p>
              Obtenir une opportunité en développement frontend ou full stack junior, avec une forte
              envie d&apos;apprendre, construire et évoluer dans une équipe sérieuse.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
