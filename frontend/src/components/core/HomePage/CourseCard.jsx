import React from "react";
import { HiUsers } from "react-icons/hi";
import { PiTreeStructureFill } from "react-icons/pi";

const CourseCard = ({ course, currentCard, setCurrentCard }) => {
  const isActive = currentCard === course.heading;

  return (
    <div
      onClick={() => setCurrentCard(course.heading)}
      className={`
                relative cursor-pointer w-[360px] h-[300px]
                transition-all duration-300 flex flex-col
                ${isActive
                      ? "bg-white shadow-[12px_12px_0_0_#FFD60A]"
                      : "bg-richblack-800"
                    }
              `}
    >
      <div className="p-6 flex flex-col gap-3 flex-grow">
        <h3
          className={`text-xl font-semibold ${isActive ? "text-richblack-800" : "text-richblack-5"
            }`}
        >
          {course.heading}
        </h3>

        <p
          className={`text-[16px] leading-relaxed mt-3 line-clamp-4 ${isActive ? "text-richblack-400" : "text-richblack-300"
            }`}
        >
          {course.description}
        </p>
      </div>


      <div className="border-t border-dashed border-richblack-400 mx-6" />

      <div
        className={`flex justify-between items-center px-6 py-4 text-sm
                  ${isActive ? "text-blue-500" : "text-richblack-300"}
                  `}
      >
        <div className="flex items-center gap-2">
          <HiUsers />
          <span>{course.level}</span>
        </div>

        <div className="flex items-center gap-2">
          <PiTreeStructureFill />
          <span>{course.lessonNumber} Lesson</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;