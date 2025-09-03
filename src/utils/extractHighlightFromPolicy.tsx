import { Policy } from '@/@types/Policy';

import { limitString } from './limitString';

const normalizeText = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);
  const regex = new RegExp(normalizedQuery, 'gi');

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(normalizedText)) !== null) {
    const start = match.index;
    const end = start + match[0].length;

    parts.push(text.slice(lastIndex, start));
    parts.push(
      <mark key={lastIndex} className="bg-primary-300 text-black">
        {text.slice(start, end)}
      </mark>,
    );

    lastIndex = end;
  }

  parts.push(text.slice(lastIndex));
  return parts;
}

export function extractHighlightFromPolicy(
  policy: Policy,
  query: string,
  length = 150,
) {
  if (!query) return limitString(policy.summary, length);

  const fields = [policy.summary, policy.description];
  const fieldWithMatch = fields.find(
    (f) => f && normalizeText(f).includes(normalizeText(query)),
  );

  if (!fieldWithMatch) return limitString(policy.summary, length);

  const normalizedText = normalizeText(fieldWithMatch);
  const normalizedQuery = normalizeText(query);
  const index = normalizedText.indexOf(normalizedQuery);

  const start = Math.max(0, index - Math.floor(length / 2));
  const end = Math.min(fieldWithMatch.length, start + length);
  const snippet = fieldWithMatch.slice(start, end);

  return highlightMatch(snippet, query); // ✅ função normal, não hook
}
