import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Interactive demo for the AI Agent System, showing internal Next.js API routing and end-to-end request execution.'
}

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children
}
