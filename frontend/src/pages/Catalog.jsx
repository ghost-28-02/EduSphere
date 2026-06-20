import React, { useEffect, useState } from 'react'
import Footer from "../components/common/Footer"
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import { useSelector } from 'react-redux';
import Error from './Error'
import Spinner from '../components/common/Spinner';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';

function Catalog() {
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(false);


    const getCategories = async () => {
        try {
            setLoading(true);
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            if (res?.data?.success) {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const category_id =
                    res?.data?.allCategorys.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
                setCategoryId(category_id);
            }
            setLoading(false)
        } catch (error) {
            console.error("Error fetching categories:", error);
            setLoading(false);
        }
    }
    const getCategoryDetails = async () => {
        if (!categoryId) return;

        try {
            setLoading(true);
            const res = await getCatalogaPageData(categoryId);
            if (res) {
                setCatalogPageData(res);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching catalog details:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, [catalogName])

    useEffect(() => {
        getCategoryDetails();
    }, [categoryId])

    if (loading || !catalogPageData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner />
            </div>
        )
    }
    if (!loading && !catalogPageData) {
        return <Error />
    }


    return (
        <>
            <div className="box-content bg-primary-800 px-4">
                <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
                    <p className="text-sm text-gray-300">
                        {`Home / Catalog / `}
                        <span className="text-accent-500">
                            {catalogPageData?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl font-semibold text-white">
                        {catalogPageData?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-gray-300">
                        {catalogPageData?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

                <div className="mb-4 text-2xl lg:text-3xl font-semibold text-white">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-gray-700 text-sm">
                    <p className={`px-4 py-2 ${active === 1 ? "border-b border-b-accent-500 text-accent-500" : "text-gray-300"} cursor-pointer`}
                        onClick={() => setActive(1)}>Most Popular</p>
                    <p className={`px-4 py-2 ${active === 2 ? "border-b border-b-accent-500 text-accent-500" : "text-gray-300"} cursor-pointer`}
                        onClick={() => setActive(2)}>New</p>
                </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.selectedCategory?.course}/>
                </div>
            </div>

            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="mb-4 text-2xl lg:text-3xl font-semibold text-white">
                    Top courses in {catalogPageData?.differentCategory?.name}
                </div>
                <div className="py-8">
                    <CourseSlider Courses={catalogPageData?.differentCategory?.course}/>
                </div>
            </div>

            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="mb-4 text-2xl lg:text-3xl font-semibold text-white">Frequently Bought</div>
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {catalogPageData?.topSellingCourses?.slice(0, 4).map((course, i) => (
                                <Course_Card course={course} key={i} Height={"h-[220px] sm:h-[300px] lg:h-[400px]"} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Catalog;