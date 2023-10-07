export function TitleCase(str) {
  let formatted = ""
  let first = true
  for (let i = 0; i < str.length; i++) {
    let ch = str.charAt(i)
    if (first) {
      ch = ch.toUpperCase()
      first = false
    }

    if ((ch === ' ') || (ch === '\t') || (ch === '\n') || ch === '\r' || ch === '-' || ch === '_') {
      first = true
    }

    formatted += ch
  }

  return formatted
}

