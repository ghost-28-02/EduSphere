import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart(){

    const {total, totalItems} = useSelector((state) => state.cart);

    return (
        <div>
            <h1 className="mb-14 text-3xl font-semibold text-white">Your Cart</h1>
            <p className="border-b border-b-gray-700 pb-2 font-semibold text-gray-400">
                {totalItems} Courses in Cart
            </p>

            {
                total > 0 
                ? (
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ) 
                : (
                    <div className="mt-14 text-center text-3xl text-gray-300">
                        <p>Your Cart is Empty</p>
                    </div>
                )
            }
        </div>
    )
}