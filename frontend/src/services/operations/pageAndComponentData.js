import {toast} from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import {catalogData} from "../apis"

export const getCatalogaPageData = async (categoryId) => {
    let result = []

    try {
        
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
            categoryId: categoryId
        })

        if(!response?.data?.success){
            const msg = response?.data?.message
            toast.error(msg)
            return
        }

        console.log("CATALOGPAGEDATA_API API RESPONSE.......", response)
        result = response?.data?.data
    } catch (error) {
        console.log("CATALOGPAGEDATA_API API ERROR......", error)
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to catalog data"
        toast.error(errorMessage)
    }

    return result
}