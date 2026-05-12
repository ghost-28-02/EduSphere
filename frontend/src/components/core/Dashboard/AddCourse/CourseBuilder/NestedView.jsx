import React, { useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubsection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";

function NestedView({ handleChangeEditSectionName }) {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubsection, setAddSubsection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleleSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })
        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubsection({ subSectionId, sectionId, token })
        if (result.success) {
            const updatedCourseContent = course.courseContent.map((section) => {
                if (section._id === sectionId) {
                    return {
                        ...section,
                        subSections: section.subSections.filter(sub => sub._id !== subSectionId)
                    }
                }
                return section
            })
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }
    return (
        <>
            <div className="rounded-xl border border-gray-700 bg-primary-700 p-6 px-8 shadow-sm shadow-black/20" id="nestedViewContainer">
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open>
                            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-gray-700 py-2">
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu className="text-2xl text-white" />
                                    <p className="font-semibold text-white">
                                        {section.sectionName}
                                    </p>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <button
                                        onClick={() => handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )}
                                    >
                                        <MdEdit className="text-xl text-gray-300" />
                                    </button>
                                    <button
                                        onClick={() => setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleleSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })}
                                    >
                                        <RiDeleteBin6Line className="text-xl text-gray-300" />
                                    </button>
                                    <span className="font-medium text-gray-300">|</span>
                                    <AiFillCaretDown className={`text-xl text-gray-300`} />
                                </div>
                            </summary>
                            <div className="px-6 pb-4">
                                {
                                    section.subSections.map((data) => (
                                        <div
                                            key={data?._id}
                                            onClick={() => setViewSubSection(data)}
                                            className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-gray-700 py-2"
                                        >
                                            <div className="flex items-center gap-x-3 py-2 ">
                                                <RxDropdownMenu className="text-2xl text-white" />
                                                <p className="font-semibold text-white">
                                                    {data.title}
                                                </p>
                                                {data.timeDuration && (
                                                    <p className="text-xs text-gray-300">
                                                        {Math.floor(data.timeDuration / 60)}:{(data.timeDuration % 60).toString().padStart(2, '0')} min
                                                    </p>
                                                )}
                                            </div>
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-x-3"
                                            >
                                                <button
                                                    onClick={() =>
                                                        setEditSubSection({ ...data, sectionId: section._id })
                                                    }
                                                >
                                                    <MdEdit className="text-xl text-gray-300" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setConfirmationModal({
                                                            text1: "Delete this Sub-Section?",
                                                            text2: "This lecture will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () =>
                                                                handleDeleteSubSection(data._id, section._id),
                                                            btn2Handler: () => setConfirmationModal(null),
                                                        })
                                                    }
                                                >
                                                    <RiDeleteBin6Line className="text-xl text-gray-300" />
                                                </button>

                                            </div>
                                        </div>
                                    ))
                                }
                                <button
                                    onClick={() => setAddSubsection(section._id)}
                                    className="mt-3 flex items-center gap-x-1 text-secondary-500"
                                >
                                    <FaPlus className="text-lg" />
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </details>
                    ))
                }
            </div>
            {addSubsection ? (
                <SubSectionModal
                    modalData={addSubsection}
                    setModalData={setAddSubsection}
                    add={true}
                />
            ) : viewSubSection ? (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            ) : editSubSection ? (
                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            ) : (
                <></>
            )}

            {confirmationModal ? (
                <ConfirmationModal modaldata={confirmationModal} />
            ) : (
                <></>
            )}

        </>
    )
}

export default NestedView;