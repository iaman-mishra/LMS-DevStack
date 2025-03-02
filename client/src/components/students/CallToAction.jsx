import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Ready to start your journey to success?
      </h1>
      <p className="text-gray-500 sm:text-sm">
        Join our community of learners and take your skills to the next level.
        <br />
        Start your journey to success today.
      </p>
      <div className="flex items-center gap-6 font-medium mt-4 justify-center">
        <button className="bg-blue-600 text-white px-10 py-3 rounded-md sm:text-sm">
          Get Started
        </button>
        <button className="px-10 py-3 rounded-md flex items-center gap-2 bg-white text-black border border-gray-300 sm:text-sm">
          Learn More <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
