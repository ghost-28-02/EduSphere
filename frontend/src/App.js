import { Route, Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css';
import Navbar from "./components/common/Navbar";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import Error from './pages/Error';
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Settings from './components/core/Dashboard/Settings/Index';
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from './components/core/Dashboard/Cart/index';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse/index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import AdminDashboard from "./components/core/Dashboard/Admin/AdminDashboard";
import AddCategory from "./components/core/Dashboard/Admin/AddCategory";
import Categories from "./components/core/Dashboard/Admin/Categories";


const App = () => {

  const {user} = useSelector((state) => state.profile);
  return (
    <div>
      <Navbar />
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />

          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            } />

          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            } />

          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            } />

          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            } />

          <Route
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            } />

          <Route
            path="/about"
            element={
              <About />
            }
          />

          <Route
            path="/contact"
            element={
              <Contact />
            }
          />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }>
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="dashboard/cart" element={<Cart />} />
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/my-courses" element={<MyCourses/>} />
                <Route path="dashboard/add-course" element={<AddCourse/>} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
                </>
              )
            }
            {
              user?.accountType === ACCOUNT_TYPE.ADMIN && (
                <>
                  <Route path="dashboard/admin" element={<AdminDashboard />} />
                  <Route path="dashboard/add-category" element={<AddCategory />} />
                  <Route path="dashboard/categories" element={<Categories />} />
                </>
              )
            }
          </Route>

          <Route element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              )
            }
          </Route>



          <Route path="*" element={<Error />} />
        </Routes>


      </div>
    </div>
  );
};

export default App;
