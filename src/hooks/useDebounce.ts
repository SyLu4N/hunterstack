import { useState, useEffect } from 'react';

export function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value.length < 3) return setDebouncedValue('');
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // limpa timeout se o valor mudar antes do delay
  }, [value, delay]);

  return debouncedValue;
}
