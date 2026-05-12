import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
import { BiArrowBack } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';
import { sendOtp } from '../services/operations/authAPI';
import Spinner from '../components/common/Spinner';

function VerifyEmail() {

    const [otp, setOtp] = useState("");
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    }, []);

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData;

        dispatch(
            signUp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        );
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-primary-800 p-4">
            {loading ? (
                <Spinner />
            ) : (
                <div className="w-full max-w-md p-6 lg:p-8 bg-primary-700 rounded-xl border border-gray-700">
                    <p className="text-white font-semibold text-2xl leading-8">Verify Email</p>
                    <p className="text-gray-300 text-base leading-relaxed my-4">
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={handleVerifyAndSignup}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder='-'
                                    style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                               }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-primary-800 rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-secondary-600"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-secondary-500 py-3 rounded-md mt-6 font-medium text-white hover:bg-secondary-600 transition"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to={'/signup'}>
                            <p className="text-white flex items-center gap-x-2">
                                <BiArrowBack /> Back To Signup
                            </p>
                        </Link>
                        <button
                            className="flex items-center text-gray-300 gap-x-2 hover:text-secondary-500"
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail;