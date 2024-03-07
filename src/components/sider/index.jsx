import { Menu } from "antd";
import {
  addNewStudent,
  courseCategoryDetails,
  createCourses,
  dashBoardRoute,
  deletedRequestRoutes,
  faq,
  ourTeam,
  pendingPaymentRoutes,
  studentRecordRoutes,
  subAdminRecordRoutes,
  teacherRecordRoutes,
} from "../../routes/PagesRoutes";
import { Link } from "react-router-dom";
import { MdDashboard, MdMenuBook, MdOutlineDeleteSweep } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa6";

///styles
import "./styles.scss";
const SiderComponent = () => {
  const items = [
    {
      key: "1",
      label: <Link to={dashBoardRoute}>Dashboard</Link>,
      icon: <MdDashboard />,
    },
    {
      key: "2",
      label: <Link to={createCourses}>Create Courses</Link>,
      icon: <MdMenuBook />,
    },
    {
      key: "ourTeam",
      label: <Link to={ourTeam}>Our Team</Link>,
      icon: <MdMenuBook />,
    },
    {
      key: "courseCategoryDetails",
      label: <Link to={courseCategoryDetails}>Course Categories</Link>,
      icon: <MdMenuBook />,
    },
    {
      key: "faq",
      label: <Link to={faq}>Faq</Link>,
      icon: <MdMenuBook />,
    },
    
    {
      key: "3",
      label: "Request",
      children: [
        {
          key: "4",
          label: <Link to={deletedRequestRoutes}>Courses Deleted</Link>,
          icon: <MdOutlineDeleteSweep />,
        },
      ],
    },
    {
      key: "5",
      label: "Record",
      children: [
        {
          key: "6",
          label: <Link to={studentRecordRoutes}>Students</Link>,
          icon: <PiStudentBold />,
        },

        {
          key: "7",
          label: <Link to={subAdminRecordRoutes}>Sub Admin</Link>,
          icon: <PiStudentBold />,
        },
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

    {
      key: "12",
      label: <Link to={addNewStudent}>Add New Student</Link>,
      icon: <MdMenuBook />,
    },
  ];
  return (
    <>
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
