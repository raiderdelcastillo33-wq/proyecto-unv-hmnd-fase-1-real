import { existsSync } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'

const recruiterResources = [
  {
    title: 'Portfolio',
    description: 'Projets, stack technique, méthode de travail et parcours d’apprentissage.',
    href: '/portfolio',
    label: 'Voir le portfolio'
  },
  {
    title: 'Architecture overview',
    description: 'Principes governance-first, limites actuelles et séparation entre présent et futur.',
    href: '/about',
    label: 'Explorer l’architecture'
  },
  {
    title: 'Public AI Demo',
    description: 'Couche conversationnelle publique avec rôles spécialisés, runtime visible et fallback sûr.',
    href: '/demo',
    label: 'Tester la démo'
  },
  {
    title: 'Private AI Lab',
    description: 'Simulations, propositions contrôlées, approbation humaine et audit en mémoire.',
    href: '/lab',
    label: 'Ouvrir le laboratoire'
  }
]

const contactPlaceholders = ['GitHub', 'LinkedIn', 'Email']

export default function DownloadPage() {
  const pdfPath = path.join(process.cwd(), 'public', 'cv', 'raider-cv.pdf')
  const hasPdf = existsSync(pdfPath)

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Download & Recruiter Packet</span>
          <h1>Les ressources essentielles du projet</h1>
          <p>
            Un point d’entrée simple pour consulter le profil, les projets, l’architecture et les expériences
            interactives de Humanity Guide OS.
          </p>

          <div className="tag-row">
            <span className="tech-pill">Profil junior Full Stack</span>
            <span className="tech-pill">Holberton</span>
            <span className="tech-pill">Human-centered AI</span>
            <span className="tech-pill">Governance-first</span>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">CV</p>
          <h2>{hasPdf ? 'CV PDF disponible' : 'Profil web disponible'}</h2>
          <p className="meta-text">
            {hasPdf
              ? 'Le document PDF peut être téléchargé directement. La page CV reste disponible pour une lecture web.'
              : 'Aucun PDF final n’est publié actuellement. La page CV présente le profil sans inventer de fichier téléchargeable.'}
          </p>
          <div className="hero-actions">
            {hasPdf ? (
              <a className="primary-button" download="raider-cv.pdf" href="/cv/raider-cv.pdf">
                Télécharger le CV
              </a>
            ) : null}
            <Link className={hasPdf ? 'secondary-button' : 'primary-button'} href="/cv">
              Consulter le CV
            </Link>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="packet-heading">
        <div className="section-head">
          <p className="result-eyebrow">Recruiter packet</p>
          <h2 className="section-title" id="packet-heading">Comprendre rapidement le profil et le produit</h2>
          <p>Chaque ressource correspond à une page existante et vérifiable du projet.</p>
        </div>

        <div className="showcase-grid">
          {recruiterResources.map((resource) => (
            <article className="showcase-card" key={resource.href}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <Link className="secondary-button" href={resource.href}>
                {resource.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="github-heading">
        <article className="story-card">
          <div>
            <p className="result-eyebrow">GitHub & contact · Placeholders</p>
            <h2 className="section-title" id="github-heading">Présence professionnelle en préparation</h2>
            <p>
              Les liens publics seront connectés lorsqu’ils seront confirmés. Aucun profil ou moyen de contact
              externe n’est inventé ici.
            </p>
          </div>

          <nav className="story-card__actions" aria-label="Liens professionnels à venir">
            {contactPlaceholders.map((item) => (
              <a aria-label={`${item} — lien à venir`} className="tech-pill" href="#" key={item}>
                {item}
              </a>
            ))}
          </nav>
        </article>
      </section>
    </main>
  )
}
