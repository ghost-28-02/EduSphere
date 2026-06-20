import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination}  from 'swiper/modules'

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          className="max-h-[30rem] pb-12"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-white">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider