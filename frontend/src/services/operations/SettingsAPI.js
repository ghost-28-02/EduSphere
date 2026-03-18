import toast from 'react-hot-toast';
import { settingsEndpoints } from '../apis';
import { apiConnector } from '../apiConnector';
import { logout } from './authAPI'
import { setUser } from '../../slices/profileSlice';

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )

            if (!response.data.success) {
                const msg = response.data.message;
                toast.error(msg);
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                return;
            }

            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))

            console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            const errorMessage = error.response?.data?.message || error.message || "Update failed";
            toast.error(errorMessage);
        }

        toast.dismiss(toastId)
    }
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            console.log("UPDATE_PROFILE_API API RESPONSE............", response.data.data)

            if (!response.data.success) {
                const msg = response.data.message;
                toast.error(msg);
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                return;
            }

            const userImage = response?.data?.data?.image
                ? response?.data?.data?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.data?.firstName} ${response?.data?.data?.lastName}`
            
            dispatch(setUser({ ...response.data.data, image: userImage }))
            toast.success("Profile Updated Successfully")

        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            const errorMessage = error.response?.data?.message || error.message || "Update failed";
            toast.error(errorMessage);
        }

        toast.dismiss(toastId)
    }
}

export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

        if (!response.data.success) {
            const msg = response.data.message;
            toast.error(msg);
            dispatch(setLoading(false));
            toast.dismiss(toastId);
            return;
        }
        toast.success("Password Changed Successfully")
    } catch (error) {
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        const errorMessage = error.response?.data?.message || error.message || "Password Update failed";
        toast.error(errorMessage);
    }
    toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`,
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if (!response.data.success) {
                const msg = response.data.message;
                toast.error(msg);
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                return;
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            const errorMessage = error.response?.data?.message || error.message || "Deletion failed";
            toast.error(errorMessage);
        }
        toast.dismiss(toastId)
    }
}