import { createContext, use, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
export const AppContext = createContext();
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, SetAllCourses] = useState([]);
  const navigate = useNavigate();
  const {getToken} = useAuth();
  const {user} = useUser();
  const [isEducator , SetIsEducator]=useState(true);
  const [enrolledCourses, SetEnrolledCourses]=useState([]);

  // function to fetch all courses
  const fetchAllCouses = async () => {
    SetAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCouses();
    fetchEnrolledCourses();
  }, []);

  const logToken = async ()=> {
    console.log(await getToken());
  }
  useEffect(() => {
    if (user) {
      logToken();
    }
  },[user]);

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

  // Funciton to Calculate Course chapter duration
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']});
  }

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration))
    return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']});
  }

  // Function to calculate No of Lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }

  // Function to fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    SetEnrolledCourses(dummyCourses);
  }

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    SetIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchEnrolledCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
