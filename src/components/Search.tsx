'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { IoIosSearch } from 'react-icons/io';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useDebounce } from '@/hooks/useDebounce';
import { usePolicies } from '@/hooks/usePolicies';
import {
  extractHighlightFromPolicy,
  highlightMatch,
} from '@/utils/extractHighlightFromPolicy';
import { useRouter } from 'next/navigation';

export function Search() {
  const rout = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 500);
  const containerRef = useRef<HTMLFormElement>(null);

  useClickOutside(containerRef, () => setOpen(false));

  const { data } = usePolicies(
    { search: debouncedValue },
    { enabled: !!debouncedValue },
  );

  useEffect(() => {
    if (data && data?.policies?.length > 0) setOpen(true);
    else setOpen(false);
  }, [data]);

  function activeFilterPolicys(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (debouncedValue) {
      setOpen(false);
      return rout.push(`/search?q=${debouncedValue}`);
    }
  }

  return (
    <form
      ref={containerRef}
      className="relative w-full m-auto flex items-center"
      onSubmit={activeFilterPolicys}
      aria-label="search-form"
    >
      <input
        type="text"
        placeholder="Buscar pelo tema"
        className={`text-letter-300 z-20 w-full p-4 px-6 pl-12 transition-all ${open ? 'rounded-t-3xl' : 'rounded-3xl'} outline-none bg-background-700 focus:shadow-xl`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() =>
          setOpen(data && data?.policies?.length > 0 ? true : false)
        }
      />

      {open && data && data?.policies?.length > 0 && (
        <div className="bg-background-700 px-6 py-5 scroll w-full max-h-[600px] overflow-y-auto shadow-md rounded-b-3xl absolute top-[100%]">
          {data.policies.map((policy, index) => (
            <a
              key={policy.slug}
              href={`/${policy.category.slug}/${policy.slug}`}
            >
              {index > 0 && (
                <div className="bg-background-400 w-full h-[1px] rounded-full my-6" />
              )}

              <h2 className="text-xl">
                {highlightMatch(policy.title, debouncedValue)}
              </h2>

              <p>{extractHighlightFromPolicy(policy, debouncedValue, 150)}</p>
            </a>
          ))}
        </div>
      )}

      <IoIosSearch
        className="absolute text-letter-300 left-2.5 z-30"
        size={30}
      />
    </form>
  );
}
