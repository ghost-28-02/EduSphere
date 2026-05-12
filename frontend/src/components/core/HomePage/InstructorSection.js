import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText';
import CTAButton from '../../common/Button';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection() {
  return (
    <div>
      <div className='mx-auto mt-4 flex w-11/12 max-w-maxContent flex-col items-center justify-between rounded-3xl border border-gray-700 bg-primary-800 p-6 text-white shadow-2xl shadow-black/20 sm:p-8 lg:p-10'>
        <div className='flex flex-col items-center gap-10 lg:flex-row'>
          <div className='lg:w-[50%]'>
            <img src={Instructor} alt='Instructor' className='h-[400px] w-full rounded-3xl border border-gray-700 object-cover shadow-xl shadow-black/20 lg:h-full' />
          </div>
          <div className='flex flex-col gap-8 lg:w-[50%]'>
            <div className='text-3xl font-semibold leading-tight sm:text-4xl lg:w-[70%]'>
              <p>Become an <HighlightText text={"instructor"} /></p>
            </div>
            <div className='w-[90%] text-base font-medium leading-7 text-gray-300'>
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
      </div>
    </div>
  )
}

export default InstructorSection;