import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { MdArrowDropDown } from "react-icons/md";

function Navbar() {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSunLinks] = useState([]);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSunLinks(result?.data?.allCategorys);
        } catch (error) {
            console.log("Could not fetch the category list");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    console.log(user);
    

    return (
        <div className={`sticky top-0 z-50 flex h-14 items-center justify-center border-b border-richblack-700 ${ location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"} transition-all duration-200`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to={"/"}>
                    <img src={Logo}
                        alt='Logo'
                        width={160}
                        height={42}
                    />
                </Link>
                <nav>
                    <ul className='flex flex-row gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index} >
                                        {
                                            link.title === "Catalog" ? (
                                                <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    <p>{link.title}</p>
                                                    <MdArrowDropDown />

                                                    <div className="invisible absolute left-1/2 top-full mt-3 -translate-x-1/2 z-[1000] flex w-[300px] flex-col rounded-md bg-richblack-5 p-4 text-richblue-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">

                                                        <div className="absolute left-1/2 -top-2  h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-richblack-5">
                                                        </div>

                                                        {subLinks.length ? (
                                                            subLinks.map((link, index) => (
                                                                <Link
                                                                    to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}
                                                                    key={index}
                                                                    className="rounded-lg py-3 px-4 hover:bg-richblack-50"
                                                                >
                                                                    {link.name}
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <p className="py-4 text-center text-sm">
                                                                No Courses Found
                                                            </p>
                                                        )}

                                                    </div>
                                                </div>
                                            ) : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : 'text-richblack-25'}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div className='flex gap-x-4 items-center '>

                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to={'/dashboard/cart'} className='relative'>
                                <FaShoppingCart className="text-white text-xl" />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -top-3 -right-3'>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className='bg-richblack-800 px-3 py-2 border border-richblack-700 text-richblack-100 rounded-lg'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={'/signup'}>
                                <button className='bg-richblack-800 px-3 py-2 border border-richblack-700 text-richblack-100 rounded-lg'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropDown />
                        )
                    }

                </div>
            </div>
        </div >
    )
}

export default Navbar;