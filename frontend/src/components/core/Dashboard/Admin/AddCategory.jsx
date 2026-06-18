import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import { createCategory } from "../../../../services/operations/adminAPI"
import IconBtn from "../../../common/IconBtn"

export default function AddCategory() {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    const success = await createCategory(data, token)
    setLoading(false)
    if (success) {
      reset()
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-medium text-white">Add Category</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 rounded-xl border border-gray-700 bg-primary-700 p-8 px-12 shadow-sm shadow-black/20"
      >
        {/* Category Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="label-style">
            Category Name <sup className="text-coral-500">*</sup>
          </label>
          <input
            id="name"
            placeholder="Enter category name"
            className="form-style"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="-mt-1 text-[12px] text-coral-500">
              Category name is required.
            </span>
          )}
        </div>

        {/* Category Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="label-style">
            Description <sup className="text-coral-500">*</sup>
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Enter category description"
            className="form-style resize-none"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="-mt-1 text-[12px] text-coral-500">
              Description is required.
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <IconBtn
            type="submit"
            disabled={loading}
            text={loading ? "Creating..." : "Create Category"}
          />
        </div>
      </form>
    </div>
  )
}
