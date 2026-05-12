import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Banner from "../../../assets/Images/banner.mp4"
import CodeBlocks from './CodeBlocks';
import CTAButton from "../../common/Button";
import HighlightText from './HighlightText';

function HeroSection() {
    return (
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between text-white'>

            <Link to={"/signup"}>
                <div className='group mt-16 mx-auto w-fit rounded-full border border-gray-700 bg-primary-700 p-1 font-semibold text-gray-100 shadow-lg shadow-black/10 transition-all duration-200 hover:scale-95 hover:border-secondary-500'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-8 py-2 transition-all duration-200 group-hover:bg-primary-600'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='mt-7 max-w-4xl text-center text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-5 w-full max-w-3xl text-center text-base leading-8 text-gray-300 sm:text-lg'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
            </div>

            <div className="relative mx-0 my-12 w-full overflow-hidden rounded-3xl border border-gray-700 bg-primary-700 p-2 shadow-2xl shadow-black/20 sm:mx-6 lg:mx-10">
                <video
                    muted
                    loop
                    autoPlay
                    className="relative z-10 block w-full rounded-2xl"
                >
                    <source src={Banner} type="video/mp4" />
                </video>
                <div className="absolute inset-0 -z-0 rounded-3xl bg-gradient-to-br from-primary-600 via-gray-900 to-primary-800 opacity-80" />
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks position={"lg:flex-row flex-col"}
                    heading={<div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"} />
                        with our online courses
                    </div>}
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and passionate about sharing their knowledege with you."}
                    ctabtn1={
                        {
                            btnText: "Try it Yourself",
                            linkto: '/signup',
                            active: true
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: '/login',
                            active: false
                        }
                    }

                    codeblock={
                        ` <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <title>This is myPage</title>
                        </head>
                        <body>
                        <h1><a href="/">Header</a></h1>
                        <nav> <a href="/one">One</a> <a
                        href="/two">Two</a> <a href="/three">Three</a>
                        </nav>
                        </body>`}

                    codeColor={"text-accent-500"}
                    backgroundGradient={"absolute inset-0 rounded-3xl bg-[radial-gradient(80%_80%_at_30%_50%,#3a2a1f_0%,#2b2330_35%,#141826_70%,#05070f_100%)]"}
                />
            </div>

            {/* Code Section 2 */}
            <div>
                <CodeBlocks position={"lg:flex-row-reverse flex-col"}
                    heading={<div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={"coding in"} />
                        <br />
                        <HighlightText text={"seconds"} />
                    </div>}
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: '/signup',
                            active: true
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: '/login',
                            active: false
                        }
                    }

                    codeblock={
                            `import React from "react";
                            import CTAButton from "./Button";
                            import TypeAnimation from "react-type";
                            import { FaArrowRight } from "react-icons/fa";

                            const Home = () => {
                            return (
                            <div>Home</div>
                            )
                            }
                            export default Home;`
                        }
                    codeColor={"text-gray-100"}
                    backgroundGradient={"absolute inset-0 bg-[radial-gradient(80%_80%_at_30%_50%,_#1e3a8a_0%,_#1e293b_35%,_#0f172a_70%,_#020617_100%)]"}
                />
            </div>
        </div>
    )
}

export default HeroSection;