import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services//operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../common/Spinner';
import SidebarLink from './SidebarLink';
import { NavLink, useNavigate } from 'react-router-dom';
import * as VscIcons from 'react-icons/vsc';
import * as FaIcons from 'react-icons/fa';
import { VscSignOut, VscSettingsGear} from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

const Icons = { ...VscIcons, ...FaIcons };

function Sidebar() {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){
        return (
            <Spinner/>
        )
    }

    const logoutModalData = {
        text1: "Are You Sure ?",
        text2: "You will be Logged out of your Account",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: () => dispatch(logout(navigate)),
        btn2Handler: () => setConfirmationModal(null),
    };

    const bottomBarLinkClass = ({ isActive }) =>
        `flex items-center justify-center rounded-lg p-2 text-2xl transition-colors duration-200 ${isActive ? 'text-secondary-500' : 'text-gray-300 hover:text-white'}`;

  return (
    <>
        {/* Desktop sidebar */}
        <div className="hidden h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-r-gray-700 bg-primary-700 py-10 shadow-lg shadow-black/10 md:flex">

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                        )
                    })
                }
            </div>

            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-700" ></div>

            <div className='flex flex-col'>
                <SidebarLink link={{name: "Settings", path: "dashboard/settings"}} iconName={"VscSettingsGear"} />

                <button onClick={() => setConfirmationModal(logoutModalData)}
                className="px-8 py-2 text-sm font-medium text-gray-300 transition hover:text-white"
                >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <p>Logout</p>
                    </div>
                </button>
            </div>

        </div>

        {/* Mobile bottom navigation - icons only */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-700 bg-primary-700 px-2 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.25)] md:hidden">
            {
                sidebarLinks.map((link) => {
                    if(link.type && user?.accountType !== link.type) return null;
                    const Icon = Icons[link.icon];
                    return (
                        <NavLink
                            key={link.id}
                            to={link.path}
                            title={link.name}
                            aria-label={link.name}
                            className={bottomBarLinkClass}
                        >
                            {Icon ? <Icon /> : null}
                        </NavLink>
                    )
                })
            }

            <NavLink
                to="/dashboard/settings"
                title="Settings"
                aria-label="Settings"
                className={bottomBarLinkClass}
            >
                <VscSettingsGear />
            </NavLink>

            <button
                type="button"
                onClick={() => setConfirmationModal(logoutModalData)}
                title="Logout"
                aria-label="Logout"
                className="flex items-center justify-center rounded-lg p-2 text-2xl text-gray-300 transition-colors duration-200 hover:text-white"
            >
                <VscSignOut />
            </button>
        </div>

        {confirmationModal && <ConfirmationModal modaldata={confirmationModal}/>}
    </>
  )
}

export default Sidebar;
