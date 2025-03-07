import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets.js";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [corseData, setCourseData] = useState(null); // state to store course data
  const [openSection, setOpenSection] = useState({}); // state to store open section
  const [isEnrolled, setIsEnrolled] = useState(false); // state to store enrolled status
  const [playerData, setPlayerData] = useState(null); // state to store video player data

  const { allCourses, calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures, currency } = useContext(AppContext);

  // fetch course data
  const fetchCourseData = async () => {
    const findcourse = allCourses.find((course) => course._id === id);
    setCourseData(findcourse);
  };

  // fetch course data
  useEffect(() => {
    fetchCourseData();
  }, []);

  // toggle section
  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return corseData ? (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

      {/* left column */}
      <div className="max-w-xl z-10 text-gray-500">
        {/* course title */}
        <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800">
          {corseData.courseTitle}
        </h1>

        {/* course description */}
        <p
          className="pt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{
            __html: corseData.courseDescription.slice(0, 200),
          }}
        />

        {/* course rating */}
        <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
          <p>{calculateRating(corseData)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                src={i < Math.floor(calculateRating(corseData)) ? assets.star : assets.star_blank}
                key={i}
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-blue-600">
            ({corseData.courseRatings.length} {corseData.courseRatings.length > 1 ? "ratings" : "rating"})
          </p>
          <p className="text-gray-500">
            {corseData.enrolledStudents.length} {corseData.enrolledStudents.length > 1 ? "students" : "student"}
          </p>
        </div>

        {/* course by */}
        <p>
          Course by <span className="text-blue-600">DevStack</span>
        </p>

        {/* course structure */}
        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {corseData.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white mb-2 rounded">
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => toggleSection(index)}>
                    <img
                      className={`transform transition-transform ${openSection[index] ? "rotate-180" : ""}`}
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

                <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? "max-h-96" : "max-h-0"}`}>
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 py-1">
                        <img
                          src={assets.play_icon}
                          alt="play icon"
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                          <p className="text-sm md:text-default">{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.isPreviewFree && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    videoId: lecture.lectureUrl.split("/").pop(),
                                  })
                                }
                                className="text-blue-500 cursor-pointer">
                                Preview
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
        </div>

        {/* Course Description */}
        <div className="py-20 text-sm md:text-default">
          <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
          <p
            className="pt-3 rich-text"
            dangerouslySetInnerHTML={{ __html: corseData.courseDescription }}
          />
        </div>
      </div>

      {/* right column */}
      <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
        {/* course thumbnail */}

        {playerData ? (
          <YouTube
            videoId={playerData.videoId}
            opts={{ autoplay: 1 }}
            iframeClassName="w-full aspect-video"
          />
        ) : (
          <img
            src={corseData.courseThumbnail}
            alt=""
          />
        )}

        {/* course details */}

        <div className="p-5">
          <div className="flex items-center gap-2">
            <img
              className="w-3.5"
              src={assets.time_left_clock_icon}
              alt=""
            />
            <p className="text-red-500">
              <span className="font-medium">5 days</span> left at this price
            </p>
          </div>

          {/* course price */}
          <div className="flex items-center pt-2 gap-3">
            <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
              {currency} {(corseData.coursePrice - (corseData.discount * corseData.coursePrice) / 100).toFixed(2)}
            </p>
            <p className="md:text-lg text-gray-500 line-through">
              {currency} {corseData.coursePrice}
            </p>
            <p className="md:text-lg text-gray-500">{corseData.discount}% off</p>
          </div>

          {/* course rating */}
          <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
            <div className="flex items-center gap-1">
              <img
                src={assets.star}
                alt=""
              />
              <p>{calculateRating(corseData)}</p>
            </div>
            <div className="h-4 w-px bg-gray-500/40"></div>

            {/* course duration */}
            <div className="flex items-center gap-1">
              <img
                src={assets.time_clock_icon}
                alt=""
              />
              <p>{calculateCourseDuration(corseData)}</p>
            </div>
            <div className="h-4 w-px bg-gray-500/40"></div>

            {/* course lessons */}
            <div className="flex items-center gap-1">
              <img
                src={assets.lesson_icon}
                alt=""
              />
              <p>{calculateNoOfLectures(corseData)} lessons</p>
            </div>
          </div>

          {/* enroll button */}
          <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font font-medium">
            {isEnrolled ? "Already Enrolled" : "Enroll Now"}
          </button>

          {/* course inside details */}
          <div className="pt-6">
            <p className="md:text-xl text-lg font-medium text-gray-800">Whats inside the course?</p>
            <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
              <li>Lifetime Access with free updates</li>
              <li>Step by step guide, hands on practice</li>
              <li>Downloadable resources</li>
              <li>Quiz and assignments</li>
              <li>Certificate of completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
