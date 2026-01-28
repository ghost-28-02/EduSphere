import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Banner from "../../../assets/Images/banner.mp4"
import CodeBlocks from './CodeBlocks';
import CTAButton from "./Button";
import HighlightText from './HighlightText';

function HeroSection() {
    return (
        <div className='relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white justify-between'>

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit border-b-2 border-richblack-600 hover:border-richblack-900'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-200'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
            </div>

            <div className="mx-10 my-12 rounded-xl relative shadow-[-10px_-10px_28px_rgba(0,212,222,0.2)]">
                <video
                    muted
                    loop
                    autoPlay
                    className="block w-full rounded-xl relative z-10"
                >
                    <source src={Banner} type="video/mp4" />
                </video>
                <div className="absolute -right-4 -bottom-4 w-full h-full bg-white shadow-lg z-0 rounded-xl" />
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

                    codeColor={"text-yellow-25"}
                    backgroundGradient={"absolute inset-0 bg-[radial-gradient(80%_80%_at_30%_50%,_#3a2a1f_0%,_#2b2330_35%,_#141826_70%,_#05070f_100%)]"}
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
                    codeColor={"text-pure-greys-50"}
                    backgroundGradient={`absolute inset-0 bg-[radial-gradient(80%_80%_at_30%_50%,_#1e3a8a_0%,_#1e293b_35%,_#0f172a_70%,_#020617_100%)]`}
                />
            </div>
        </div>
    )
}

export default HeroSection;