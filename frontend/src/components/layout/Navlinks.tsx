import { Link } from 'react-router-dom';

const NavLinks: React.FC = () => {
  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        <li>
          <Link to="/consultar">Consultar</Link>
        </li>
        <li>
          <Link to="/cadastarar">Cadastrar</Link>
        </li>
        <li>
          <Link to="/rotas">Rotas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
