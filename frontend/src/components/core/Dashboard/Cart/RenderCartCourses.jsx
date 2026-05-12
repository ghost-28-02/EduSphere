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
                        className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-gray-700 pb-6"
                            } ${indx !== 0 && "mt-6"} `}>
                        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                            <img 
                                src={course?.thumbnail} 
                                alt={course?.courseName} 
                                className="h-[148px] w-[220px] rounded-lg object-cover"
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
                        <div className="flex flex-col items-end space-y-2">
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="flex items-center gap-x-1 rounded-md border border-gray-700 bg-primary-700 py-3 px-[12px] text-coral-500 transition hover:bg-primary-600"
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                            <p className="mb-6 text-3xl font-medium text-highlight-500">
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