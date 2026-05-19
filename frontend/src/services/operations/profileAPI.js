
import { setLoading, setUser } from '../../slices/profileSlice';
import { apiConnector } from '../apiConnector';
import { profileEndpoints } from '../apis';
import { logout } from './authAPI';
import toast from 'react-hot-toast';

const {
    GET_USER_DETAILS_API,
    GET_INSTRUCTOR_DATA_API,
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints;

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "GET",
                GET_USER_DETAILS_API,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            console.log("GET_USER_DETAILS API RESPONSE............", response)
            if (!response.data.success) {
                const msg = response.data.message;
                toast.error(msg, { id: toastId });
                setLoading(false);
                return;
            }

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser({ ...response.data.user, image: userImage }))
        } catch (error) {
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            const errorMessage = error.response?.data?.message || error.message || "Could Not Get User Details";
            toast.error(errorMessage, { id: toastId });
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token) {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )

        if (!response.data.success) {
            const msg = response.data.message;
            toast.error(msg, { id: toastId });
            return;
        }

        result = response?.data?.data;
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        const errorMessage = error.response?.data?.message || error.message || "Could Not Get Enrolled Courses";
        toast.error(errorMessage, { id: toastId });
    }

    toast.dismiss(toastId)

    return result;
}

export async function getInstructorDetails(token) {
    let result = [];

    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_DATA_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET_INSTRUCTOR_API_RESPONSE", response);

        if (!response.data.success) {
            const msg = response.data.message;
            toast.error(msg, { id: toastId });
            return;
        }

        result = response?.data?.courses;

    } catch (error) {
        console.log("GET_INSTRUCTOR_API ERROR", error);
        const errorMessage = error.response?.data?.message || error.message || "Could not Get Instructor Data";
        toast.error(errorMessage, { id: toastId });
    }

    toast.dismiss(toastId)

    return result;
}