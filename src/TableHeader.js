import './App.css';

function TableHeader({totalPages, currentPage, perPage, offset, offsetChanged, currentPageChanged, perPageChanged }) {
    const calcCurrentPage = (value) => {
        value = value <= 0 ? 1 : value;
        value = value <= totalPages ? value : totalPages;
        currentPageChanged(value);
    }

  return (
    <>
        <label forhtml="currentPage" className="form-label">Current Page</label>
        <div className="current-page-input-control">
          <button onClick={() => { currentPageChanged(currentPage <= 1 ? 1 : currentPage - 1) }}>&#10216;&#10216;</button>
          <input id="currentPage" className="form-control" type="number" value={currentPage} onChange={(event) => { calcCurrentPage(+event.target.value) }}></input>
          <button onClick={() => { currentPageChanged(currentPage < totalPages ? currentPage + 1 : currentPage) }}>&#10217;&#10217;</button>
        </div>
        <label forhtml="perPage" className="form-label">Per page</label>
        <input id="perPage" className="form-control" type="number" value={perPage} onChange={(event) => { perPageChanged(+event.target.value) }}></input>

        <label forhtml="offset" className="form-label">Offset</label>
        <input id="offset" className="form-control" type="number" value={offset} onChange={(event) => { offsetChanged(+event.target.value) }}></input>
    </>
  );
}

export default TableHeader;
