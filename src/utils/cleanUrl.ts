export function cleanedUrl(url: string | undefined) {
  return url?.replace(/^https?:\/\/(www\.)?/, '');
}

export function capitalizeLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
