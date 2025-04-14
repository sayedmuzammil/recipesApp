import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="w-full content-center bg-[#E23E3E]">
      <nav className="w-full flex items-center justify-between p-5">
        <div className="text-[#FEFEFE] text-3xl font-bold">
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
          <li className="text-[#FEFEFE] px-3 bg-[#E23E3E] group  ">
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
