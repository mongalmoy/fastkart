import React from "react";
import { TbSortDescending } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";

const FilterOption = () => {
  return (
    <div className="filter_options">
      <a className="filter_option_link" rel="noopener noreferrer">
        <TbSortDescending />
        <span>Sort</span>
      </a>
      <a className="filter_option_link" rel="noopener noreferrer">
        <CiFilter /> <span>Filter</span>
      </a>
    </div>
  );
};

export default FilterOption;
