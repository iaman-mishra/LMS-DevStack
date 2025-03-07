import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Footer = () => {
  const { navigate } = useContext(AppContext);
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className=" h-[25px] sm:h-[30px] cursor-pointer"
          />
          <h1 className="font-bold text-gray-700 text-lg sm:text-xl cursor-pointer ">DevStack-LMS</h1>
        </div>
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">Copyright 2025 &copy; DevStack. All rights reserved.</p>
      </div>
      <div className="flex items-center gap-3 max-md:mt-4">
        <a href="#">
          <img src={assets.facebook_icon} />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
