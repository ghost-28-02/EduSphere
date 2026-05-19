import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";

import { login } from '../../../services/operations/authAPI'


function LoginForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
 
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-8 flex w-full flex-col gap-y-5"
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setFormData({ email: 'sachindhoor333@gmail.com', password: 'student123' })}
          className="rounded-md border border-gray-600 bg-primary-700 px-3 py-1 text-sm text-white hover:bg-primary-600"
        >
          Fill Student
        </button>
        <button
          type="button"
          onClick={() => setFormData({ email: 'sachin.choudhary.cse@gmail.com', password: 'instructor123' })}
          className="rounded-md border border-gray-600 bg-primary-700 px-3 py-1 text-sm text-white hover:bg-primary-600"
        >
          Fill Instructor
        </button>
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
      <label className="relative">
        <p className="mb-1 text-sm font-medium leading-6 text-white">
          Password <sup className="text-coral-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-xl border border-gray-700 bg-primary-600 px-4 py-3 pr-12 text-white placeholder:text-gray-400 shadow-sm shadow-black/10 outline-none transition duration-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500"
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
        <Link to="/forgot-password">
          <p className="mt-2 ml-auto max-w-max text-xs font-medium text-secondary-500 transition hover:text-secondary-600">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-xl bg-secondary-500 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-secondary-600 hover:shadow-lg hover:shadow-black/20"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm