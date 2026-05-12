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
        <div className="relative w-full bg-gray-900 z-10">

            <div className="relative mx-auto flex w-11/12 flex-col items-center py-20 text-center text-white">

                <div className="text-3xl font-semibold leading-tight sm:text-4xl">
                    Unlock the <HighlightText text={"Power of Code"} />
                </div>

                <p className="mt-3 text-base text-gray-300 sm:text-lg">
                    Learn to Build Anything You Can Imagine
                </p>
                <div className="mt-6 mb-28 flex max-w-full flex-wrap justify-center gap-3 rounded-full border border-gray-700 bg-primary-700 p-2 shadow-lg shadow-black/20">
                    {tabsName.map((element, index) => (
                        <div
                            key={index}
                            onClick={() => setMyCards(element)}
                            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 sm:px-6
                                    ${currentTab === element
                                    ? "bg-primary-800 text-white shadow-md shadow-black/20"
                                    : "text-gray-300 hover:bg-primary-800 hover:text-white"
                                }
                            `}
                        >
                            {element}
                        </div>
                    ))}
                </div>

                <div className="grid w-full gap-6 lg:absolute lg:-bottom-40 lg:grid-cols-3 lg:gap-10">
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