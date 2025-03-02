import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
export const AppContext = createContext();
import { useNavigate } from "react-router-dom";


export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, SetAllCourses] = useState([]);
  const navigate = useNavigate();

  // function to fetch all courses
  const fetchAllCouses = async () => {
    SetAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCouses();
  }, []);

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if(course.courseRatings.length === 0){
        return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(item => {
        totalRating += item.rating;
    })
    return totalRating/course.courseRatings.length;
  }

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
