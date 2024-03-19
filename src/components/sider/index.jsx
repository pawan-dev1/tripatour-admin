import { useState } from "react";
import { Menu } from "antd";
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
  studentRecordRoutes,
  subAdminRecordRoutes,
  teacherRecordRoutes,
} from "../../routes/PagesRoutes";
import { Link } from "react-router-dom";
import { MdDashboard, MdLogout, MdMenuBook, MdOutlineDeleteSweep } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa6";

///styles
import "./styles.scss";
import AreYouSure from "../popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";
const SiderComponent = () => {
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userType = localStorage.getItem("userType");

  const userType2= userType == 2;
  const userType3= userType == 3;
  const userType5= userType == 5;

  const items = [
    {
      key: "1",
      label: <Link to={dashBoardRoute}>Dashboard</Link>,
      icon: <MdDashboard />,
    },
    userType2 || userType5
      ? {
          key: "2",
          label: <Link to={createCourses}>Create Courses</Link>,
          icon: <MdMenuBook />,
        }
      : null,
      userType3 || userType5 ?
    {
      key: "ourTeam",
      label: <Link to={ourTeam}>Our Team</Link>,
      icon: <MdMenuBook />,
    }: null,
    userType2 || userType5 ?
    {
      key: "courseCategoryDetails",
      label: <Link to={courseCategoryDetails}>Course Categories</Link>,
      icon: <MdMenuBook />,
    }:null,
    {
      key: "faq",
      label: <Link to={faq}>Faq</Link>,
      icon: <MdMenuBook />,
    },
    userType5
      ? {
          key: "3",
          label: "Request",
          children: [
            {
              key: "4",
              label: <Link to={deletedRequestRoutes}>Courses Deleted</Link>,
              icon: <MdOutlineDeleteSweep />,
            },
          ],
        }
      : null,
    {
      key: "5",
      label: "Record",
      children: [

        {
          key: "6",
          label: <Link to={studentRecordRoutes}>Students</Link>,
          icon: <PiStudentBold />,
        },
        userType5 ?
        {
          key: "7",
          label: <Link to={subAdminRecordRoutes}>Sub Admin</Link>,
          icon: <PiStudentBold />,
        }:null,
        {
          key: "8",
          label: <Link to={teacherRecordRoutes}>Teacher</Link>,
          icon: <FaRegCreditCard />,
        },
      ],
    },
    {
      key: 9,
      label: "Student Fees",
      children: [
        {
          key: "10",
          label: <Link to={pendingPaymentRoutes}>Pending Fees</Link>,
          icon: <FaRegCreditCard />,
        },
        {
          key: "11",
          label: <Link to={pendingPaymentRoutes}>Confirm Fess</Link>,
          icon: <FaRegCreditCard />,
        },
      ],
    },
userType3 || userType5 ?
    {
      key: "12",
      label: <Link to={addNewStudent}>Add New Student</Link>,
      icon: <MdMenuBook />,
    }: null,
    {
      key: "13",
      label: (
        <span
          onClick={() => {
            setIsModalOpen(true);
            setModalOpenValue(0);
          }}
        >
          Logout
        </span>
      ),
      icon: <MdLogout />,
    },
  ];

  const logOutFun = () => {
    localStorage.clear();
    window.location.replace(loginRoute);
  };


  const onFinish =()=>{
    setIsModalOpen(false)
  }

  const modalComObj = [
    {
      content: <AreYouSure fun={logOutFun} />,
      label: "Delete Course Card Details",
    },
  ];

  return (
    <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComObj[modalOpenValue]["label"]}
        onFinish={onFinish}
        width={modalOpenValue == 2 && true}
        element={modalComObj[modalOpenValue]["content"]}
      />

      <Menu
        theme="transparent"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="sider-menu"
      />
    </>
  );
};

export default SiderComponent;
