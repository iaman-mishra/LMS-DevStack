import React, { useContext } from "react";
import { assets, dummyTestimonial } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const TestinomialsSection = () => {
  const { calculateRating } = useContext(AppContext);

  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their
        lives.
      </p>
      <div className="grid grid-cols-auto gap-8 mt-14">
        {dummyTestimonial.map((item, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
              <img
                className="h-12 w-12 rounded-full"
                src={item.image}
                alt={item.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h1>
                <p className="text-gray-800/80">{item.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <img
                      src={
                        i < Math.floor(item.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      key={i}
                      className="h-5"
                      alt="star"
                    />
                  ))}
              </div>
              <p className="text-gray-500 mt-5">{item.feedback}</p>
            </div>
            <a href="#" className="text-blue-500 text-sm hover:text-gray-700 transition-colors duration-200 px-5">
              Read more <span className="ml-1">→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestinomialsSection;
