import React from "react";
import { HiUsers } from "react-icons/hi";
import { PiTreeStructureFill } from "react-icons/pi";

const CourseCard = ({ course, currentCard, setCurrentCard }) => {
  const isActive = currentCard === course.heading;

  return (
    <div
      onClick={() => setCurrentCard(course.heading)}
      className={`
                relative flex h-[300px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 sm:max-w-[360px]
                ${isActive
                      ? "border-secondary-500 bg-gray-800 shadow-2xl shadow-black/30"
                      : "border-gray-700 bg-primary-700 hover:border-secondary-500 hover:shadow-xl hover:shadow-black/20"
                    }
              `}
    >
      <div className="p-6 flex flex-col gap-3 flex-grow">
        <h3
          className={`text-xl font-semibold ${isActive ? "text-white" : "text-white"
            }`}
        >
          {course.heading}
        </h3>

        <p
          className={`mt-3 line-clamp-4 text-[16px] leading-relaxed ${isActive ? "text-gray-300" : "text-gray-300"
            }`}
        >
          {course.description}
        </p>
      </div>


      <div className="mx-6 border-t border-dashed border-gray-700" />

      <div
        className={`flex justify-between items-center px-6 py-4 text-sm
                  ${isActive ? "text-accent-500" : "text-gray-300"}
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