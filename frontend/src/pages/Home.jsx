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
    <div className="bg-gray-900 text-white">
      <HeroSection />

      <ExploreMore />

      <div className="bg-primary-800/90 py-12 sm:py-16 relative">
        <div className='homepage_bg relative overflow-hidden'>
          <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-6 py-16 mt-24 text-center sm:py-20 relative z-10'>
            <div className='flex flex-col items-center gap-5'>
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-secondary-400'>
                Start your journey
              </p>
              <h2 className='max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl'>
                Learn with a platform built for modern, focused, and flexible growth.
              </h2>
              <p className='max-w-2xl text-sm leading-7 text-gray-300 sm:text-base'>
                Build the skills you need with structured learning paths, expert guidance, and a clean experience that keeps you moving.
              </p>
            </div>

            <div className='flex flex-col gap-4 text-white sm:flex-row'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-2'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className='flex items-center gap-2'>
                  Learn More
                </div>
              </CTAButton>
            </div>
          </div>

          <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-gray-900/40 pointer-events-none' />
        </div>
      </div>

      <div className='bg-gray-900 py-16 sm:py-20 lg:py-24'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-5'>
          <div className='flex flex-col flex-wrap justify-center gap-8 lg:flex-row lg:gap-16'>
            <div className='max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:w-[45%] lg:text-5xl'>
              Get the skills you need for a
              <HighlightText text={'job that is in demand.'} />
            </div>

            <div className='flex flex-col items-start gap-6 lg:w-[40%]'>
              <div className='max-w-xl text-base leading-7 text-gray-300'>
                The modern StudyNotion dictates its own terms. Today, being competitive requires more than professional skills.
              </div>

              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>

            </div>
          </div>

          <div className='mt-8 w-full rounded-3xl border border-gray-700 bg-primary-800/70 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10'>
            <TimelineSection />
          </div>
          <div className='mt-4 w-full rounded-3xl border border-gray-700 bg-primary-800/70 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10'>
            <LearningLanguageSection />
          </div>

        </div>
      </div>


      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-10 bg-gray-900 py-16 text-white sm:py-20 lg:py-24">
        <InstructorSection />
        <h1 className="text-center text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer />

    </div>
  )
}

export default Home;