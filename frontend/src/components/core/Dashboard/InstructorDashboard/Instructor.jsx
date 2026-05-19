import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorDetails } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

function Instructor() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        ; (async () => {
            setLoading(true)
            const instructorApiData = await getInstructorDetails(token)
            console.log("instructorApiData -> ", instructorApiData);
            const result = await fetchInstructorCourses(token)
            if (instructorApiData?.length) setInstructorData(instructorApiData)
            if (result) {
                setCourses(result)
            }
            setLoading(false)
        })()
    }, [])

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    )

    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    )

    return (
        <div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white">
                    Hi {user?.firstName} 👋
                </h1>
                <p className="font-medium text-gray-300">
                    Let's start something new
                </p>
            </div>
            {loading ? (
                <div className="min-h-screen flex justify-between items-center">
                    <div className="spinner"></div>
                </div>
            ) : courses.length > 0 ? (
                <div>
                    <div className="my-4 flex h-[450px] flex-col gap-4 lg:flex-row">
                        {/* Render chart / graph */}
                        {totalAmount > 0 || totalStudents > 0 ? (
                            <InstructorChart courses={instructorData} />
                        ) : (
                            <div className="flex-1 rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20">
                                <p className="text-lg font-bold text-white">Visualize</p>
                                <p className="mt-4 text-xl font-medium text-gray-300">
                                    Not Enough Data To Visualize
                                </p>
                            </div>
                        )}
                        {/* Total Statistics */}
                        <div className="flex min-w-[250px] flex-col rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20">
                            <p className="text-lg font-bold text-white">Statistics</p>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <p className="text-lg text-gray-300">Total Courses</p>
                                    <p className="text-3xl font-semibold text-white">
                                        {courses.length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-300">Total Students</p>
                                    <p className="text-3xl font-semibold text-white">
                                        {totalStudents}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-300">Total Income</p>
                                    <p className="text-3xl font-semibold text-highlight-500">
                                        Rs. {totalAmount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20">
                        {/* Render 3 courses */}
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-white">Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p className="text-xs font-semibold text-secondary-500">View All</p>
                            </Link>
                        </div>
                        <div className="my-4 flex flex-col items-start gap-6 lg:flex-row">
                            {courses.slice(0, 3).map((course) => (
                                <div key={course._id} className="w-full lg:w-1/3">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="h-[201px] w-full rounded-xl object-cover"
                                    />
                                    <div className="mt-3 w-full">
                                        <p className="text-sm font-medium text-white">
                                            {course.courseName}
                                        </p>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <p className="text-xs font-medium text-gray-300">
                                                {course.studentEnrolled.length} students
                                            </p>
                                            <p className="text-xs font-medium text-gray-300">
                                                |
                                            </p>
                                            <p className="text-xs font-medium text-gray-300">
                                                Rs. {course.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-20 rounded-xl border border-gray-700 bg-primary-700 p-6 py-20 shadow-sm shadow-black/20">
                    <p className="text-center text-2xl font-bold text-white">
                        You have not created any courses yet
                    </p>
                    <Link to="/dashboard/add-course">
                        <p className="mt-1 text-center text-lg font-semibold text-secondary-500">
                            Create a course
                        </p>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Instructor;