import "./footer.css";

const Footer = () => {
  return (
    <footer className={`footer`}>
      <div className="footer-content">
        <div className="footer-column">
          <h3>Pages</h3>
          <ul>
            <li>
              <a href="#">Shopping Cart</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">My Account</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Top Products Categories</h3>
          <ul>
            <li>
              <a href="#">Jackets</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Coats</a>
            </li>
            <li>
              <a href="#">Shoes</a>
            </li>
            <li>
              <a href="#">Shirts</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Find Us</h3>
          <div className="footer-contact">
            <p>{"CheomYong's Market Inc."}</p>
            <p>Manila, Philippines</p>
            <p>091-2345-9868</p>
            <p>CMMarket18@gmail.com</p>
            <p>
              <a href="#">Check our Contact Page</a>
            </p>
          </div>
        </div>
        <div className="footer-column">
          <h3>Get the News</h3>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" required />
            <input type="submit" value="Subscribe" />
          </form>
          <h3>Keep In Touch</h3>
          <div className="social-icons">
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa fa-google"></i>
            </a>
            <a href="#">
              <i className="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {"Fastkart Inc - 2024. All rights reserved."}
      </div>
    </footer>
  );
};

export default Footer;
