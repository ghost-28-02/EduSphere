import React, { useState } from 'react'
import HomePageExplore from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="relative w-full bg-richblack-900">

            <div className="relative w-11/12 mx-auto text-center text-white flex flex-col items-center py-20">

                <div className="text-4xl font-semibold">
                    Unlock the <HighlightText text={"Power of Code"} />
                </div>

                <p className="text-richblack-300 text-lg mt-3">
                    Learn to Build Anything You Can Imagine
                </p>
                <div className="flex gap-4 rounded-full bg-richblack-800 mt-6 p-1 border-b border-richblack-500 mb-28">
                    {tabsName.map((element, index) => (
                        <div
                            key={index}
                            onClick={() => setMyCards(element)}
                            className={`px-8 py-2 rounded-full cursor-pointer transition-all duration-200
                                    ${currentTab === element
                                    ? "bg-richblack-900 text-richblack-5"
                                    : "text-richblack-300 hover:bg-richblack-900 hover:text-richblack-5"
                                }
                            `}
                        >
                            {element}
                        </div>
                    ))}
                </div>

                <div className="absolute -bottom-40 flex gap-14">
                    {courses.map((element, index) => (
                        <CourseCard
                            key={index}
                            course={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    ))}
                </div>

            </div>

        </div>
    )
}

export default ExploreMore;