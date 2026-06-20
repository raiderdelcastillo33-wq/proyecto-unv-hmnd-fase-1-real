import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { captionFromFilename, galleryPublicUrl, listGalleryImageFiles } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Parcours visuel',
  description: 'Chronologie visuelle de l’apprentissage, de la construction et de l’évolution de Humanity Guide OS.'
}

const visualJourney = [
  {
    step: '01',
    title: 'Apprentissage Holberton',
    description: 'Les bases techniques, les exercices, les projets et les étapes qui construisent progressivement le profil Full Stack.'
  },
  {
    step: '02',
    title: 'Humanity Guide OS',
    description: 'L’évolution d’une idée personnelle vers un système centré sur l’apprentissage, la planification et la clarté.'
  },
  {
    step: '03',
    title: 'Private AI Lab',
    description: 'La recherche autour de la gouvernance, des propositions contrôlées, de l’approbation humaine et des simulations sûres.'
  },
  {
    step: '04',
    title: 'Personal Life OS',
    description: 'Une vision plus calme de l’organisation quotidienne : priorités, projets, documents, souvenirs et croissance.'
  },
  {
    step: '05',
    title: 'Architecture',
    description: 'Les diagrammes et flux qui rendent visibles les décisions techniques, les limites et la structure du produit.'
  },
  {
    step: '06',
    title: 'Future communauté',
    description: 'Un espace futur pour raconter l’apprentissage en public et partager l’évolution du projet sans prétendre qu’une communauté active existe déjà.'
  }
]

const comingAssets = [
  'Captures d’écran',
  'Diagrammes',
  'Flux produit',
  'Visuels portfolio',
  'Moments d’apprentissage'
]

const galleryPurpose = [
  {
    title: 'Montrer l’évolution',
    description: 'Conserver une trace visuelle du passage entre apprentissage, expérimentation et construction produit.'
  },
  {
    title: 'Aider les recruteurs',
    description: 'Rendre le projet plus facile à comprendre rapidement grâce à des preuves visuelles et contextualisées.'
  },
  {
    title: 'Préparer le récit public',
    description: 'Créer une base pour de futurs contenus autour du build in public, sans inventer de campagne ou d’assets existants.'
  }
]

export default async function GalleryPage() {
  const files = await listGalleryImageFiles()
  const items = files.map((filename) => {
    const caption = captionFromFilename(filename)

    return {
      src: galleryPublicUrl(filename),
      alt: caption,
      description: caption
    }
  })

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">UNV-HMND · Visual Journey</span>
          <h1>Le projet raconté par étapes</h1>
          <p>
            Une chronologie visuelle de l’apprentissage, des idées et des systèmes qui façonnent Humanity Guide OS.
            Les futurs médias apparaîtront ici lorsqu’ils seront réellement disponibles.
          </p>

          <div className="tag-row">
            <span className="tech-pill">Parcours d’apprentissage</span>
            <span className="tech-pill">Évolution produit</span>
            <span className="tech-pill">Architecture visuelle</span>
            <span className="tech-pill">Build in public futur</span>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">État de la galerie</p>
          <h2>{items.length > 0 ? `${items.length} visuel${items.length > 1 ? 's' : ''} disponible${items.length > 1 ? 's' : ''}` : 'Collection en préparation'}</h2>
          <p className="meta-text">
            {items.length > 0
              ? 'Les assets disponibles sont présentés plus bas avec leur contexte.'
              : 'Aucune image n’est publiée pour le moment. Les cartes ci-dessous décrivent le parcours prévu sans inventer de contenu.'}
          </p>
          <div className="response-meta">
            <span className="info-chip">Assets locaux uniquement</span>
            <span className="info-chip">Aucune image externe</span>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="journey-heading">
        <div className="section-head">
          <p className="result-eyebrow">Parcours visuel</p>
          <h2 className="section-title" id="journey-heading">De l’apprentissage à une vision produit</h2>
          <p>Chaque étape pourra accueillir de vrais visuels à mesure que le projet et sa documentation évoluent.</p>
        </div>

        <div className="timeline-grid">
          {visualJourney.map((item) => (
            <article className="timeline-card" key={item.step}>
              <span className="step-index">{item.step}</span>
              <p className="result-eyebrow">Emplacement visuel futur</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {items.length > 0 ? (
        <section className="section-block" aria-labelledby="available-assets-heading">
          <div className="section-head">
            <p className="result-eyebrow">Assets disponibles</p>
            <h2 className="section-title" id="available-assets-heading">Visuels actuels du projet</h2>
          </div>
          <GalleryGrid items={items} />
        </section>
      ) : (
        <section className="section-block presentation-band" aria-labelledby="coming-assets-heading">
          <div className="section-head">
            <p className="result-eyebrow">Prochains assets visuels</p>
            <h2 className="section-title" id="coming-assets-heading">Une collection qui grandira avec le projet</h2>
            <p>Ces formats sont prévus comme possibilités éditoriales. Aucun asset n’est présenté comme déjà disponible.</p>
          </div>
          <div className="tag-row">
            {comingAssets.map((asset) => (
              <span className="tech-pill" key={asset}>{asset}</span>
            ))}
          </div>
        </section>
      )}

      <section className="section-block" aria-labelledby="gallery-purpose-heading">
        <div className="section-head">
          <p className="result-eyebrow">Pourquoi cette galerie existe</p>
          <h2 className="section-title" id="gallery-purpose-heading">Rendre le parcours compréhensible en un regard</h2>
        </div>

        <div className="signal-grid">
          {galleryPurpose.map((item) => (
            <article className="signal-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
