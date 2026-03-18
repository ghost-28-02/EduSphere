import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from '../../common/Button'

function LearningLanguageSection() {
  return (
    <div className='mt-24 flex flex-wrap mb-10'>
        <div className='flex flex-col gap-2 items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for
                <HighlightText text={"learning any language"} />
            </div>
            <div className='text-center text-richblack-600 mx-auto text-base w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex lg:flex-row flex-col items-center justify-center mt-5'>
                <img src={know_your_progress} alt='know_your_progress' className='object-contain lg:-mr-28'/>
                <img src={compare_with_others} alt='compare_with_others' className='object-contain lg:-mr-12' />
                <img src={plan_your_lessons} alt='plan_your_lessons' className='object-contain lg:-ml-28' />
            </div>
            <div className='w-fit mb-9'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection