import React from "react";
import { TbSortDescending } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const FilterOption = ({ showFilter, setShowFilter }) => {
  return (
    <div className="filter_options">
      <a className="filter_option_link" rel="noopener noreferrer">
        <TbSortDescending />
        <span>Sort</span>
      </a>
      <a
        className="filter_option_link"
        rel="noopener noreferrer"
        onClick={() => setShowFilter(prev => !prev)}
      >
        <CiFilter /> <span>Filter</span>{" "}
        {showFilter ? <RxCross2 className="filter_close_btn" /> : null}
        </a>
        </div>
  );
};

export default FilterOption;
