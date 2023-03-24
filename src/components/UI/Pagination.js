import { Pagination } from "react-bootstrap";

const AppPagination = (props) => {
    const totalRecords = props.totalRecords;
    const perPage = props.perPage;
    const numberOfPage = Math.ceil(totalRecords / perPage);
    const [, ...pages] = Array(numberOfPage + 1).keys();

    const paginationClickHandler = (value) => {
        let newPage = null;
        if (value === "first") {
            newPage = 1;
        } else if (value === "last") {
            newPage = numberOfPage;
        } else if (value === "prev") {
            if (props.currentPage > 1) {
                newPage = props.currentPage - 1;
            } else {
                newPage = props.currentPage;
            }
        } else if (value === "next") {
            if (props.currentPage < numberOfPage) {
                newPage = props.currentPage + 1;
            } else {
                newPage = props.currentPage;
            }
        } else {
            newPage = value;
        }

        if (newPage !== props.currentPage) {
            props.onChange(newPage);
        }
    };

    return (
        <Pagination>
            <Pagination.Item
                onClick={paginationClickHandler.bind(null, "first")}
                disabled={props.currentPage === 1}
            >
                First
            </Pagination.Item>
            <Pagination.Item
                onClick={paginationClickHandler.bind(null, "prev")}
                disabled={props.currentPage === 1}
            >
                Prev
            </Pagination.Item>

            {pages.map((page) => (
                <Pagination.Item
                    key={page}
                    onClick={paginationClickHandler.bind(null, page)}
                    active={page === props.currentPage}
                >
                    {page}
                </Pagination.Item>
            ))}

            <Pagination.Item
                onClick={paginationClickHandler.bind(null, "next")}
                disabled={props.currentPage === numberOfPage}
            >
                Next
            </Pagination.Item>
            <Pagination.Item
                onClick={paginationClickHandler.bind(null, "last")}
                disabled={props.currentPage === numberOfPage}
            >
                Last
            </Pagination.Item>
        </Pagination>
    );
};

export default AppPagination;
