import "@/styles/component/productfilter/productfilter.css";

const ProductFilter = () => {
  return (
    <div className="product_category">
      <div className="category-box">
        <h3 className="category-title">Products Categories</h3>
        <ul className="category-list">
          <li>
            <a href="#">Jackets</a>
          </li>
          <li>
            <a href="#">Accessories</a>
          </li>
          <li>
            <a href="#">Shoes</a>
          </li>
          <li>
            <a href="#">Coats</a>
          </li>
          <li>
            <a href="#">Shirts</a>
          </li>
        </ul>
      </div>
      <div className="category-box">
        <h3 className="category-title">Categories</h3>
        <ul className="category-list">
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductFilter;
