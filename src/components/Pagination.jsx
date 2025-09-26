import style from './Pagination.module.css';

function Pagination({ page, totalPages, onChange }) {
 
  if (totalPages <= 1) return null;

  return (
    <div className={style.pagination}>
      <button  disabled={page === 1} onClick={() => onChange(page - 1)} className={style.prevButton}>
        Prev
      </button>
      <span className={style.pageInfo}>
        Page {page} of {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)} className={style.nextButton}>
        Next
      </button>
    </div>
  );
}
export default Pagination;
