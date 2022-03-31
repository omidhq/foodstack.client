import { useState, useEffect } from 'react';
import { PaginationProps } from './Pagination.types';

export default function Pagination({ pageNumber, maxPages}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const incrementPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    pageNumber(nextPage);
  }

  const decrementPage = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
    pageNumber(previousPage);
  }

  return (
    <>
      {
        currentPage > 1 && <button onClick={decrementPage}>Previous</button>
      }
      {currentPage}
      {
        currentPage < maxPages && <button onClick={incrementPage}>Next</button>
      }
    </>
  )
}
