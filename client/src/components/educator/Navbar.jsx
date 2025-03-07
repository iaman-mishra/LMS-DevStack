import React, {useContext} from 'react';
import {assets, dummyEducatorData} from '../../assets/assets.js';
import { UserButton, useUser } from '@clerk/clerk-react';
import logo from '../../assets/logo.png';
import {AppContext} from '../../context/AppContext.jsx';

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const {user} = useUser();
  const {navigate} = useContext(AppContext);

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <div className="flex items-center gap-1 " onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="logo"
          className=" h-[25px] sm:h-[30px] cursor-pointer"
        />
        <h1 className="font-bold text-gray-700 text-lg sm:text-xl cursor-pointer">
          DevStack-LMS
        </h1>
      </div>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi! {user ? user.fullName : 'Developer'}</p>
        {user ? <UserButton/> : <img className='max-w-8' src={assets.profile_img} />}
      </div>
    </div>
  )
}

export default Navbar
