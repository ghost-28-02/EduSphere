import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load", { id: toastId });
            return;
        }
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            order_id:orderResponse.data.message.id,
            name:"EduSphere",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            method: {
                card: true,
                upi: true,
                netbanking: true,
                wallet: true,
            },
            prefill: {
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email
            },
            handler: function(response) {
                
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
                
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed", { id: toastId });
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment", { id: toastId });
    }
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("payment Successful, you are addded to the course", { id: toastId });
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment", { id: toastId });
    }
    dispatch(setPaymentLoading(false));
}