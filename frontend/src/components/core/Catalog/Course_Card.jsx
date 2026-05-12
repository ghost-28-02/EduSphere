import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="group rounded-xl overflow-hidden bg-primary-700 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-t-xl object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 px-4 py-4">
            <p className="text-lg font-semibold text-white line-clamp-2">{course?.courseName}</p>
            <p className="text-sm text-gray-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-accent-500 font-semibold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-sm text-gray-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-lg font-semibold text-white mt-2">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card