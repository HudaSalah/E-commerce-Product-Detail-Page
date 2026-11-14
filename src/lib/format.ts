export function cleanDescription(html: string): string {
  return html.replace(/<p><br><\/p>/g, '')
}


export function toPlainText(html: string): string {
  const spaced = html.replace(/<\/(li|p)>/g, '. ')
  const doc = new DOMParser().parseFromString(spaced, 'text/html')
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}