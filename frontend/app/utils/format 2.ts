import { CatalogItem } from '../types'

export function formatTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

export function truncateMiddle(value: string, maxLength = 18): string {
  if (value.length <= maxLength) {
    return value
  }

  const startLength = Math.ceil((maxLength - 3) / 2)
  const endLength = Math.floor((maxLength - 3) / 2)

  return `${value.slice(0, startLength)}...${value.slice(-endLength)}`
}

export function formatLevel(level: CatalogItem['course']['level']): string {
  const labels: Record<CatalogItem['course']['level'], string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }

  return labels[level]
}

export function formatLessonType(type: string): string {
  return type
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
