import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Mon Site</h1>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
