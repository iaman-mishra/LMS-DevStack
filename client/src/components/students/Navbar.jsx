import React, { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  useClerk,
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import logo from "../../assets/logo.png";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const isCouseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator, SetIsEducator, backendUrl, getToken } = useContext(AppContext);

  const becomeEducator = async () => {
    
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }else{
        toast.info("Contacting admin to become educator...");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/update-role", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.success) {
        SetIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCouseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <div className="flex items-center gap-1 " onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className=" h-[30px] sm:h-[35px] cursor-pointer" />
        <h1 className="font-bold text-gray-700 text-lg sm:text-2xl cursor-pointer">DevStack-LMS</h1>
      </div>
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={() => navigate("/educator")}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
