import React, { useEffect, useState } from 'react'

import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import Spinner from '../../common/Spinner'
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineClock } from 'react-icons/hi';

function EnrolledCourses() {

    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Enable to fatch enrolled courses")
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, [])

    return (
        <div>
            <div className="text-3xl font-semibold text-white">
                Enrolled Courses
            </div>

            {
                !enrolledCourses ? (<Spinner />) : (
                    !enrolledCourses.length ? (
                        <p className="grid h-[10vh] w-full place-content-center text-gray-300">
                            You are not enrolled in any courses yet
                        </p>
                    ) : (
                      <>
                        {/* Mobile card layout */}
                        <div className="my-8 space-y-4 text-white md:hidden">
                            {
                                enrolledCourses.map((course, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSections?.[0]?._id}`
                                            )
                                        }}
                                        className="cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-primary-700/50 transition-transform duration-200 active:scale-[0.99]"
                                    >
                                        <img
                                            src={course.thumbnail}
                                            alt={course?.courseName}
                                            className="h-40 w-full object-cover"
                                        />
                                        <div className="flex flex-col gap-3 p-4">
                                            <div>
                                                <p className="line-clamp-2 font-semibold">{course.courseName}</p>
                                                <p className="mt-1 line-clamp-2 text-xs text-gray-300">
                                                    {course.courseDescription}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <HiOutlineClock className="text-base" />
                                                <span>{course?.totalDuration}</span>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs text-gray-300">
                                                    {course.progressPercentage || 0}% complete
                                                </p>
                                                <ProgressBar
                                                    completed={course.progressPercentage || 0}
                                                    height="8px"
                                                    isLabelVisible={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Desktop table layout */}
                        <div className="my-8 hidden text-white md:block">
                            <div className="flex rounded-t-lg bg-primary-700 ">
                                <p className="w-[45%] px-5 py-3">Course Name</p>
                                <p className="w-1/4 px-2 py-3">Duration</p>
                                <p className="flex-1 px-2 py-3">Progress</p>
                            </div>
                            {
                                enrolledCourses.map((course, i, arr) => (
                                    <div className={`flex items-center border border-gray-700 bg-primary-700/50 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                        }`}
                                        key={i}
                                    >
                                        <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSections?.[0]?._id}`
                                                )
                                            }}>
                                            <img src={course.thumbnail} alt={course?.courseName} className="h-14 w-14 rounded-lg object-cover" />
                                            <div className="flex max-w-xs flex-col gap-2">
                                                <p className="font-semibold">{course.courseName}</p>
                                                <p className="text-xs text-gray-300">
                                                    {course.courseDescription.length > 50
                                                        ? `${course.courseDescription.slice(0, 50)}...`
                                                        : course.courseDescription}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-1/4 px-2 py-3">
                                            {course?.totalDuration}
                                        </div>

                                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                            <p>Progress: {course.progressPercentage || 0}%</p>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height='8px'
                                                isLabelVisible={false}
                                            />
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                      </>
                    )
                )
            }
        </div>
    )
}

export default EnrolledCourses;