import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';
import { getPasswordResetToken } from '../services/operations/authAPI';
import Spinner from '../components/common/Spinner';

function ForgotPassword() {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading ? (
                    <Spinner/>
                ) : (
                    <div className="w-full max-w-[500px] p-6 lg:p-8 bg-richblack-900 rounded-xl shadow-lg">

                        
                        <p className="text-richblack-5 text-3xl font-semibold">
                            {!emailSent ? "Reset Your Password" : "Check Your Email"}
                        </p>

                        
                        <p className="mt-4 text-richblack-100 text-lg leading-relaxed">
                            {
                                !emailSent
                                    ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                                    : `We have sent the reset email to ${email}`
                            }
                        </p>

                        
                        <form className="mt-6 space-y-4" onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label className="block">
                                        <p className="mb-1 text-sm text-richblack-200">
                                            Email Address
                                        </p>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="
                                                    w-full rounded-lg bg-richblack-800 p-3
                                                    text-richblack-5 placeholder-richblack-400
                                                    focus:outline-none focus:ring-2 focus:ring-yellow-50
                                                "
                                        />
                                    </label>
                                )
                            }
                            <button
                                type="submit"
                                className="
                                    w-full rounded-lg bg-yellow-50 py-3
                                    font-medium text-richblack-900
                                    hover:bg-yellow-100 transition-all
                                    "
                            >
                                {!emailSent ? "Reset Password" : "Resend Email"}
                            </button>
                        </form>

                        <div className='mt-6 text-center'>
                            <Link to={'/login'} className='text-sm text-richblack-200 hover:text-yellow-50 transition flex items-center gap-2'>
                                <BiArrowBack/> Back to login
                            </Link>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;