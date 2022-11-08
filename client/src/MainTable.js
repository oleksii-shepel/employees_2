import TableHeader from "./TableHeader";
import Table from "./Table";
import Pagination from "./Pagination";
import { useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { TableContext } from "./TableContext";
import logo from './logo.svg';

function MainTable() {
  const table = useContext(TableContext);

  const paginate = (pageNumber) => {
    table.setCurrentPage(pageNumber);
  }

  if (table.error) return;
  if (table.loading) return (
    <div>
      <div className="filler">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );

  return (
    <>
      <TableHeader></TableHeader>
      <Table data={table.data}></Table>
      <Pagination currentPage={table.currentPage} perPage={table.perPage} total={table.dataLength()} paginate={paginate}></Pagination>
    </>);
}

export default MainTable;
