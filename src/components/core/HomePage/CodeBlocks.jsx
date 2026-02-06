import React from 'react'
import CTAButton from "../../common/Button";
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';


function CodeBlocks({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) {
    return (
        <div className={`flex ${position} lg:my-20 my-7 justify-between flex-col gap-10`}>

            {/* Section 1 */}
            <div className="lg:w-1/2 flex-shrink-0 flex flex-col gap-8">
                {heading}

                <div className="text-richblack-200 font-bold">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* Section 2 – Code Editor */}
            <div className="relative lg:w-[480px] w-full flex justify-center">

                {/* Gradient background */}
                <div className={backgroundGradient} />

                {/* Content */}
                <div className="relative flex flex-wrap lg:w-[480px] w-full font-mono text-[13px] py-6 overflow-hidden border border-white/10">

                    {/* Line numbers */}
                    <div className="w-[12%] text-center flex flex-col text-richblack-400 font-semibold select-none">
                        {Array.from({ length: 13 }, (_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>

                    {/* Code block */}
                    <div className={`w-[88%] px-4 ${codeColor} font-semibold`}>
                        <TypeAnimation
                            sequence={[codeblock, 2000,""]}
                            repeat={Infinity}
                            omitDeletionAnimation
                            style={
                                {
                                    whiteSpace: "pre-line",
                                    display: "block",
                                }
                            }
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CodeBlocks;  