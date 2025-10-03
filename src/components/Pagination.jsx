import style from './Pagination.module.css';

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const showPrevious = page > 1;
  const showNext = page < totalPages;

  return (
    <div className={style.pagination}>
      <button 
        disabled={!showPrevious} 
        onClick={() => onChange(page - 1)} 
        className={`${style.button} ${style.prevButton}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Previous
      </button>
      
      <div className={style.pageInfo}>
        <span className={style.currentPage}>{page}</span>
        <span className={style.totalPages}>of {totalPages}</span>
      </div>

      <button 
        disabled={!showNext} 
        onClick={() => onChange(page + 1)} 
        className={`${style.button} ${style.nextButton}`}
      >
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default Pagination;