import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from '../apis'

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints;

export const getAllCourses = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)

        if (!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("GET_ALL_COURSE_API API RESPONSE...........", response)

        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR........", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to load course details"
        toast.error(errorMessage)
    }

    return result
}

export const fetchCourseDetails = async (courseId) => {
    let result = [];
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        })

        if (!response?.data?.success) {
            const msg = response?.data?.message
            toast.error(msg)
            return
        }
        console.log("COURSE_DETAILS_API API RESPONSE............", response)

        result = response?.data?.data

    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to load course details"
        toast.error(errorMessage)
    }

    return result
}

export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("COURSE_CATEGORIES_API API RESPONSE..........", response)

        result = response?.data?.allCategorys

    } catch (error) {
        console.log("COURSE_CATEGORIES_API API ERROR.........", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to load category details"
        toast.error(errorMessage)
    }

    return result
}

export const addCourseDetails = async(data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("CREATE_COURSE_API API RESPONSE........", response)
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE_COURSE_API API ERROR.......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to create course"
        toast.error(errorMessage)
    }

    return result
}

export const editCourseDetails = async (data, token) => {
    let result = null;

    try {
        
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        } )

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("EDIT_COURSE_API API RESPONSE......", response)
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT_COURSE_API API ERROR......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to update course"
        toast.error(errorMessage)
    }

    return result
}

export const addSectionDetails = async (data, token) => {
    let result = null;

    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("CREATE_SECTION_API API RESPONSE......", response)
        toast.success("Course Section Created")
        result = response?.data?.updatedCourseDetails
    } catch (error) {
        console.log("CREATE_SECTION_API API ERROR.....", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to create section"
        toast.error(errorMessage)
    }
    return result
}

export const addSubsection = async (data, token) => {
    let result = null;

    try {
        
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("CREATE_SUBSECTION_API API RESPONSE......", response)
        toast.success("Course Subsection Created")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE_SUBSECTION_API API ERROR......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to create subsection"
        toast.error(errorMessage)
    }

    return result
}

export const updateSection = async (data, token) => {
    let result = null

    try {
        
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("UPDATE_SECTION_API API RESPONSE......", response)
        toast.success("Section updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE_SECTION_API API ERROR......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to update section"
        toast.error(errorMessage)
    }
    return result
}

export const updateSubsection = async (data, token) => {
    let result = null

    try {
        
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("UPDATE_SUBSECTION_API API RESPONSE.......", response)
        toast.success("Subsection Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE_SUBSECTION_API API ERROR......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to update subsection"
        toast.error(errorMessage)
    }
    return result
}

export const deleteSection = async (data, token) => {
    let result = null

    try {
        
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("DELETE_SECTION_API API RESPONSE......", response)
        toast.success("Section Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE_SECTION_API API ERROR.....", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to delete Section"
        toast.error(errorMessage)
    }
    return result
}

export const deleteSubsection = async (data, token) => {
    let result = null

    try {
        
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("DELETE_SUBSECTION_API API RESPONSE......", response)
        toast.success("Subsection Deleted")
        result = response?.data
    } catch (error) {
        console.log("DELETE_SUBSECTION_API API ERROR........", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to delete subsection"
        toast.error(errorMessage)
    }

    return result
}

export const deleteCourse = async (data, token) => {
    let result = null

    try {
        
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("DELETE_COURSE_API API RESPONSE......", response)
        toast.success("Course Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE_COURSE_API API ERROR........", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to delete course"
        toast.error(errorMessage)
    }

    return result
}

export const fetchInstructorCourses = async (token) => {
    let result = []

    try {
        
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("GET_ALL_INSTRUCTOR_COURSES_API API RESPONSE......", response)
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_INSTRUCTOR_COURSES_API API ERROR........", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to get courses"
        toast.error(errorMessage)
    }

    return result
}

export const getFullDetailsOfCourse = async (courseId, token) => {
    let result = null

    try {
        
        const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED, {courseId}, {
            Authorization: `Bearer ${token}`
        } )

        if(!response?.data?.success){
             const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED API RESPONSE......", response)
        result = response?.data?.data
    } catch (error) {
        console.log(" GET_FULL_COURSE_DETAILS_AUTHENTICATED API ERROR.....", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to get full course detail"
        toast.error(errorMessage)
    }

    return result
}

export const markLectureAsComplete = async (data, token) => {
    let result = null

    try {
        
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("LECTURE_COMPLETION_API API RESPONSE.......", response)
        toast.success("Lecture Completed")
        result = response?.data

    } catch (error) {
        console.log("LECTURE_COMPLETION_API API ERROR......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to make lecture complete"
        toast.error(errorMessage)
    }

    return result
}

export const createRating = async (data, token) => {
    let success = false

    try {
        
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`    
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("CREATE_RATING_API API RESPONSE.......", response)
        toast.success("Rating Created")
        success = true

    } catch (error) {
        success = false
        console.log("CREATE_RATING_API API ERROR......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to create Rating"
        toast.error(errorMessage)
    }

    return success
}