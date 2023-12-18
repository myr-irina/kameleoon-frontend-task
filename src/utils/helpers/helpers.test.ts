import { cleanedUrl, capitalizeLetter, sortByAlphabet } from './helpers';

describe('cleanedUrl function', () => {
  it('should remove http/https and www prefixes in URLs', () => {
    expect(cleanedUrl('https://www.example.com')).toBe('example.com');
    expect(cleanedUrl('www.example.com')).toBe('example.com');
    expect(cleanedUrl('http://subdomain.example.com')).toBe(
      'subdomain.example.com',
    );

    expect(cleanedUrl(undefined)).toBe('');
  });
});

describe('capitalizeLetter function', () => {
  it('should capitalize the first letter if the string length is greater than 3', () => {
    expect(capitalizeLetter('hello')).toBe('Hello');
    expect(capitalizeLetter('a')).toBe('a');
    expect(capitalizeLetter('GOODBYE')).toBe('Goodbye');
  });
});

describe('sortByAlphabet function', () => {
  const items = [
    { name: 'John' },
    { name: 'Alice' },
    { name: 'Zack' },
    { name: 'bob' },
  ];

  it('should sort items alphabetically by property in ascending order', () => {
    const sorted = sortByAlphabet(items, 'name');
    expect(sorted).toEqual([
      { name: 'Alice' },
      { name: 'bob' },
      { name: 'John' },
      { name: 'Zack' },
    ]);
  });

  it('should sort items alphabetically by property in descending order', () => {
    const sorted = sortByAlphabet(items, 'name', 'DESC');
    expect(sorted).toEqual([
      { name: 'Zack' },
      { name: 'John' },
      { name: 'bob' },
      { name: 'Alice' },
    ]);
  });
});
