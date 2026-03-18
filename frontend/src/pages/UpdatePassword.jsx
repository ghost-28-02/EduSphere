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
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className="w-full max-w-[500px] p-6 lg:p-8 bg-richblack-900 rounded-xl shadow-lg">

                        {/* Heading */}
                        <p className="text-3xl font-semibold text-richblack-5">
                            Choose New Password
                        </p>

                        {/* Subheading */}
                        <p className="mt-3 text-lg text-richblack-100 leading-relaxed">
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
                                    <p className="mb-1 text-sm text-richblack-200">
                                        New Password <sup className="text-pink-200">*</sup>
                                    </p>

                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder="Enter password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="
                                            w-full rounded-lg bg-richblack-800 p-3 pr-12
                                            text-richblack-5 placeholder-richblack-400
                                            focus:outline-none focus:ring-2 focus:ring-yellow-50
                                        "
                                    />

                                    <span
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute right-3 top-[38px] cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible size={24} className="text-richblack-300" />
                                        ) : (
                                            <AiOutlineEye size={24} className="text-richblack-300" />
                                        )}
                                    </span>
                                </label>

                                {/* Confirm Password */}
                                <label className="relative">
                                    <p className="mb-1 text-sm text-richblack-200">
                                        Confirm New Password <sup className="text-pink-200">*</sup>
                                    </p>

                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder="Confirm password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="
                                            w-full rounded-lg bg-richblack-800 p-3 pr-12
                                            text-richblack-5 placeholder-richblack-400
                                            focus:outline-none focus:ring-2 focus:ring-yellow-50
                                        "
                                    />

                                    <span
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                        className="absolute right-3 top-[38px] cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <AiOutlineEyeInvisible size={24} className="text-richblack-300" />
                                        ) : (
                                            <AiOutlineEye size={24} className="text-richblack-300" />
                                        )}
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="
                                    mt-4 w-full rounded-lg bg-yellow-50 py-3
                                    font-medium text-richblack-900
                                    hover:bg-yellow-100 transition-all
                                "
                            >
                                Reset Password
                            </button>

                            {/* Back Link */}
                            <div className="mt-6 text-center">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-sm text-richblack-200 hover:text-yellow-50 transition"
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