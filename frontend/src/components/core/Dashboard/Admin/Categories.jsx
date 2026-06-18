import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getAllCategories } from "../../../../services/operations/adminAPI"
import IconBtn from "../../../common/IconBtn"
import Spinner from "../../../common/Spinner"

export default function Categories() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    setLoading(true)
    const data = await getAllCategories()
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-white">All Categories</h1>
        <IconBtn
          text="Add Category"
          onclick={() => navigate("/dashboard/add-category")}
        />
      </div>

      {categories.length === 0 ? (
        <p className="text-center text-lg text-gray-300">
          No categories found.
        </p>
      ) : (
        <div className="flex flex-col gap-y-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20"
            >
              <p className="text-lg font-semibold text-white">{cat.name}</p>
              <p className="mt-1 text-sm text-gray-300">
                {cat.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
