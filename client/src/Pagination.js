import React from 'react';

const Pagination = ({perPage, total, paginate}) => {
    const pageNumbers = [];

    if(!perPage || !total || !paginate) {
        return;
    }

    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i);
    }

    return (<nav>
        <ul className="pagination">
        {!!pageNumbers && pageNumbers.map(number =>
            (<li key={number} className="page-item">
                <button onClick={() => paginate(number)} className="page-link">
                    {number}
                </button>
            </li>)
        )}
        </ul>
    </nav>);
}

export default Pagination;