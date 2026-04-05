"use client"

import { useEffect } from "react"

type Props = {
  url: string
  identifier: string
}

export default function DisqusComments({ url, identifier }: Props) {
  useEffect(() => {
    if ((window as any).DISQUS) return

    const d = document

    ;(window as any).disqus_config = function () {
      this.page.url = url
      this.page.identifier = identifier
    }

    const s = d.createElement("script")
    s.src = "https://raiderblog-disqus-com.disqus.com/embed.js"
    s.setAttribute("data-timestamp", Date.now().toString())

    d.body.appendChild(s)
  }, [url, identifier])

  return <div id="disqus_thread" />
}