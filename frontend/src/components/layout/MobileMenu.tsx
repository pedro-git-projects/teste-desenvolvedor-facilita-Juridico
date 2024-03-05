import { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileMenu: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="block rounded p-2.5 transition  md:hidden  text-gray-500 dark:text-gray-400"
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {showMobileMenu && (
        <div className="md:hidden absolute top-16 right-0 w-full z-10 flex flex-col items-center justify-center bg-white rounded-lg dark:bg-gray-800">
          <ul className="space-y-1 text-sm font-medium text-gray-500 dark:text-gray-400 items-center">
            <li>
              <Link
                to="/consultar"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-center"
                onClick={toggleMobileMenu}
              >
                Consultar
              </Link>
            </li>
            <li>
              <Link
                to="/cadastrar"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-center"
                onClick={toggleMobileMenu}
              >
                Cadastrar
              </Link>
            </li>
            <li>
              <Link
                to="/rotas"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-center"
                onClick={toggleMobileMenu}
              >
                Rotas
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
