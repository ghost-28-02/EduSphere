import React from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

function Dashboard() {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-primary-800 text-white">
            <Sidebar />

            <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto bg-primary-800">
                <div className="mx-auto w-10/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;