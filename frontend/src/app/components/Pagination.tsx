import React from 'react';

interface PaginationProps {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    onChange: (pageNumber: number) => void;
    nextPageText?: string;
    prevPageText?: string;
    firstPageText?: string;
    lastPageText?: string;
    itemClass?: string;
    linkClass?: string;
    activeClass?: string;
    activeLinkClass?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    onChange,
    nextPageText = "Next",
    prevPageText = "Prev",
    firstPageText = "1st",
    lastPageText = "Last",
    itemClass = "page-item",
    linkClass = "page-link",
    activeClass = "pageItemActive",
    activeLinkClass = "pageLinkActive"
}) => {
    const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className={`${itemClass} ${activePage === 1 ? 'disabled' : ''}`}>
                    <button className={linkClass} onClick={() => onChange(1)}>
                        {firstPageText}
                    </button>
                </li>
                <li className={`${itemClass} ${activePage === 1 ? 'disabled' : ''}`}>
                    <button className={linkClass} onClick={() => onChange(activePage - 1)}>
                        {prevPageText}
                    </button>
                </li>
                {pages.map(page => (
                    <li key={page} className={`${itemClass} ${activePage === page ? activeClass : ''}`}>
                        <button
                            className={`${linkClass} ${activePage === page ? activeLinkClass : ''}`}
                            onClick={() => onChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li className={`${itemClass} ${activePage === totalPages ? 'disabled' : ''}`}>
                    <button className={linkClass} onClick={() => onChange(activePage + 1)}>
                        {nextPageText}
                    </button>
                </li>
                <li className={`${itemClass} ${activePage === totalPages ? 'disabled' : ''}`}>
                    <button className={linkClass} onClick={() => onChange(totalPages)}>
                        {lastPageText}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;