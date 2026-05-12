import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import { useEffect } from 'react';

function CourseReviewModal({ setReviewModal }) {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);



    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        setValue("courseExperience", "")
        setValue("courseRating", 0)
    }, []);

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        )
        setReviewModal(false)
    }


    return (
        <>
            <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-black/40 backdrop-blur-sm p-4">
                <div className="my-10 w-full max-w-[700px] rounded-lg border border-gray-700 bg-primary-800 shadow-lg">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between rounded-t-lg bg-primary-700 p-5">
                        <p className="text-xl font-semibold text-white">Add Review</p>
                        <button
                            onClick={() => setReviewModal(false)}
                            className="rounded-full p-1 text-white hover:bg-primary-600/30 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            aria-label="Close review modal"
                        >
                            <RxCross2 className="text-2xl" />
                        </button>
                    </div>
                    {/* Modal Body */}
                    <div className="p-6">
                        <div className="flex items-center justify-center gap-x-4">
                            <img
                                src={user?.image}
                                alt={user?.firstName + " profile"}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-white">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-sm text-gray-300">Posting Publicly</p>
                            </div>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-6 flex w-full flex-col"
                        >
                            <div className="flex justify-center">
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#F97316"
                                />
                            </div>
                            <div className="mt-4 w-full">
                                <label
                                    className="text-sm text-gray-200"
                                    htmlFor="courseExperience"
                                >
                                    Add Your Experience <sup className="text-coral-500">*</sup>
                                </label>
                                <textarea
                                    id="courseExperience"
                                    placeholder="Add Your Experience"
                                    {...register("courseExperience", { required: true })}
                                    className="form-style mt-2 min-h-[120px] w-full resize-none rounded-md border border-gray-700 bg-primary-700 p-3 text-gray-100 placeholder:text-gray-400"
                                />
                                {errors.courseExperience && (
                                    <span className="ml-2 mt-1 block text-xs tracking-wide text-coral-500">
                                        Please Add Your Experience
                                    </span>
                                )}
                            </div>
                            <div className="mt-6 flex w-full justify-end gap-x-3">
                                <button
                                    onClick={() => setReviewModal(false)}
                                    type="button"
                                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-700 py-2 px-4 font-semibold text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <IconBtn text="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseReviewModal;