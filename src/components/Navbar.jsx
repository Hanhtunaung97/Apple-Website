import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className=" w-full py-5 flex justify-between items-center px-5 sm:px-10">
      <nav className="flex justify-between items-center screen-max-width w-full">
        <img src={appleImg} alt="appleLogo" className=" w-4 h-6" />
        <div className="sm:flex flex-1 hidden justify-center items-center gap-x-5 text-sm ">
          {navLists.map((list, index) => (
            <button key={index} className="text-gray-200 hover:text-white transition-all">{list}</button>
          ))}
        </div>
        <div className="flex max-sm:justify-end max-sm:flex-1 items-baseline gap-x-7 ">
          <img src={searchImg} alt="search" className="w-5 h-5" />
          <img src={bagImg} alt="bag" className="w-5 h-5" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
