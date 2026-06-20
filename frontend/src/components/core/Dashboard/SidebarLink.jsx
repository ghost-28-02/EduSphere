import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import * as FaIcons from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
// import { resetCourseState } from "../../../slices/courseSlice"

const Icons = { ...VscIcons, ...FaIcons };

const SidebarLink = ({link, iconName, onClick}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }

    return (
    <NavLink
        to={link.path}
        onClick={onClick}
        className={`relative px-8 py-3 text-sm font-medium transition-all duration-200 ${matchRoute(link.path) ? "bg-primary-800 text-secondary-500" : "bg-transparent text-gray-300 hover:bg-primary-800/70 hover:text-white"}`}
    >
        <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-secondary-500 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

        <div className='flex items-center gap-x-3'>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink;