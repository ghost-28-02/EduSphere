import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

function UpdatePassword() {

    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handelOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }


    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-primary-800 p-4">
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className="w-full max-w-md p-6 lg:p-8 bg-primary-700 rounded-xl border border-gray-700 shadow-md">

                        {/* Heading */}
                        <p className="text-2xl font-semibold text-white">
                            Choose New Password
                        </p>

                        {/* Subheading */}
                        <p className="mt-3 text-base text-gray-300 leading-relaxed">
                            Almost done. Enter your new password and you are all set.
                        </p>

                        {/* Form */}
                        <form
                            onSubmit={handelOnSubmit}
                            className="mt-6 flex flex-col gap-4"
                        >

                            {/* Password Fields */}
                            <div className="flex flex-col gap-4">
                                {/* New Password */}
                                <label className="relative">
                                    <p className="mb-1 text-sm text-gray-300">
                                        New Password <sup className="text-coral-500">*</sup>
                                    </p>

                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder="Enter password"
                                        className="w-full rounded-md bg-primary-800 p-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 border border-gray-700"
                                    />

                                    <span
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute right-3 top-12 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white transition"
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible size={24} />
                                        ) : (
                                            <AiOutlineEye size={24} />
                                        )}
                                    </span>
                                </label>

                                {/* Confirm Password */}
                                <label className="relative">
                                    <p className="mb-1 text-sm text-gray-300">
                                        Confirm New Password <sup className="text-coral-500">*</sup>
                                    </p>

                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder="Confirm password"
                                        className="w-full rounded-md bg-primary-800 p-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 border border-gray-700"
                                    />

                                    <span
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                        className="absolute right-3 top-12 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white transition"
                                    >
                                        {showConfirmPassword ? (
                                            <AiOutlineEyeInvisible size={24} />
                                        ) : (
                                            <AiOutlineEye size={24} />
                                        )}
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-4 w-full rounded-md bg-secondary-500 py-3 font-medium text-white hover:bg-secondary-600 transition-all"
                            >
                                Reset Password
                            </button>

                            {/* Back Link */}
                            <div className="mt-6 text-center">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-secondary-500 transition"
                                >
                                    <BiArrowBack />
                                    Back to login
                                </Link>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword;