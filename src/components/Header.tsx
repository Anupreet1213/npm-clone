import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="bg-white text-black shadow-md py-4 px-6">
      <div className="flex justify-around items-center flex-col md:flex-row">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold">
          <svg viewBox="0 0 780 250" width="60" height="20" aria-hidden="true">
            <path
              fill="#231F20"
              d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
            ></path>
          </svg>
        </Link>

        {/* Search box */}
        <SearchBar />

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <a
            href="https://docs.npmjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
