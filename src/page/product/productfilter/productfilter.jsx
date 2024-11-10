import { productFilter } from "@/data/product/products";
import "@/styles/component/productfilter/productfilter.css";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const ProductFilter = ({
  inputText,
  handleInputChange,
  handleEraseInput,
  handleFilter,
  handleFilterByGender,
}) => {
  const { productCategories, categories, filterCategories=[] } = productFilter;

  return (
    <>
      <div className="input_text">
        {inputText && (
          <div className="cross_cont" onClick={handleEraseInput}>
            <RxCross2 />
          </div>
        )}
        <div className="search_icon_cont">
          <CiSearch />
        </div>
        <input
          placeholder="Search Items"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div className="category-box">
        <h3 className="category-title">Products Categories</h3>
        <ul className="category-list">
          {productCategories.map((el) => (
            <li
              key={el.toString() + Math.random()}
              onClick={() => handleFilter(el.value)}
            >
              <b>{el.name}</b>
            </li>
          ))}
        </ul>
      </div>
      <div className="category-box">
        <h3 className="category-title">Categories</h3>
        <ul className="category-list">
          {categories.map((el) => (
            <li
              key={el.toString() + Math.random()}
              onClick={() => handleFilterByGender(el.value)}
            >
              <b>{el.name}</b>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductFilter;
