import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({ type, name, value, onChange, placeholder, label }) => {
  const { theme } = useContext(ThemeContext);
  const [themes, setThemes] = useState(theme);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setThemes(theme);
  }, [theme]);

  const inputStyles =
    themes === 'dark'
      ? 'border-gray-600 bg-zinc-800 text-white'
      : 'border-gray-300 bg-white text-black';

  const labelStyles = themes === 'dark' ? 'text-white' : 'text-gray-900';

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="manrope-regular flex flex-col space-y-2 w-full">
      {label && <label className={`text-sm font-medium ${labelStyles}`}>{label}</label>}
      <div className="relative w-full">
        <input
          className={`w-full h-14 p-4 border ${inputStyles} rounded-xl pr-12 focus:border-[#ff5757] focus:ring-1 focus:ring-[#ff5757]/30 dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa]/30 focus:outline-none`}
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          required
          autoComplete="off"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default InputField;
