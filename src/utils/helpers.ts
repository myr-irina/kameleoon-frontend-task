export function cleanedUrl(url: string | undefined) {
  if (typeof url === 'string') {
    return url.replace(/^https?:\/\/(www\.)?/, '');
  }
  return '';
}

export function capitalizeLetter(str: string) {
  if (str.length > 3) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  } else {
    return str;
  }
}

export function sortByAlphabet<T>(
  items: T[],
  property: keyof T,
  order: 'ASC' | 'DESC' = 'ASC',
): T[] {
  return items.slice().sort((a, b) => {
    const propA = String(a[property]).toLowerCase();
    const propB = String(b[property]).toLowerCase();

    if (order === 'ASC') {
      return propA.localeCompare(propB);
    } else if (order === 'DESC') {
      return propB.localeCompare(propA);
    } else {
      throw new Error('Invalid order');
    }
  });
}
