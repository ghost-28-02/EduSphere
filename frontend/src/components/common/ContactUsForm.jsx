import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import toast from 'react-hot-toast';
import countrycode from '../../data/countrycode.json';

function ContactUsForm() {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactform = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            );

            console.log("CONTACT US RESPONSE:", response);

            if (!response?.data?.success) {
                toast.error(response?.data?.message || "Something went wrong");
                toast.dismiss(toastId);
                return false;
            }

            toast.success(response.data.message);
            return true;

        } catch (error) {
            console.error("CONTACT US ERROR:", error);
            const errorMessage =
                error.response?.data?.error ||
                error.message ;

            toast.error(errorMessage);
            return false;

        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            })
        }
    }, [isSubmitSuccessful, reset])
    return (
        <form onSubmit={handleSubmit(submitContactform)} className="flex flex-col gap-7 rounded-3xl border border-gray-700 bg-primary-700 p-6 text-white shadow-xl shadow-black/10 sm:p-8">

            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='firstName' className="text-sm font-medium text-gray-200">First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        className="rounded-xl border border-gray-700 bg-primary-800 px-4 py-3 text-[16px] leading-6 text-white placeholder:text-gray-400 focus:border-secondary-500 focus:outline-none"
                        {...register("firstName", { required: true })}
                    />
                    {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-accent-500">Please Enter Your Name</span>
                        )
                    }
                </div>

                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastName' className="text-sm font-medium text-gray-200">Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        className="rounded-xl border border-gray-700 bg-primary-800 px-4 py-3 text-[16px] leading-6 text-white placeholder:text-gray-400 focus:border-secondary-500 focus:outline-none"
                        {...register("lastName")}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor='email' className='text-sm font-medium text-gray-200'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    className='rounded-xl border border-gray-700 bg-primary-800 px-4 py-3 text-[16px] leading-6 text-white placeholder:text-gray-400 focus:border-secondary-500 focus:outline-none'
                    {...register("email", { required: true })}
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-accent-500">
                            Please enter your Email address.
                        </span>
                    )
                }
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor='phonenumber' className="text-sm font-medium text-gray-200">Phone Number</label>
                <div className="flex gap-5">
                    <div className="flex w-20 flex-col gap-2">
                        <select
                            name='dropdown'
                            id='dropdown'
                            className='rounded-xl border border-gray-700 bg-primary-800 px-3 py-3 text-[16px] leading-6 text-white focus:border-secondary-500 focus:outline-none'
                            {...register("countryCode", { required: true })}
                        >
                            {
                                countrycode.map((e, i) => {
                                    return (
                                        <option key={i} value={e.code}>
                                            {e.code} - {e.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <input
                            type='number'
                            name='phoneNo'
                            id='PhoneNo'
                            placeholder='12345 67890'
                            className='rounded-xl border border-gray-700 bg-primary-800 px-4 py-3 text-[16px] leading-6 text-white placeholder:text-gray-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                            {...register('phoneNo', {
                                required: { value: true, message: "Please Enter Phone Number" },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                                minLength: { value: 10, message: "Invalid Phone Number" }
                            })}
                        />
                        {
                            errors.phoneNo && (
                                <span className="-mt-1 text-[12px] text-accent-500">
                                    {errors.phoneNo.message}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor='message' className='text-sm font-medium text-gray-200'>Message</label>
                <textarea
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="rounded-xl border border-gray-700 bg-primary-800 px-4 py-3 text-[16px] leading-6 text-white placeholder:text-gray-400 focus:border-secondary-500 focus:outline-none"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="-mt-1 text-[12px] text-accent-500">
                        Please enter your Message.
                    </span>
                )}
            </div>

            <button
                disabled={loading}
                type="submit"
                className={`rounded-full bg-secondary-500 px-6 py-3 text-center text-[13px] font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:bg-secondary-600 hover:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-700 sm:text-[16px] `}
            >
                Send Message
            </button>

        </form>
    )
}

export default ContactUsForm;