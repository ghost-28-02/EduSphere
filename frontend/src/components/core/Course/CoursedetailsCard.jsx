import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  console.log(course?.instructions)

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      <div className={`flex flex-col gap-4 rounded-xl bg-primary-700 p-4 text-white shadow-sm shadow-black/20`}>
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-full overflow-hidden rounded-2xl object-cover"
        />

        <div className="px-2">
          <div className="space-x-3 pb-4 text-3xl font-semibold text-white">
            Rs. {CurrentPrice}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="cursor-pointer rounded-md bg-secondary-500 px-5 py-2 font-semibold text-white hover:bg-secondary-600 transition"
              onClick={
                user && course?.studentEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="cursor-pointer rounded-md bg-primary-600 border border-gray-700 px-5 py-2 font-semibold text-accent-500 hover:bg-primary-600 transition">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-gray-300">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold text-white`}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              {course?.instructions && Array.isArray(course.instructions) && course.instructions.map((item, i) => {
                const instruction = typeof item === 'string' ? JSON.parse(item) : item
                const items = Array.isArray(instruction) ? instruction : [instruction]
                return items.map((inst, idx) => (
                  <p className={`flex gap-2 items-start`} key={`${i}-${idx}`}>
                    <BsFillCaretRightFill className="text-accent-500 mt-1" />
                    <span>{inst}</span>
                  </p>
                ))
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-4 text-accent-500 hover:text-accent-600 transition"
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard