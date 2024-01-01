import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { RxBorderDotted } from "react-icons/rx";
import "./style.css";

export default function Pagination({
  page,
  setPage,
  totalCount,
  totalPages,
  setPerPage,
  perPage,
  options,
}) {
  const pagesArray = [...Array(totalPages).keys()];

  const handlePreviousBtn = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextBtn = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleBtn = (e) => {
    setPage(e);
  };

  const handlePerPage = (e) => {
    setPerPage(Number(e.target.value));
  };

  console.log("page", page);

  const handleMoreThenFour = () => {
    return (
      <>
        <button
          className={page === 1 ? "active_page_btn" : "page_btn"}
          onClick={() => handleBtn(1)}
        >
          1
        </button>
        <button
          className={page === 2 ? "active_page_btn" : "page_btn"}
          onClick={() => handleBtn(2)}
        >
          2
        </button>

        <div
          className="dot_btns"
          style={{ display: page > 3 ? "flex" : "none" }}
        >
          <RxBorderDotted />
        </div>

        <button
          className={
            page >= 3 && page !== totalPages ? "active_page_btn" : "page_btn"
          }
          onClick={() =>
            handleBtn(
              page < 3 ? 3 : page === totalPages ? totalPages - 1 : page
            )
          }
        >
          {page < 3 ? 3 : page === totalPages ? totalPages - 1 : page}
        </button>

        <div
          className="dot_btns"
          style={{ display: page > totalPages - 2 ? "none" : "flex" }}
        >
          <RxBorderDotted />
        </div>

        <button
          className={page === totalPages ? "active_page_btn" : "page_btn"}
          onClick={() => handleBtn(totalPages)}
        >
          {totalPages > 3 ? totalPages : 4}
        </button>
      </>
    );
  };

  return (
    <div className="pagination_box">
      <div className="pagination_select_row"></div>
      <div className="pagination_row">
        <button className="page_btn" onClick={handlePreviousBtn}>
          <GrPrevious className="pagination_icon" />
        </button>
        {pagesArray.length <= 4
          ? pagesArray.map((item, index) => {
              return (
                <button
                  className={
                    index + 1 === page ? "active_page_btn" : "page_btn"
                  }
                  key={index}
                  onClick={() => handleBtn(index + 1)}
                >
                  {index + 1}
                </button>
              );
            })
          : handleMoreThenFour()}

        <button className="page_btn" onClick={handleNextBtn}>
          <GrNext className="pagination_icon" />
        </button>
      </div>

      <div className="pagination_select_row">
        <div className="per_page_div">
          Per Page
          <select onChange={handlePerPage} value={perPage}>
            {options.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div className="per_page_div">
          Total <div>{totalCount}</div>
        </div>
      </div>
    </div>
  );
}
