import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/common/Button';
import HeroSection from '../components/core/HomePage/HeroSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <HeroSection />

      <ExploreMore />

      {/* Section 2 */}

      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px] '>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto'>
            <div className='h-[170px]'></div>
            <div className='flex flex-row gap-7 text-white mt-10'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row gap-2 items-center'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn More
                </div>
              </CTAButton>
            </div>
          </div>

        </div>

        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center gap-5'>
          <div className='flex lg:flex-row flex-col flex-wrap lg:gap-20 gap-5 justify-center mb-10 mt-[95px]'>
            <div className='text-4xl font-semibold lg:w-[45%]'>
              Get the skills you need for a
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className='flex flex-col gap-7 lg:w-[40%] items-start'>
              <div className='text-[16px]'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>

              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>

            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />

        </div>
      </div>


      {/* Section 3 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-8 bg-richblack-900 py-20 px-4 text-white">
        <InstructorSection />
        <h1 className="text-center text-4xl font-semibold">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>



      {/* Footer */}

      <Footer />

    </div>
  )
}

export default Home;