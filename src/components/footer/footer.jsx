import "@/styles/component/footer/footer.css";
import {
  FaEnvelope,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { footerData } from "@/data/footer/footer";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  const page = footerData.page;
  const productCategories = footerData.productCategories;
  const findUs = footerData.findUs;

  return (
    <footer className={`footer`}>
      <div className="footer-content">
        <div className="footer-column">
          <h3>{page.heading}</h3>
          <ul>
            {page.list.map((el) => (
              <li key={el.name.toString()}>
                <a href="#">{el.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column">
          <h3>{productCategories.heading}</h3>
          <ul>
            {productCategories.list.map((el) => (
              <li key={el.name.toString()}>
                <a href="#">{el.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column">
          <h3>{findUs.heading}</h3>
          <div className="footer-contact">
            {findUs.list.map((el) => (
              <p key={el.name.toString()}>{el.name}</p>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <NewsLetter />

          <div className="social-icons">
            <a href="#">
              <FaGithub />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaGoogle />
            </a>
            <a href="#">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {"Made with"} &#x2764;&#xfe0f; {"by Mongalmoy Karmakar."} &copy;2024
      </div>
    </footer>
  );
};

export default Footer;
