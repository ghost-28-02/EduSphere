import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { adminEndpoints } from "../apis"

const {
  CREATE_CATEGORY_API,
  SHOW_ALL_CATEGORIES_API,
  GET_ALL_COURSES_API,
} = adminEndpoints

// Create a new category (Admin only)
export async function createCategory(data, token) {
  const toastId = toast.loading("Creating category...")
  let success = false
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_API,
      {
        name: data.name,
        description: data.description,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("CREATE_CATEGORY_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Category created successfully", { id: toastId })
    success = true
  } catch (error) {
    console.log("CREATE_CATEGORY_API ERROR............", error)
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Could not create category"
    toast.error(errorMessage, { id: toastId })
  }
  return success
}

// Fetch all categories
export async function getAllCategories() {
  let result = []
  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API)

    console.log("SHOW_ALL_CATEGORIES_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    result = response?.data?.allCategorys || []
  } catch (error) {
    console.log("SHOW_ALL_CATEGORIES_API ERROR............", error)
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Could not fetch categories"
    toast.error(errorMessage)
  }
  return result
}

// Fetch all courses (used for platform overview stats)
export async function getAllCourses() {
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSES_API)

    console.log("GET_ALL_COURSES_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    result = response?.data?.data || []
  } catch (error) {
    console.log("GET_ALL_COURSES_API ERROR............", error)
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Could not fetch courses"
    toast.error(errorMessage)
  }
  return result
}
