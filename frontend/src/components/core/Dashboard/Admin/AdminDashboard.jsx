import React, { useEffect, useState } from "react"
import { VscBook, VscFolderLibrary, VscMortarBoard } from "react-icons/vsc"
import { useSelector } from "react-redux"

import {
  getAllCategories,
  getAllCourses,
} from "../../../../services/operations/adminAPI"
import Spinner from "../../../common/Spinner"

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-x-4 rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary-800 text-2xl text-secondary-500">
        <Icon />
      </div>
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [courseData, categoryData] = await Promise.all([
        getAllCourses(),
        getAllCategories(),
      ])
      setCourses(courseData)
      setCategories(categoryData)
      setLoading(false)
    })()
  }, [])

  // Total enrolled students across all courses
  const totalEnrolled = courses.reduce(
    (acc, course) => acc + (course?.studentEnrolled?.length || 0),
    0
  )

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-white">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-sm font-medium text-gray-300">
          Here&apos;s an overview of the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={VscBook} label="Total Courses" value={courses.length} />
        <StatCard
          icon={VscFolderLibrary}
          label="Total Categories"
          value={categories.length}
        />
        <StatCard
          icon={VscMortarBoard}
          label="Total Enrollments"
          value={totalEnrolled}
        />
      </div>

      <div className="mt-10 rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20">
        <h2 className="mb-4 text-lg font-semibold text-white">Categories</h2>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-300">No categories created yet.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <span
                key={cat._id}
                className="rounded-full bg-primary-800 px-4 py-1 text-sm text-secondary-500"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
