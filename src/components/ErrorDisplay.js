import React from 'react'

export default function ErrorDisplay({err}) {
  console.log("ErrorDisplay", err)
  if (err === null || err.length === 0) {
    return null
  }

  return (
    <div>
      {err}
    </div>
  )
}
