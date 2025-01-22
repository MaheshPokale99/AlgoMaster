import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="h-20 flex items-center justify-start bg-[#15171c]">
          <Link to="#" className="ml-8 text-3xl flex items-center">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        <nav
          className={`bg-[#15171c] w-72 h-screen fixed top-0 right-0 transition-transform duration-300 z-50 ${
            sidebar ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="w-full">
            
            <Link to="#" className="flex justify-start items-center h-20 text-3xl ml-8">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            
            {SidebarData.map((item, index) => (
              <SubMenu item={item} key={index} />
            ))}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
