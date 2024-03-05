import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDarkMode } from '../state/DarkModeContext';

const DarkModeToggler: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <label className="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]">
      <input
        type="checkbox"
        id="DarkModeToggle"
        className="peer sr-only"
        checked={!darkMode}
        onChange={toggleDarkMode}
      />

      <span
        className={`absolute inset-0 rounded-full bg-gray-300 transition ${darkMode ? 'peer-checked:bg-white' : 'peer-checked:bg-yellow-500'
          }`}
      ></span>

      <span
        className={`absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all flex items-center justify-center ${darkMode ? 'peer-checked:start-1' : 'peer-checked:start-6'
          }`}
      >
        {darkMode ? (
          <FontAwesomeIcon icon={faMoon} className="text-gray-700" />
        ) : (
          <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
        )}
      </span>
    </label>
  );
};

export default DarkModeToggler;
