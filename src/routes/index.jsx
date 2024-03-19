import { createBrowserRouter } from "react-router-dom";
import LayoutPrimary from "../layout";
import {
  addCourseDetails,
  addNewStudent,
  courseCategoryDetails,
  createCourses,
  dashBoardRoute,
  deletedRequestRoutes,
  faq,
  loginRoute,
  ourTeam,
  pendingPaymentRoutes,
  signUp,
  studentRecordRoutes,
  subAdminRecordRoutes,
  teacherRecordRoutes,
  viewCourseCardDetails,
} from "./PagesRoutes";
import CreateCourses from "../pages/createCourses";
import DeletedRequest from "../pages/deletedRequest";
import Dashboard from "../pages/dashboard";
import StudentRecord from "../pages/studentRecord";
import LoginLayout from "../pages/auth";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import TeacherRecord from "../pages/teacherRecord";
import SubAdminList from "../pages/subAdmin";
import AddNewStudentForm from "../pages/addNewStudent";
import PendingPayment from "../pages/paymentRecord/PendingPayment";
import OurTeam from "../pages/ourTeam";
import CourseCategoryDetails from "../pages/courseCategoryDetails";
import Faq from "../pages/faq";
import ViewCourseCardDetails from "../pages/viewCourseCardDetails";
import AddCourseDetails from "../pages/addCourseDetails";
import PageNotFound from "../pages/pageNotFound";

const userType = localStorage.getItem("userType");

const userType3 = userType == 3;
const userType2 = userType == 2;
const userType5 = userType == 5;

export const router = createBrowserRouter([
  {
    path: dashBoardRoute,
    element: <LayoutPrimary />,
    children: [
      {
        path: dashBoardRoute,
        element: <Dashboard />,
      },
      {
        path: userType3 || userType5 ? ourTeam : "",
        element: <OurTeam />,
      },
      {
        path: userType2 || userType5 ? createCourses : "",
        element: <CreateCourses />,
      },
      {
        path: userType5 ? deletedRequestRoutes : "",
        element: <DeletedRequest />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: studentRecordRoutes,
        element: <StudentRecord />,
      },
      {
        path: pendingPaymentRoutes,
        element: <PendingPayment />,
      },
      {
        path: teacherRecordRoutes,
        element: <TeacherRecord />,
      },
      {
        path: userType5 ? subAdminRecordRoutes : "",
        element: <SubAdminList />,
      },
      {
        path: userType3 || userType5 ? addNewStudent : "",
        element: <AddNewStudentForm />,
      },
      {
        path: userType2 || userType5 ? `${viewCourseCardDetails}/:id` : "",
        element: <ViewCourseCardDetails />,
      },
      {
        path: userType2 || userType5 ? `${addCourseDetails}/:id` : "",
        element: <AddCourseDetails />,
      },
      {
        path: userType2 || userType5 ? courseCategoryDetails : "",
        element: <CourseCategoryDetails />,
      },
      {
        path: userType2 || userType3 || userType5 ? faq : "",
        element: <Faq />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: loginRoute,
        element: <Login />,
      },
    ],
  },
]);
