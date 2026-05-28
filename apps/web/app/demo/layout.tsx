import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Interactive demo for Humanity Guide OS, showing internal Next.js API routing, controlled responses, and safe fallback behavior.'
}

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children
}
