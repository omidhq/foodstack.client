import { useState, useEffect } from 'react';
import { PaginationProps } from './Pagination.types';

export default function Pagination({ pageNumber, maxPages}: PaginationProps) {

  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect( () => {
    pageNumber(currentPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentPage, pageNumber]);
  
  const updatePageNum = (newNum:number) => {
    newNum = newNum >= maxPages ? maxPages :
    newNum <= 1 ? 1 :
    newNum;
    setCurrentPage(newNum);
  }

  const incrementPage = () => updatePageNum(currentPage+1);
  const decrementPage = () => updatePageNum(currentPage-1);

  const getPageArr = () => {
    const buttonArr = [];
    for (var i = 1; i <= maxPages; ++i){
      buttonArr.push(
      <button 
        onClick={() => updatePageNum(i)}
        key={i}
        className={s_NumButton + " " + (i === currentPage ? s_ButtonActive : s_ButtonHover)}>
          {i}
      </button>
      )
    }
    return buttonArr;
  }

  const s_ButtonHover = `hover:bg-pink-400 hover:text-white`;
  const s_ButtonActive = `bg-pink-400 text-white`;
  const s_NumButton = "rounded-full w-7 h-7 m-1";
  const s_NavButton = "rounded-3xl px-2 w-1/4 overflow-hidden";

  return maxPages > 1 ? 
  (
    <div className='flex justify-center text-pink-400'>
      <button onClick={decrementPage} className={s_NavButton + " " + (currentPage <= 1 ? "invisible" : s_ButtonHover)}>
        &lt; Previous
      </button>
      <div className='flex w-1/2 justify-center'>
        {getPageArr()}
      </div>
      <button onClick={incrementPage} className={s_NavButton + " " + (currentPage >= maxPages ? "invisible" : s_ButtonHover)}>
        Next &gt;
      </button>
    </div>
  ) : 
  <></>
}
