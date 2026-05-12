import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { logout } from "../../../services/operations/authAPI"

function ProfileDropDown() {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));
  if (!user) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(prev => !prev)} className="flex items-center gap-x-2 focus:outline-none">
        <img src={user?.image} alt={`profile-${user?.firstName}`} className="h-8 w-8 rounded-full object-cover" />
        <AiOutlineCaretDown className="text-sm text-white" />
      </button>
      {open && (
        <div onClick={(e) => e.stopPropagation()} ref={ref} className="absolute top-[110%] right-0 z-[1000] w-48 overflow-hidden rounded-md border border-gray-700 bg-primary-700 shadow-lg divide-y divide-gray-700">
          <Link to={'/dashboard/my-profile'} onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-2 py-2 px-3 text-sm text-white hover:bg-primary-600 hover:text-white transition">
              <VscDashboard className="text-lg" />
              <span>Dashboard</span>
            </div>
          </Link>
          <div onClick={() => { dispatch(logout(navigate)); setOpen(false); }} className="flex w-full items-center gap-x-2 py-2 px-3 text-sm text-white hover:bg-primary-600 hover:text-white transition cursor-pointer">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropDown;