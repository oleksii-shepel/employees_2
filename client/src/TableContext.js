import { createContext, useEffect, useState } from "react";

const TOKEN_URI = "https://abz-application.herokuapp.com/api/v1/token";
const USERS_URI = "https://abz-application.herokuapp.com/api/v1/users";

export function TableContextProvider(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(-1);

    const loadData = async (currentPage, perPage, offset) => {
        let queryParams = {};

        if (offset > 0) {
            queryParams = { offset: offset, count: perPage };
        }
        else {
            queryParams = { page: currentPage, count: perPage };
        }

        let url = new URL(USERS_URI);
        for (let k in queryParams) { url.searchParams.append(k, queryParams[k]); }

        setLoading(true);

        return fetch(TOKEN_URI)
            .then(response => {
                if (response.ok) return response.json();
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
                if (response.ok) return response.json();
                else throw new Error(`${response.status} ${response.statusText}`);
            })
            .then((value) => { setData(value); return value; })
            .then((data) => { console.log(data); return data; })
            .then((_) => { setLoading(false); return false; })
            .catch(error => { setError(error); setLoading(false); });
    }

    const dataAdded = async () => {
        await loadData(Math.ceil(dataLength() + 1 / perPage), perPage, offset);
        setCurrentPage(Math.ceil(dataLength() + 1 / perPage));
    }

    const dataLength = () => {
        return data.total_users;
    }

    const totalPages = () => {
        return data.total_pages;
    }

    useEffect(() => {
        (async ()=> {
            loadData(currentPage, perPage, offset);
        })();
    }, [currentPage, offset, perPage]);
    
    return (
        <TableContext.Provider value={{
            loading, setLoading,
            error, setError,
            data, setData,
            
            perPage, setPerPage,
            currentPage, setCurrentPage,
            offset, setOffset,
            loadData, dataAdded,
            dataLength, totalPages
        }}>
            {props.children}
        </TableContext.Provider>
    );
}

export const TableContext = createContext();