"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [health, setHealth] = useState("")
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v1/health`)
      .then(response => response.json())
      .then(data => setHealth(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <main>
      Howdy
      <pre>{JSON.stringify(health)}</pre>
    </main>
  )
}
