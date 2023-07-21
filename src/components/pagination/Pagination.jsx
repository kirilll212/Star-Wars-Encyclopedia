import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalEntries, entriesPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <BootstrapPagination>
      <BootstrapPagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((pageNumber) => (
        <BootstrapPagination.Item
          key={pageNumber}
          active={currentPage === pageNumber}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  );
};

export default Pagination;