import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services//operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../common/Spinner';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

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

  return (
    <div>
        
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-r-gray-700 bg-primary-700 py-10 shadow-lg shadow-black/10">

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink link={link} iconName={link.icon}  key={link.id}/>
                        )
                    })
                }
            </div>

            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-700" ></div>

            <div className='flex flex-col'>
                <SidebarLink link={{name: "Settings", path: "dashboard/settings"}} iconName={"VscSettingsGear"} />

                <button onClick={ () => setConfirmationModal({
                    text1: "Are You Sure ?",
                    text2: "You will be Logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                })}
                className="px-8 py-2 text-sm font-medium text-gray-300 transition hover:text-white"
                >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <p>Logout</p>
                    </div>


                </button>
            </div>

        </div>

        {confirmationModal && <ConfirmationModal modaldata={confirmationModal}/>}

    </div>
  )
}

export default Sidebar;