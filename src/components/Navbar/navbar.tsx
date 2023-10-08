import Link from "next/link";
import "./navbar.scss";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__logo">tienlong.</Link>
      <ul className="navbar__list">
        <li className="navbar__list-item">
          <Link href="/services" className="navbar__list-item" style={{textDecoration: "none"}}>
            Dịch vụ
          </Link>
        </li>
        <li className="navbar__list-item">
          <Link href="/about" className="navbar__list-item" style={{textDecoration: "none"}}>
            Về chúng tôi
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
