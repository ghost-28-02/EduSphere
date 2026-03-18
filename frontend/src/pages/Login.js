import loginImg from "../assets/Images/login.webp"
import Spinner from "../components/common/Spinner";
import Template from "../components/core/Auth/Template"
import { useSelector } from "react-redux";

function Login() {

  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <Template
            title="Welcome Back"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            image={loginImg}
            formType="login"
          />
        )
      }
    </>
  )
}

export default Login