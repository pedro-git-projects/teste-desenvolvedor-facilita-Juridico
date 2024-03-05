import NavLinks from "./Navlinks"
import MobileMenu from "./MobileMenu"
import DarkModeToggler from "../ui/DarkModeToggler";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  < header >
    <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8 mt-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex items-center gap-8">
        <Link to="/" className="block">
          <span className="sr-only">Home</span>
          <img src={reactLogo} className="logo" alt="Vite logo" />
        </Link>
        <NavLinks />
      </div>
      <div className="flex items-center gap-4">
        <DarkModeToggler />
        <MobileMenu />
      </div>
    </div>
  </header >
)

export default Header;
