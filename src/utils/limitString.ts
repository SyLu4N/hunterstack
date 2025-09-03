export function limitString(string: string | undefined, limit = 30) {
  if (!string) return;

  if (string.length <= limit) return string;

  const newValue = `${string.slice(0, limit)}...`;

  return newValue;
}
