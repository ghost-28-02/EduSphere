import React, { useEffect, useState } from 'react'
import IconBtn from '../components/common/IconBtn';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from "../utils/avgRating";
import Spinner from '../components/common/Spinner';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from "../components/common/RatingStars";
import Footer from "../components/common/Footer";
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import CourseDetailsCard from "../components/core/Course/CoursedetailsCard";
import ReactMarkdown from "react-markdown";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import { formatDate } from "../services/formatDate";
import { toast } from "react-hot-toast";
import { addToCart } from "../slices/cartSlice";
import { ACCOUNT_TYPE } from "../utils/constants";


function CourseDetails() {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const courseId = useParams();

    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isActive, setIsActive] = useState(Array(0))

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e != id)
        )
    }

    const getCourseFullDetails = async () => {
        try {
            const result = await fetchCourseDetails(courseId.courseId);
            setCourseData(result);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseFullDetails();
    }, [courseId]);

    useEffect(() => {
        const count = GetAvgRating(courseData?.courseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData]);

    useEffect(() => {
        let lecture = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lecture += sec.subSections.length;
        })
        setTotalNoOfLecture(lecture);
    }, [courseData]);


    const handleBuyCourse = async () => {
        if (token) {
            buyCourse(token, [courseId.courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1: "You are not Logged in",
            text2: "Please Login to Purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancle",
            btn1Handler: () => navigate('/login'),
            btn2Handler: setConfirmationModal(null)
        })

    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {
            dispatch(addToCart(courseData?.courseDetails))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if (loading || !courseData) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    // if (!courseData?.success) {
    //     return (
    //         <div>
    //             <Error />
    //         </div>
    //     )
    // }

    const {
        id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentEnrolled,
        createdAt,
    } = courseData?.courseDetails

    return (
        <>
            <div className={`relative w-full bg-primary-800`}>
                <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                    <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                        <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img
                                src={thumbnail}
                                alt="course thumbnail"
                                className="aspect-auto h-[220px] w-full rounded-lg object-cover sm:h-[300px]"
                            />
                        </div>
                        <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-white`}>
                            <div>
                                <p className="text-2xl font-bold text-richblack-5 sm:text-4xl lg:text-[42px]">
                                    {courseName}
                                </p>
                            </div>
                            <p className={`text-gray-300`}>{courseDescription}</p>
                            <div className="text-md flex flex-wrap items-center gap-2 text-gray-300">
                                <span className="text-accent-500 font-semibold">{avgReviewCount}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                <span className="">{`(${ratingAndReviews.length} reviews)`}</span>
                                <span className="">{`${studentEnrolled.length} students enrolled`}</span>
                            </div>
                            <div>
                                <p className="">
                                    Created By {`${instructor.firstName} ${instructor.lastName}`}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-5 text-lg text-gray-300">
                                <p className="flex items-center gap-2">
                                    <BiInfoCircle /> Created at {formatDate(createdAt)}
                                </p>
                                <p className="flex items-center gap-2">
                                    <HiOutlineGlobeAlt /> English
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-4 border-y border-y-gray-700 py-4 lg:hidden">
                            <p className="space-x-3 pb-4 text-3xl font-semibold text-white">
                                Rs. {price}
                            </p>
                            <button
                                className="cursor-pointer rounded-md bg-secondary-500 px-5 py-2 font-semibold text-white hover:bg-secondary-600 transition"
                                onClick={
                                    user && studentEnrolled.includes(user?._id)
                                        ? () => navigate("/dashboard/enrolled-courses")
                                        : handleBuyCourse
                                }
                            >
                                {user && studentEnrolled.includes(user?._id) ? "Go To Course" : "Buy Now"}
                            </button>
                            {(!user || !studentEnrolled.includes(user?._id)) && (
                                <button
                                    onClick={handleAddToCart}
                                    className="cursor-pointer rounded-md bg-primary-700 border border-gray-700 px-5 py-2 font-semibold text-accent-500 hover:bg-primary-600 transition"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="right-[3rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                        <CourseDetailsCard
                            course={courseData?.courseDetails}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>

            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">

                    <div className="my-8 border border-gray-700 rounded-2xl bg-primary-700 p-5 sm:p-8">
                        <p className="text-2xl font-semibold text-white sm:text-3xl">What you'll learn</p>
                        <div className="mt-5 text-gray-300">
                            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                        </div>
                    </div>

                    <div className="max-w-[830px] ">
                        <div className="flex flex-col gap-3">
                            <p className="text-2xl font-semibold text-white sm:text-[28px]">Course Content</p>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div className="flex flex-wrap gap-x-3 gap-y-1">
                                    <span>
                                        {courseContent.length} {`section(s)`}
                                    </span>
                                    <span>
                                        {totalNoOfLecture} {`lecture(s)`}
                                    </span>
                                    <span>{courseData?.totalDuration} total length</span>
                                </div>
                                <div>
                                    <button
                                        className="text-accent-500"
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all sections
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="py-4">
                            {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>

                        <div className="mb-12 py-4">
                            <p className="text-2xl font-semibold sm:text-[28px]">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                <img
                                    src={
                                        instructor.image
                                            ? instructor.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                            </div>
                            <p className="text-richblack-50">
                                {instructor?.additionalDetails?.about}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />

            {
                confirmationModal && (
                    <ConfirmationModal modaldata={confirmationModal} />
                )
            }
        </>
    )
}

export default CourseDetails;