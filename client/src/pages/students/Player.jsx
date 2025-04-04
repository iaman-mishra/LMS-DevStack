import React, { useState, useContext, useEffect, useDebugValue } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { assets } from "../../assets/assets";
import YouTube from "react-youtube";
import Rating from "../../components/students/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/students/Loading";

const Player = () => {
  const [corseData, setCourseData] = useState(null); // state to store course data
  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    getToken,
    userData,
    fetchEnrolledCourses,
  } = useContext(AppContext);
  const [openSection, setOpenSection] = useState({}); // state to store open section
  const { courseId } = useParams();
  const [playerData, setPlayerData] = useState(null); // state to store player data
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    enrolledCourses.map((course, index) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
    getCourseData();
  }, [enrolledCourses]);

  const markLectureAsComplete = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  // toggle section
  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* left column */}

        <div>
          {/* course title */}

          <h2 className="text-xl font-semibold">Course Structure</h2>

          {/* course structure */}

          <div className="pt-5">
            {corseData &&
              corseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* chapter content */}

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, index) => (
                        <li key={index} className="flex items-center gap-2 py-1">
                          <img
                            src={
                              progressData &&
                              progressData.lectureCompleted.includes(lecture.lectureId)
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p className="text-sm md:text-default">{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: index + 1,
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Watch now
                                </p>
                              )}
                              <p>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ["h", "m"],
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-2 py-3 mt-10 ">
            <h1 className="text-xl font-semibold">Rate this course</h1>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>

        {/* right column */}
        <div>
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
                controls={1}
              />
              <div>
                <p>
                  {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                </p>
                <button
                  onClick={() => markLectureAsComplete(playerData.lectureId)}
                  className="text-blue-600"
                >
                  {progressData && progressData.lectureCompleted.includes(playerData.lectureId)
                    ? "Completed"
                    : "Mark as complete"}
                </button>
              </div>
            </div>
          ) : (
            <img src={corseData ? corseData.courseThumbnail : ""} />
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Player;
