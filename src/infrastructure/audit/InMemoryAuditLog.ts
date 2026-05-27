import type { AuditEvent } from '../../domain/audit/AuditEvent'

const DEFAULT_EVENT_LIMIT = 100
const INPUT_PREVIEW_LIMIT = 120

export class InMemoryAuditLog {
  private readonly events: AuditEvent[] = []

  constructor(private readonly eventLimit = DEFAULT_EVENT_LIMIT) {}

  record(event: AuditEvent): AuditEvent {
    const sanitizedEvent: AuditEvent = {
      ...event,
      actionExecuted: false,
      eventId: event.eventId ?? event.id,
      ...(event.inputPreview ? { inputPreview: this.sanitizePreview(event.inputPreview) } : {}),
      ...(event.summary ? { summary: this.sanitizePreview(event.summary) } : {}),
      ...(event.metadata ? { metadata: this.sanitizeMetadata(event.metadata) } : {})
    }

    this.events.push(sanitizedEvent)

    if (this.events.length > this.eventLimit) {
      this.events.splice(0, this.events.length - this.eventLimit)
    }

    return sanitizedEvent
  }

  list(): AuditEvent[] {
    return [...this.events]
  }

  clear(): void {
    this.events.length = 0
  }

  private sanitizeMetadata(metadata: Record<string, string | number | boolean>): Record<string, string | number | boolean> {
    return Object.fromEntries(
      Object.entries(metadata).map(([key, value]) => [
        key,
        typeof value === 'string' ? this.sanitizePreview(value) : value
      ])
    )
  }

  private sanitizePreview(value: string): string {
    const normalized = value.trim().replace(/\s+/g, ' ')
    const redacted = normalized
      .replace(/sk-[A-Za-z0-9_-]+/g, '[REDACTED]')
      .replace(/ghp_[A-Za-z0-9_]+/g, '[REDACTED]')
      .replace(/token\s*[:=]\s*[^,\s;]+/gi, 'token=[REDACTED]')
      .replace(/OPENAI_API_KEY\s*[:=]\s*[^,\s;]+/gi, 'OPENAI_API_KEY=[REDACTED]')
      .replace(/password\s*[:=]\s*[^,\s;]+/gi, 'password=[REDACTED]')
      .replace(/secret\s*[:=]\s*[^,\s;]+/gi, 'secret=[REDACTED]')

    return redacted.length > INPUT_PREVIEW_LIMIT ? `${redacted.slice(0, INPUT_PREVIEW_LIMIT - 3)}...` : redacted
  }
}
