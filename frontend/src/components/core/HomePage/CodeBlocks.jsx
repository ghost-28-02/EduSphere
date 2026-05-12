import React from 'react'
import CTAButton from "../../common/Button";
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';


function CodeBlocks({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) {
    return (
        <div className={`flex ${position} my-10 justify-between gap-10 lg:my-20`}>

            {/* Section 1 */}
            <div className="flex w-full flex-shrink-0 flex-col gap-8 lg:w-1/2">
                {heading}

                <div className="font-medium leading-8 text-gray-300">
                    {subheading}
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
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
            <div className="relative flex w-full justify-center lg:w-[480px]">

                {/* Gradient background */}
                <div className={backgroundGradient} />

                {/* Content */}
                <div className="relative flex w-full flex-wrap overflow-hidden rounded-3xl border border-gray-700 py-6 font-mono text-[13px] shadow-2xl shadow-black/20 lg:w-[480px]">

                    {/* Line numbers */}
                    <div className="flex w-[12%] select-none flex-col text-center font-semibold text-gray-500">
                        {Array.from({ length: 13 }, (_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>

                    {/* Code block */}
                    <div className={`w-[88%] px-4 font-semibold ${codeColor}`}>
                        <TypeAnimation
                            sequence={[codeblock, 2000,""]}
                            repeat={Infinity}
                            omitDeletionAnimation
                            className="block whitespace-pre-line"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CodeBlocks;  