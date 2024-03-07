import { createBrowserRouter } from "react-router-dom";
import LayoutPrimary from "../layout";
import {
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrimary />,
    children: [
      {
        path: dashBoardRoute,
        element: <Dashboard />,
      },
      {
        path: ourTeam,
        element: <OurTeam />,
      },
      {
        path: createCourses,
        element: <CreateCourses />,
      },
      {
        path: deletedRequestRoutes,
        element: <DeletedRequest />,
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
        path: subAdminRecordRoutes,
        element: <SubAdminList />,
      },
      {
        path: addNewStudent,
        element: <AddNewStudentForm />,
      },
      {
        path: addNewStudent,
        element: <AddNewStudentForm />,
      },
      {
        path: courseCategoryDetails,
        element: <CourseCategoryDetails />,
      },
      {
        path: faq,
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
      {
        path: signUp,
        element: <SignUp />,
      },
    ],
  },
]);
