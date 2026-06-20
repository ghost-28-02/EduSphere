import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { HiMenuAlt2 } from 'react-icons/hi';

import {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    updateCompletedLectures
} from "../slices/viewCourseSlice";


function ViewCourse() {

    const [reviewModal, setReviewModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const setCourseSpecificDetails = async () => {
        const courseData = await getFullDetailsOfCourse(courseId, token);
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(setCompletedLectures(courseData?.completedVideos));

        let lectures = 0;

        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSections.length
        })
        dispatch(setTotalNoOfLectures(lectures));
    }

    useEffect(() => {
        setCourseSpecificDetails();
    }, [])


    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoDetailsSidebar
                    setReviewModal={setReviewModal}
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    {/* Mobile bar with course-content toggle */}
                    <div className="sticky top-0 z-30 flex items-center gap-x-3 border-b border-gray-700 bg-primary-800/95 px-4 py-3 backdrop-blur-md md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Open course content"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-primary-700 p-2 text-gray-100 transition-colors duration-200 hover:border-secondary-500 hover:bg-primary-600 hover:text-white"
                        >
                            <HiMenuAlt2 className="text-2xl" />
                        </button>
                        <span className="text-sm font-semibold text-gray-100">Course Content</span>
                    </div>

                    <div className="mx-4 py-4 md:mx-6 md:py-0">
                        <Outlet />
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    )
}

export default ViewCourse;
