import { createContext, use, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
export const AppContext = createContext();
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, SetAllCourses] = useState([]);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [isEducator, SetIsEducator] = useState(false);
  const [enrolledCourses, SetEnrolledCourses] = useState([]);
  const [userData, SetUserData] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // function to fetch all courses
  const fetchAllCouses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");

      if (data.success) {
        SetAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // console.log("all couses",allCourses);
  
  
  // fetcjh user data
  const fetchUserData = async () => {
    if (user.publicMetadata.role === "educator") {
      SetIsEducator(true);
    }
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        SetUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCouses();
  }, []);


  useEffect(() => {
    fetchAllCouses();
    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchEnrolledCourses();
    }
  }, [user]);

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((item) => {
      totalRating += item.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  // Funciton to Calculate Course chapter duration
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate No of Lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // Function to fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const { data } = await axios.get(backendUrl + "/api/user/enrolled-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        SetEnrolledCourses(data.enrolledCourses?.reverse() || []);
      } else {
        toast.error(data.message);
      } 
    } catch (error) {
      toast.error(error.message);
    }
  };

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
    backendUrl,
    userData,
    SetUserData,
    getToken,
    fetchAllCouses,
    fetchUserData
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
