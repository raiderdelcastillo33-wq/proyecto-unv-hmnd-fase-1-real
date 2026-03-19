function requireElement<T extends Element>(selector: string, parent: ParentNode = document): T {
  const element = parent.querySelector<T>(selector)

  if (!element) {
    throw new Error(`No se encontro el elemento requerido: ${selector}`)
  }

  return element
}

export interface ShellDom {
  heroStatusPillEl: HTMLSpanElement
  heroStatusCopyEl: HTMLParagraphElement
  systemServiceNameEl: HTMLElement
  currentUserChipEl: HTMLElement
  catalogStatusCopyEl: HTMLElement
  assistantUserStateEl: HTMLElement
  systemLastCheckEl: HTMLElement
}

export interface HealthDom {
  statusEl: HTMLParagraphElement
  metaEl: HTMLParagraphElement
  serviceDetailEl: HTMLElement
  visualDetailEl: HTMLElement
  calloutEl: HTMLDivElement
  button: HTMLButtonElement
}

export interface UserDom {
  form: HTMLFormElement
  submitButton: HTMLButtonElement
  emailInput: HTMLInputElement
  displayNameInput: HTMLInputElement
  feedbackCardEl: HTMLDivElement
  resultEl: HTMLParagraphElement
}

export interface CatalogDom {
  button: HTMLButtonElement
  outputEl: HTMLDivElement
  courseCountEl: HTMLElement
  moduleCountEl: HTMLElement
  lessonCountEl: HTMLElement
  resourceCountEl: HTMLElement
}

export interface AssistantDom {
  form: HTMLFormElement
  submitButton: HTMLButtonElement
  promptInput: HTMLInputElement
  responseCardEl: HTMLDivElement
  resultEl: HTMLParagraphElement
}

export interface AppDom {
  shell: ShellDom
  health: HealthDom
  user: UserDom
  catalog: CatalogDom
  assistant: AssistantDom
}

export function createAppDom(): AppDom {
  const userForm = requireElement<HTMLFormElement>('#user-form')
  const aiForm = requireElement<HTMLFormElement>('#ai-form')

  return {
    shell: {
      heroStatusPillEl: requireElement<HTMLSpanElement>('#hero-status-pill'),
      heroStatusCopyEl: requireElement<HTMLParagraphElement>('#hero-status-copy'),
      systemServiceNameEl: requireElement<HTMLElement>('#system-service-name'),
      currentUserChipEl: requireElement<HTMLElement>('#current-user-chip'),
      catalogStatusCopyEl: requireElement<HTMLElement>('#catalog-status-copy'),
      assistantUserStateEl: requireElement<HTMLElement>('#assistant-user-state'),
      systemLastCheckEl: requireElement<HTMLElement>('#system-last-check')
    },

    health: {
      statusEl: requireElement<HTMLParagraphElement>('#health-status'),
      metaEl: requireElement<HTMLParagraphElement>('#health-meta'),
      serviceDetailEl: requireElement<HTMLElement>('#health-service-detail'),
      visualDetailEl: requireElement<HTMLElement>('#health-visual-detail'),
      calloutEl: requireElement<HTMLDivElement>('.status-callout'),
      button: requireElement<HTMLButtonElement>('#refresh-health')
    },

    user: {
      form: userForm,
      submitButton: requireElement<HTMLButtonElement>('button[type="submit"]', userForm),
      emailInput: requireElement<HTMLInputElement>('#email'),
      displayNameInput: requireElement<HTMLInputElement>('#displayName'),
      feedbackCardEl: requireElement<HTMLDivElement>('.feedback-card'),
      resultEl: requireElement<HTMLParagraphElement>('#user-result')
    },

    catalog: {
      button: requireElement<HTMLButtonElement>('#load-catalog'),
      outputEl: requireElement<HTMLDivElement>('#catalog-output'),
      courseCountEl: requireElement<HTMLElement>('#catalog-course-count'),
      moduleCountEl: requireElement<HTMLElement>('#catalog-module-count'),
      lessonCountEl: requireElement<HTMLElement>('#catalog-lesson-count'),
      resourceCountEl: requireElement<HTMLElement>('#catalog-resource-count')
    },

    assistant: {
      form: aiForm,
      submitButton: requireElement<HTMLButtonElement>('button[type="submit"]', aiForm),
      promptInput: requireElement<HTMLInputElement>('#ai-prompt'),
      responseCardEl: requireElement<HTMLDivElement>('.assistant-response'),
      resultEl: requireElement<HTMLParagraphElement>('#ai-result')
    }
  }
}
