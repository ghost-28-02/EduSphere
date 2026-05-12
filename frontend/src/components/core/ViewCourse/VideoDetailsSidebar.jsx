import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import IconBtn from "../../common/IconBtn";

function VideoDetailsSidebar({ setReviewModal }) {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();


    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    const setActiveFlags = () => {
        if (!courseSectionData.length) {
            return;
        }
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSections.findIndex(
            (data) => data._id === subSectionId
        )
        const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSections?.[currentSubSectionIndex]?._id;

        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId);
    }



    useEffect(() => {
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div className="flex h-[calc(100vh-3.5rem)] w-full max-w-[350px] flex-col border-r border-gray-700 bg-primary-700 md:w-[320px]">
                <div className="mx-4 flex flex-col items-start justify-between gap-2 border-b border-gray-600 py-4 text-lg font-bold text-white">
                    <div className="flex w-full items-center justify-between">
                        <button
                            onClick={() => navigate("/dashboard/enrolled-courses")}
                            title="back"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 p-1 text-white hover:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                        >
                            <IoIosArrowBack size={20} />
                        </button>
                        <IconBtn
                            text="Add Review"
                            customClasses="ml-auto"
                            onclick={() => setReviewModal(true)}
                        />
                    </div>
                    <div className="w-full">
                        <p className="truncate text-base font-semibold">{courseEntireData?.courseName}</p>
                        <p className="text-sm font-medium text-gray-300">
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {courseSectionData.map((course, index) => (
                        <div
                            className="mt-2 cursor-pointer text-sm text-white"
                            onClick={() => setActiveStatus(course?._id)}
                            key={index}
                        >
                            <div className="flex flex-row justify-between bg-primary-600 px-4 py-3">
                                <div className="w-[70%] font-semibold">
                                    {course?.sectionName}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`${activeStatus === course?.sectionName
                                                ? "rotate-0"
                                                : "rotate-180"
                                            } transition-all duration-300`}
                                    >
                                        <BsChevronDown />
                                    </span>
                                </div>
                            </div>
                            
                            {activeStatus === course?._id && (
                                <div className="transition-[height] duration-300 ease-in-out">
                                    {course.subSections.map((topic, i) => (
                                        <div
                                            className={`flex w-full items-center gap-3 px-4 py-2 ${videoBarActive === topic._id
                                                    ? "rounded-md bg-accent-500/90 px-3 font-semibold text-white"
                                                    : "hover:bg-primary-800/60"
                                                } `}
                                            key={i}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                )
                                                setVideoBarActive(topic._id)
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-400 text-accent-500 focus:ring-accent-500"
                                                checked={completedLectures.includes(topic?._id)}
                                                onChange={() => { }}
                                            />
                                            <span className="truncate">{topic.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default VideoDetailsSidebar;