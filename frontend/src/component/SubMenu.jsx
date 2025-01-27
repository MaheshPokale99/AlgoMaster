import PropTypes from 'prop-types';
import { useContext } from 'react';
import {  NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const SubMenu = ({ item }) => {
  const {theme}=useContext(ThemeContext);
  return (
    <div>
      <NavLink
        to={item.path}
        className={`flex items-center px-5 py-4  text-lg ${theme==='dark' ? "hover:bg-zinc-800" : "hover:bg-zinc-300"} hover:border-l-4 hover:border-purple-500 hover:text-blue-500 transition-all duration-200`}
      >
        <div className="flex items-center space-x-4">
          {item.icon}
          <span className="ml-4">{item.title}</span>
        </div>
      </NavLink>
    </div>
  );
};

SubMenu.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SubMenu;
