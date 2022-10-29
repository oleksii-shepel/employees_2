import { useContext } from 'react';
import './App.css';
import { TableContext } from './TableContext';

function TableHeader() {
  const table = useContext(TableContext);

  return (
    <>
      <label forhtml="currentPage" className="form-label">Current Page</label>
      <div className="current-page-input-control">
        <button onClick={() => { table.setCurrentPage(table.currentPage <= 1 ? 1 : table.currentPage - 1); }}>&#10216;&#10216;</button>
        <input id="currentPage" className="form-control" type="number" value={table.currentPage} onChange={(event) => { 
          let value = +event.target.value;
          value = value <= 0 ? 1 : value;
          value = value <= table.totalPages() ? value : table.totalPages();
          table.setCurrentPage(value);
          }}></input>
        <button onClick={() => { table.setCurrentPage(table.currentPage < table.totalPages() ? table.currentPage + 1 : table.currentPage); }}>&#10217;&#10217;</button>
      </div>
      <label forhtml="perPage" className="form-label">Per page</label>
      <input id="perPage" className="form-control" type="number" value={table.perPage} onChange={(event) => { table.setPerPage(+event.target.value); }}></input>

      <label forhtml="offset" className="form-label">Offset</label>
      <input id="offset" className="form-control" type="number" value={table.offset} onChange={(event) => { table.setOffset(+event.target.value); }}></input>
    </>
  );
}

export default TableHeader;
