import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useSelector } from "react-redux"
import Spinner from "../../common/Spinner"

function Template({ title, description1, description2, image, formType }) {
  
  const {loading} = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-primary-800 px-4 py-10 text-white">
      {loading ? (
        <Spinner/>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 rounded-3xl border border-gray-700 bg-primary-800/70 p-6 shadow-lg shadow-black/20 backdrop-blur-sm md:flex-row md:gap-y-0 md:gap-x-12 md:p-10">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-gray-300">
              <span className="text-gray-300">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-secondary-500">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template