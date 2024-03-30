import { createBrowserRouter } from "react-router-dom";
import LayoutPrimary from "../layout";
import {
  CourseSkills,
  CourseTitle,
  addCourseType,
  addNewStudent,
  clientFeedback,
  dashBoardRoute,
  faq,
  loginRoute,
  ourTeam,
  pendingPaymentRoutes,
  skillDetails,
  studentRecordRoutes,
  subAdminRecordRoutes,
  teacherRecordRoutes,
  viewCourseCardDetails,
} from "./PagesRoutes";
import Dashboard from "../pages/dashboard";
import StudentRecord from "../pages/studentRecord";
import LoginLayout from "../pages/auth";
import Login from "../pages/auth/Login";
import TeacherRecord from "../pages/teacherRecord";
import SubAdminList from "../pages/subAdmin";
import AddNewStudentForm from "../pages/addNewStudent";
import PendingPayment from "../pages/paymentRecord/PendingPayment";
import OurTeam from "../pages/ourTeam";
import Faq from "../pages/faq";
import ViewCourseCardDetails from "../pages/viewCourseCardDetails";
import PageNotFound from "../pages/pageNotFound";
import CreateCourseTitle from "../pages/createCourseTitle";
import AddCourseSkills from "../pages/addCourseSkills";
import ClientFeedback from "../pages/clientFeedback";
import AddCourseTypes from "../pages/addCourseType";
import AddSkillsDetails from "../pages/addSkillDetails";

const userType = localStorage.getItem("userType");

const userType3 = userType == 3; //Pooja
const userType2 = userType == 2; //Ritik
const userType5 = userType == 5; //Rajesh

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
        path: userType2 || userType5 ? `${skillDetails}/:id` : "",
        element: <AddSkillsDetails />,
      },
      {
        path: userType2 || userType2 || userType5 ? clientFeedback : "",
        element: <ClientFeedback />,
      },
      {
        path: userType2 || userType5 ? CourseTitle : "",
        element: <CreateCourseTitle />,
      },
      {
        path: userType2 || userType5 ? addCourseType : "",
        element: <AddCourseTypes />,
      },
      {
        path: userType2 || userType5 ? CourseSkills : "",
        element: <AddCourseSkills />,
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
