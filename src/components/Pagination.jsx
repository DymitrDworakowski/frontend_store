import style from './Pagination.module.css';
import { ReactComponent as ArrowLeft } from '../assets/svg/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../assets/svg/arrow-right.svg';

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
        <ArrowLeft width={16} height={16} />
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
        <ArrowRight width={16} height={16} />
      </button>
    </div>
  );
}

export default Pagination;