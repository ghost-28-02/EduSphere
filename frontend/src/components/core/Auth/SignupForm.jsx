import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from '../../common/Tab'



function SignupForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    const signupData = {
      ...formData,
      accountType
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR
    }
  ]

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:gap-x-4">
          <label>
            <p className="mb-1 text-sm font-medium leading-6 text-white">
              First Name <sup className="text-coral-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-xl border border-gray-700 bg-primary-600 px-4 py-3 text-white placeholder:text-gray-400 shadow-sm shadow-black/10 outline-none transition duration-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500"
            />
          </label>
          <label>
            <p className="mb-1 text-sm font-medium leading-6 text-white">
              Last Name <sup className="text-coral-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-xl border border-gray-700 bg-primary-600 px-4 py-3 text-white placeholder:text-gray-400 shadow-sm shadow-black/10 outline-none transition duration-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-sm font-medium leading-6 text-white">
            Email Address <sup className="text-coral-500">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-xl border border-gray-700 bg-primary-600 px-4 py-3 text-white placeholder:text-gray-400 shadow-sm shadow-black/10 outline-none transition duration-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500"
          />
        </label>
        <div className="flex flex-col gap-4 md:flex-row md:gap-x-4">
          <label className="relative">
            <p className="mb-1 text-sm font-medium leading-6 text-white">
              Create Password <sup className="text-coral-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-xl border border-gray-700 bg-primary-600 px-4 py-3 pr-10 text-white placeholder:text-gray-400 shadow-sm shadow-black/10 outline-none transition duration-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-gray-400 transition hover:text-white"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-sm font-medium leading-6 text-white">
              Confirm Password <sup className="text-coral-500">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-xl border border-gray-700 bg-primary-600 px-4 py-3 pr-10 text-white placeholder:text-gray-400 shadow-sm shadow-black/10 outline-none transition duration-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-gray-400 transition hover:text-white"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-xl bg-secondary-500 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-secondary-600 hover:shadow-lg hover:shadow-black/20"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm