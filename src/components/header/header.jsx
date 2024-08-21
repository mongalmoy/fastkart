import './header.css';

const Header = () => {
  return (
    <div className="header">
      <button className="welcome flexbox">Welcome</button>
      <div className="header_links">
        <button className="header_item">Register</button>
        <button className="header_item">Go to Cart</button>
        <button className="header_item">My Account</button>
        <button className="header_item">Login</button>
      </div>
    </div>
  );
};

export default Header;
