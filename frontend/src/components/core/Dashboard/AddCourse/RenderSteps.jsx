import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/index';

function RenderSteps() {

    const { step } = useSelector((state) => state.course);
    // const step = 2;

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        }
    ]

    return (
        <div>
            <div className="relative mb-2 flex w-full justify-center">
                {steps.map((item) => (
                    <React.Fragment key={item.id}>
                        <div className="flex flex-col items-center">
                            <button className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border 
                                    ${step === item.id 
                                    ? "border-secondary-500 bg-secondary-500 text-white" 
                                    : "border-gray-700 bg-primary-700 text-gray-300"}
                                    ${step > item.id && "border-accent-500 bg-accent-500 text-primary-800"}`}
                            >
                                {
                                            step > item.id ? (<FaCheck className="font-bold text-primary-800"/>) : (item.id)
                                }
                            </button>
                        </div>
                        {
                            item.id !== steps.length && (
                                <>
                                    <div className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 
                                    ${step > item.id  ? "border-secondary-500" : "border-gray-700"}`}
                                    ></div>
                                </>
                            )
                        }
                    </React.Fragment>
                ))}
            </div>
            <div className="relative mb-16 flex w-full select-none justify-between">
                {
                    steps.map((item) => (
                        <React.Fragment key={item.id}>
                            <div className="flex min-w-[130px] flex-col items-center gap-y-2">
                                <p className={`text-sm ${step >= item.id ? "text-white" : "text-gray-400"}`}>
                                    {item.title}
                                </p>
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>

            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>} 
            {step === 3 && <PublishCourse/>}
        </div>
    )
}

export default RenderSteps;