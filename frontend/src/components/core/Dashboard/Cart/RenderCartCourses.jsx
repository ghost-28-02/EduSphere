import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/cartSlice';
import RatingStars from '../../../common/RatingStars';

function RenderCartCourses() {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <div className="flex flex-1 flex-col">
            {
                cart.map((course, indx) => (
                    <div key={course._id}
                        className={`flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:flex-wrap ${indx !== cart.length - 1 && "border-b border-b-gray-700 pb-6"
                            } ${indx !== 0 && "mt-6"} `}>
                        <div className="flex w-full flex-1 flex-col gap-4 xl:flex-row">
                            <img
                                src={course?.thumbnail}
                                alt={course?.courseName}
                                className="h-[180px] w-full rounded-lg object-cover sm:h-[148px] sm:w-[220px]"
                            />
                            <div className="flex flex-col space-y-1">
                                <p className="text-lg font-medium text-white">
                                    {course?.courseName}
                                </p>
                                <p className="text-sm text-gray-300">
                                    {course?.category?.name}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-500">4.8</span>
                                    <RatingStars Review_Count={4.8} Star_Size={20} />
                                    <span className="text-gray-400">
                                        {course?.ratingAndReviews?.length} Ratings
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-row-reverse items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end sm:space-y-2">
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="flex items-center gap-x-1 rounded-md border border-gray-700 bg-primary-700 py-2 px-3 text-coral-500 transition hover:bg-primary-600 sm:py-3"
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                            <p className="text-2xl font-medium text-highlight-500 sm:mb-6 sm:text-3xl">
                                ₹ {course?.price}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses;