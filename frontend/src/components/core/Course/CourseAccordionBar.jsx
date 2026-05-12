import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  // Accordian state
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border border-solid border-gray-700 bg-primary-700 text-white last:mb-0 rounded-xl">
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between px-6 py-4 transition-all duration-200`} 
          onClick={() => {
            handleActive(course._id)
          }}
        >
          <div className="flex items-center gap-3">
            <i
              className={
                isActive.includes(course._id) ? "rotate-180" : "rotate-0"
              }
            >
              <AiOutlineDown />
            </i>
            <p className="font-semibold text-white">{course?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-accent-500 font-medium">
              {`${course.subSections.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden bg-primary-800 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="text-gray-300 flex flex-col gap-2 px-6 py-4 font-medium">
          {course?.subSections?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}