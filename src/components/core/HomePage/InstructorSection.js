import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText';
import CTAButton from '../../common/Button';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection() {
  return (
    <div>
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between bg-richblack-900 text-white mt-16'>
        <div className='flex lg:flex-row flex-col gap-20 items-center'>
          <div className='lg:w-[50%] '>
            <img src={Instructor} alt='Instructor' className='shadow-white shadow-[-20px_-20px_0px_0px] object-cover h-[400px] lg:h-fit' />
          </div>
          <div className='lg:w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold lg:w-[50%]'>
              <p>Become an <HighlightText text={"instructor"} /></p>
            </div>
            <div className='text-richblack-300 font-medium text-[16px] w-[90%] '>
              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>
            <div className='w-fit'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row items-center gap-3'>
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
        <p className='text-center text-4xl font-semibold mt-10 '>
          Reviews from other learners
        </p>
      </div>
    </div>
  )
}

export default InstructorSection;