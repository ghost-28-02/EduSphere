import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../../../../services/formatDate";
import { HiClock } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses} from "../../../../services/operations/courseDetailsAPI";
import { Table, Tbody, Thead, Td, Th, Tr } from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function CoursesTable({courses, setCourses}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const TRUNCATE_LENGTH = 30;

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({courseId: courseId}, token)
        const result = await fetchInstructorCourses(token)
        if(result) {
            setCourses(result)
        }

        setConfirmationModal(null)
        setLoading(false)
    }

  return (
    <>
        <Table className="rounded-xl border border-gray-700 bg-primary-700 shadow-sm shadow-black/20">
            <Thead>
                <Tr className="flex gap-x-10 rounded-t-xl border-b border-b-gray-700 px-6 py-3">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-gray-300">
                        Courses
                    </Th>

                    <Th className="text-left text-sm font-medium uppercase text-gray-300">
                        Duration
                    </Th>

                    <Th className="text-left text-sm font-medium uppercase text-gray-300">
                        Price
                    </Th>

                    <Th className="text-left text-sm font-medium uppercase text-gray-300">
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses?.lenght === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-gray-300">
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr
                            key={course._id}
                            className="flex gap-x-10 border-b border-gray-700 px-6 py-8 hover:bg-primary-600/40 transition">
                                <Td className="flex flex-1 gap-x-4" >
                                    <img 
                                        src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className="h-[148px] w-[220px] rounded-xl object-cover"
                                    />

                                    <div className="flex flex-col justify-between">
                                        <p className='ext-lg font-semibold text-white'>
                                            {course?.courseName}
                                        </p>
                                        <p className="text-xs text-gray-300">
                                            {course?.courseDescription.split(" ").lenght > TRUNCATE_LENGTH ? (
                                                course?.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                            ) : (course?.courseDescription)}
                                        </p>
                                        <p className="text-[12px] text-white">
                                            Created: {formatDate(course?.createdAt)}
                                        </p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (
                                                <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-coral-900 px-2 py-[2px] text-[12px] font-medium text-coral-200">
                                                    <HiClock size={14}/>
                                                    Drafted
                                                </div>
                                            ) : (
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-primary-600 px-2 py-[2px] text-[12px] font-medium text-accent-500">
                                                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-accent-500 text-primary-800">
                                                        <FaCheck size={8} />
                                                    </div>
                                                    Published
                                                </p>
                                            )
                                        }
                                    </div>
                                </Td>
                                <Td className="text-sm font-medium text-gray-300">
                                    2hr 30min
                                </Td>
                                <Td className="text-sm font-medium text-gray-300">
                                    ₹{course?.price}
                                </Td>
                                <Td className="text-sm font-medium text-gray-300 ">
                                    <button
                                        disabled={loading}
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                        title='Edit'
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-secondary-500"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2: "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                                btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                                            })
                                        }}
                                        title="Delete"
                                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-coral-500"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        {
            confirmationModal && <ConfirmationModal modaldata={confirmationModal} />
        }
    </>
  )
}

export default CoursesTable;