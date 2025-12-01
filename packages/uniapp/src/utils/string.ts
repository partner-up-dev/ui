export function kebabCase(word: string): string {
  const newWord: string = word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  return newWord
}

export function snakeCase(word: string): string {
  const newWord: string = word
    .replace(/[A-Z]/g, function (match) {
      return '_' + match
    })
    .toLowerCase()
  return newWord
}
