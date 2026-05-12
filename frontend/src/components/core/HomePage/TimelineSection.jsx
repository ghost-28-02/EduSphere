import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    }
]

function TimelineSection() {
    return (
        <div>
            <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
                <div className="flex flex-col gap-10 lg:w-[45%] lg:gap-6">
                    {timeline.map((ele, i) => {
                        return (
                            <div className="flex flex-col gap-4" key={i}>
                                <div className="flex gap-5" key={i}>
                                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gray-700 bg-primary-700 shadow-lg shadow-black/10">
                                        <img src={ele.Logo} alt="" />
                                    </div>
                                    <div>
                                        <h2 className="text-[18px] font-semibold text-white">{ele.heading}</h2>
                                        <p className="text-base text-gray-300">{ele.description}</p>
                                    </div>
                                </div>
                                <div
                                    className={`hidden ${timeline.length - 1 === i ? "hidden" : "lg:block"
                                        } h-14 w-[26px] border-r border-dotted border-gray-700 bg-transparent`}
                                ></div>
                            </div>
                        );
                    })}
                </div>
                <div className="relative h-fit w-fit">
                    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-col gap-4 rounded-2xl border border-gray-700 bg-secondary-700 px-5 py-5 text-white shadow-xl shadow-black/20 lg:flex-row lg:gap-0 lg:px-7 lg:py-8">
                        {/* Section 1 */}
                        <div className="flex items-center gap-5 border-gray-700 px-2 lg:border-r lg:px-8">
                            <h1 className="text-3xl font-bold w-[75px]">10</h1>
                            <h1 className="w-[75px] text-sm text-secondary-100">
                                Years experiences
                            </h1>
                        </div>

                        {/* Section 2 */}
                        <div className="flex items-center gap-5 px-2 lg:px-8">
                            <h1 className="text-3xl font-bold w-[75px]">250</h1>
                            <h1 className="w-[75px] text-sm text-secondary-100">
                                types of courses
                            </h1>
                        </div>
                        <div></div>
                    </div>
                    <img
                        src={timelineImage}
                        alt="timelineImage"
                        className="h-[400px] w-full rounded-3xl border border-gray-700 object-cover shadow-2xl shadow-black/20 lg:h-fit"
                    />
                </div>
            </div>
        </div>

    )
}

export default TimelineSection