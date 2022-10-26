import TableHeader from "./TableHeader";
import Table from "./Table";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

const TOKEN_URI = "https://abz-application.herokuapp.com/api/v1/token";
const USERS_URI = "https://abz-application.herokuapp.com/api/v1/users";

export function useFetch(uri, params) {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (!uri) return;
      let url = new URL(uri);
      for (let k in params) { url.searchParams.append(k, params[k]); }

      setLoading(true);

      fetch(TOKEN_URI)
          .then(response => {
            if(response.ok) return response.json();
            else throw new Error(`${response.status} ${response.statusText}`);
          })
          .then((response) => {
              return response.token;
          })
          .then(token => {
              return fetch(url, {
                  method: 'get',
                  headers: new Headers({
                      'Authorization': 'Bearer ' + token,
                      'Content-Type': 'application/json'
                  })
              });
          })
          .then(response => { 
            if(response.ok) return response.json();
            else throw new Error(`${response.status} ${response.statusText}`);
           })
          .then((value) => { setData(value); return value; })
          .then((value) => { console.log(value); })
          .then(() => setLoading(false))
          .catch(error => {setError(error); setLoading(false);});
  }, [uri, params]);

  return {
      loading,
      data,
      error
  };
}


function MainTable({userAdded}) {
  const [params, setParams] = useState({});
  const [offset, setOffset] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const {data, error} = useFetch(USERS_URI, params);

  useEffect(() => {
    let newQueryParams = {};

    if (offset > 0) {
      newQueryParams = { offset: offset, count: perPage };
    }
    else {
      newQueryParams = { page: currentPage, count: perPage };
    }
 
    setParams(newQueryParams);
  }, [offset, currentPage, perPage, userAdded]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const changeOffset = (value) => {
    setOffset(value);
  }
  
  const changePerPage = (value) => {
    setPerPage(value);
  }

  const changeCurrentPage = (value) => {
    setCurrentPage(value);
  }

  if (error) return;

  return (
    <>
      <TableHeader totalPages={data.total_pages} 
          currentPage={currentPage}
          perPage={perPage}
          offset={offset}
          offsetChanged={changeOffset}
          perPageChanged={changePerPage}
          currentPageChanged={changeCurrentPage}></TableHeader>
      <Table data={data}></Table>
      <Pagination perPage={data.count} total={data.total_users} paginate={paginate}></Pagination>
    </>);
}

export default MainTable;
