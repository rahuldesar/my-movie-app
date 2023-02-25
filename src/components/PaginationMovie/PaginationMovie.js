import { Pagination } from "react-bootstrap";

import PAGINATION_SETTING from "constants/paginationSettings";

/**
 * @param  {Number} currentPage
 * @param  {Function} handlePageChange
 * ? Written with 'react-bootstrap v2.7'
 * ? Pagination for when data is updated using api and only partial data is fetched
 * ! Dont Use for when all data is fetched at once and pagination is required for data by splicing.
 */
const PaginationMovie = ({ currentPage, handlePageChange }) => {
  const paginationItemSize = PAGINATION_SETTING.SIZE;

  // * returns range for current page => 1: [1, 2, 3], 3: [1, 2, 3], 4: [4, 5, 6]
  const getRangeArray = (startingIndex, arraySize) => {
    let pageArr = [];
    let start = 1;

    while (start + arraySize - 1 < startingIndex) {
      start += arraySize;
    }

    const end = start + arraySize;
    for (let i = start; i < end; i++) {
      pageArr.push(i);
    }
    return pageArr;
  };

  // * Extract this to parent component and pass as prop if different components need different sized pagination items. i.e (1, 2, 3) || (1, 2, 3, 4, 5)
  const pageNumbers = getRangeArray(currentPage, paginationItemSize);

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
    </Pagination>
  );
};

export default PaginationMovie;
