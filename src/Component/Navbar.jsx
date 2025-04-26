import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../src/assets/logo.jpg';

const Navbar = ({ displayName }) => {
  const [user, setUser] = useState(null);

  return (
    <div className="w-full content-center bg-[#E23E3E]">
      <nav className="w-full flex items-center justify-between p-5">
        {/* <div>
          <img src={Logo} className="h-[50px]	" />
        </div> */}
        <div className="text-[#FEFEFE] text-3xl font-bold flex flex-row items-center">
          <img src={Logo} className="h-[50px]	mr-5 rounded-[50%]" />
          RecipeApp
        </div>
        <ul className="flex gap-6 align-middle">
          <li className="group text-[#FEFEFE] px-3 bg-[#E23E3E] hover:scale-120 duration-500">
            <NavLink
              to="/home"
              className="relative block py-2
               after:absolute after:left-0 after:bottom-0
               after:h-[2px] after:w-0 after:bg-white
               after:transition-all after:duration-300
               group-hover:after:w-full "
            >
              Home
            </NavLink>
          </li>
          <li className="group text-[#FEFEFE] px-3 bg-[#E23E3E] hover:scale-120 duration-500">
            <NavLink
              to="/add"
              className="relative block py-2
               after:absolute after:left-0 after:bottom-0
               after:h-[2px] after:w-0 after:bg-white
               after:transition-all after:duration-300
               group-hover:after:w-full "
            >
              Add
            </NavLink>
          </li>
          <li className="group text-[#FEFEFE] px-3 bg-[#E23E3E] hover:scale-120 duration-500">
            {displayName ? (
              <NavLink
                to={'/profile'}
                className="relative block py-2
             after:absolute after:left-0 after:bottom-0
             after:h-[2px] after:w-0 after:bg-white
             after:transition-all after:duration-300
             group-hover:after:w-full hover:scale-120 duration-500"
              >
                Hi, {displayName}
              </NavLink>
            ) : (
              <NavLink
                to={'/register'}
                className="relative block py-2
               after:absolute after:left-0 after:bottom-0
               after:h-[2px] after:w-0 after:bg-white
               after:transition-all after:duration-300
               group-hover:after:w-full hover:scale-120 duration-500"
              >
                Register
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
