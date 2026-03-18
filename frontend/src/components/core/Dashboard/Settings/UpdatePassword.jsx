import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const newPassword = watch("newPassword")

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Password
        </h2>

        <div className="flex flex-col gap-5">

          <div>
            {/* Old Password */}
            <div className="relative flex flex-col gap-2 lg:w-[50%]">
              <label htmlFor="oldPassword" className="lable-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                className="form-style"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((p) => !p)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye size={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="text-xs text-yellow-100">
                  Current password is required
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* New Password */}
            <div className="relative flex flex-col gap-2 lg:w-[50%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="form-style"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((p) => !p)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye size={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="text-xs text-yellow-100">
                  New password is required
                </span>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="relative flex flex-col gap-2 lg:w-[50%]">
              <label htmlFor="confirmNewPassword" className="lable-style">
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmNewPassword"
                className="form-style"
                {...register("confirmNewPassword", {
                  required: true,
                  validate: (value) => value === newPassword,
                })}
              />
              <span
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye size={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.confirmNewPassword && (
                <span className="text-xs text-yellow-100">
                  Passwords do not match
                </span>
              )}
            </div>
          </div>



        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
    </form>
  )
}