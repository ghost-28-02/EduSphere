import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../../common/Button';

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

function LearningGrid() {
    return (
        <div className="mx-auto mb-12 grid w-full max-w-7xl lg:gap-6 xl:gap-0 grid-cols-1 px-4 lg:grid-cols-2 xl:grid-cols-4">
            {LearningGridArray.map((card, index) => (
                <div
                    key={index}
                    className={`
                        lg:rounded-lg xl:rounded-none
                        ${index === 0 ? "xl:col-span-2" : ""}
                        ${card.order === 3 ? "xl:col-start-2" : ""}
                        ${card.order % 2 === 1 ? "bg-richblack-700" : card.order % 2 === 0 ? "bg-richblack-800" : "bg-transparent"}
                        min-h-[294px]
                    `}
                >
                    {card.order < 0 ? (
                        <div className="flex h-full w-full flex-col gap-3 p-8">
                            <div className="text-4xl font-semibold">
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className="text-richblack-300 font-medium">
                                {card.description}
                            </p>
                            <div className="mt-2 w-fit">
                                <CTAButton linkto={card.BtnLink} active>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full flex-col gap-6 p-8">
                            <p className="text-lg text-richblack-5">{card.heading}</p>
                            <p className="font-medium text-richblack-300">
                                {card.description}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default LearningGrid;