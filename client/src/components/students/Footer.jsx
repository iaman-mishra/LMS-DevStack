import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { AppContext } from "../../context/AppContext";

const Footer = () => {
  const { navigate } = useContext(AppContext);

  return (
    <footer className="bg-[#111820] md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30 ">
        <div className=" flex flex-col md:items-start items-center w-full">
          <div className="flex items-center gap-1" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="logo"
              className=" h-[25px] sm:h-[30px] cursor-pointer"
            />
            <h1 className="font-bold text-white text-lg sm:text-2xl cursor-pointer ">
              DevStack-LMS
            </h1>
          </div>
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            DevStack-LMS is a platform that helps you enhance your skills and
            knowledge. Join us to start your journey to success.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="text-white mb-5 font-semibold">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm md:space-y-2">
            <li>
              <a href="/" className="text-white/80 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="text-white mb-5 font-semibold">
            Subscribe to our newsletter
          </h2>
          <p className="text-white/80 text-sm">
            Get the latest news and updates from DevStack.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none rounded w-64 h-9 px-2 text-sm"
              type="email"
              placeholder="Enter your email"
            />
            <button className="bg-blue-600 w-24 h-9 text-white px-2 text-sm rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-white/80 text-xs">
        Copyright 2025 &copy; DevStack. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
