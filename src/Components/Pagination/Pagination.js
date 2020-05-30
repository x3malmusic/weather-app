import React from "react";

import "./pagination.scss";

export const Pagination = ({ setPage, pageNumber, day }) => {
  return (
    <div className="pagination-wrapper">
      <a
        href="!#"
        onClick={(e) => setPage(e, pageNumber)}
        className="pagination"
      >
        {day}
      </a>
    </div>
  );
};
