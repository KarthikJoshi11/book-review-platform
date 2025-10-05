export default function Pagination({ page, pages, onChange }) {
    return (
      <div className="flex gap-2">
        <button disabled={page<=1} onClick={()=>onChange(page-1)}>Prev</button>
        <span>{page} / {pages}</span>
        <button disabled={page>=pages} onClick={()=>onChange(page+1)}>Next</button>
      </div>
    );
  }
  