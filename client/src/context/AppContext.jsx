import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
export const AppContext = createContext();
import { useNavigate } from "react-router-dom";


export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, SetAllCourses] = useState([]);
  const navigate = useNavigate();

  const fetchAllCouses = async () => {
    SetAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCouses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
