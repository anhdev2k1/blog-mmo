import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import './footer.scss'
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__circle"></div>
      <div className="footer__circle2"></div>
      <div className="footer__info">
        <h3 className="footer__info-logo">tienlong.</h3>
        <p className="footer__info-desc">
          Tiến Long Media chuyên cung cấp các dịch vụ mạng xã hội như: Facebook,
          Youtube, Google, Instagram,... <br />
          Liên hệ / Zalo : 070.336.3333 <br />
          Điện thoại : 088.853.5288 <br />
          Facebook : Nguyễn Tiến Long
        </p>
      </div>
      <div className="footer__list">
        <div className="footer__list-item">
          <span className="footer__item-heading">Navigation</span>
          <Link href="/services">Services</Link>
          <Link href="/about">About us</Link>
        </div>
        <div className="footer__list-item">
          <span className="footer__item-heading">Licence</span>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Copyright</Link>
          <Link href="#">Email Address</Link>
        </div>
        <div className="footer__list-item">
          <span className="footer__item-heading">Contact</span>
          <Link href="/services">
            <FontAwesomeIcon icon={faPhone} /> 070.336.3333
          </Link>
          <Link href="/services">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
