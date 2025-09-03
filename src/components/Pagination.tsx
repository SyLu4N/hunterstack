'use client';
import { Fragment } from 'react';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

import Link from 'next/link';

interface Props {
  totalCountOfRegister: number | undefined;
  scroll?: boolean;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegister = 0,
  registerPerPage = 10,
  currentPage = 1,
  ...rest
}: Props) {
  const lastPage = Math.ceil(totalCountOfRegister / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
        currentPage,
        Math.min(currentPage + siblingsCount, lastPage),
      )
      : [];

  return (
    <div
      className="flex flex-col sm:flex-row justify-center items-center gap-6"
      {...rest}
    >
      <div className="flex flex-row gap-2">
        {previousPages.length > 0 && (
          <PaginationParagraph number={currentPage - 1} direction="previous" />
        )}

        {currentPage > 1 + siblingsCount && (
          <Fragment>
            <PaginationItem number={1} />

            {currentPage > 2 + siblingsCount && (
              <p className="text-letter-300 w-7 h-7 sm:w-8 sm:h-8 text-center">
                ...
              </p>
            )}
          </Fragment>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem key={page} number={page} />
          ))}

        <PaginationItem number={currentPage} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((page) => <PaginationItem key={page} number={page} />)}

        {currentPage + siblingsCount < lastPage && (
          <Fragment>
            {currentPage + 1 + siblingsCount < lastPage && (
              <p className="text-letter-300 text-center w-7 h-7 sm:w-8 sm:h-8">
                ...
              </p>
            )}

            <PaginationItem number={lastPage} />
          </Fragment>
        )}

        {nextPages.length > 0 && (
          <PaginationParagraph number={currentPage + 1} direction="next" />
        )}
      </div>
    </div>
  );
}

interface PaginationParagraph {
  number: number;
  direction: 'previous' | 'next';
}

function PaginationParagraph({ number, direction }: PaginationParagraph) {
  return (
    <Link
      href={`?page=${number}`}
      className="flex items-center text-letter-500 hover:bg-background-600 h-7 sm:h-8 cursor-pointer rounded-md p-2 text-sm"
    >
      {direction === 'previous' ? (
        <Fragment>
          <RiArrowLeftSLine className="mt-0.5" />
          Anterior
        </Fragment>
      ) : (
        <Fragment>
          Próximo
          <RiArrowRightSLine className="mt-0.5" />
        </Fragment>
      )}
    </Link>
  );
}

interface PaginationItem {
  number: number;
  isCurrent?: boolean;
}

function PaginationItem({ isCurrent = false, number }: PaginationItem) {
  if (isCurrent) {
    return (
      <button className="bg-background-700 border border-background-400 w-7 rounded-md text-letter-300 h-7 sm:w-8 sm:h-8 transition-all cursor-default text-sm">
        {number}
      </button>
    );
  }

  return (
    <Link href={`?page=${number}`}>
      <button className="rounded-md text-letter-500 w-7 h-7 sm:w-8 sm:h-8 transition-all text-sm hover:bg-background-600">
        {number}
      </button>
    </Link>
  );
}
