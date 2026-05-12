import React, { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'

import { FaStar } from "react-icons/fa"

import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {

    const [reviews, setReviews] = useState([])
    const truncateWords = 15

    useEffect(() => {
        ; (async () => {
            const { data } = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            )
            if (data?.success) {
                setReviews(data?.data)
            }
        })()
    }, [])

    return (
        <div className="w-full text-white">
            <div className="mx-auto flex max-w-maxContent px-0 py-6 sm:px-4 sm:py-12">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full"
                >
                    {reviews.map((review, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-700 bg-primary-700 p-5 text-[14px] text-gray-100 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                review?.user?.image
                                                    ? review?.user?.image
                                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                            }
                                            alt=""
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-white">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                            <h2 className="text-[12px] font-medium text-gray-400">
                                                {review?.course?.courseName}
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="font-medium leading-6 text-gray-300">
                                        {review?.review.split(" ").length > truncateWords
                                            ? `${review?.review
                                                .split(" ")
                                                .slice(0, truncateWords)
                                                .join(" ")} ...`
                                            : `${review?.review}`}
                                    </p>
                                    <div className="flex items-center gap-2 ">
                                        <h3 className="font-semibold text-accent-500">
                                            {review.rating.toFixed(1)}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }, (_, starIndex) => (
                                                <FaStar
                                                    key={starIndex}
                                                    className={`${starIndex < Math.round(review.rating) ? 'text-accent-500' : 'text-gray-600'} text-sm`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider;

