import { Input, Table, Tag } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useAllCoursesMutation } from "../../store/services/allCourses";
import moment from "moment";
import { columns } from "./Colums";
import { PrimaryButton } from "../../common/button/index";
import { useEffect, useState } from "react";
import PrimaryModal from "../../common/modal";
import AddNewCourses from "../../components/popUpElement/addNewCourses";
import AreYouSure from "../../components/popUpElement/areYouSure";
import AddCardDescription from "../../components/popUpElement/addCardDescription/AddCardDescription";

import { useCreatedCoursesMutation } from "../../store/services/createdCourse";
import { toast } from "react-toastify";
import { useCourseDeletedResquestMutation } from "../../store/services/coursesDeletedRequest";
import EditCourse from "../../components/popUpElement/editCourse";
import { useEditCourseMutation } from "../../store/services/editCourse";
import AddDescription from "../../components/popUpElement/addDescription/index";

////styles
import "./styles.scss";
import ViewCourseCardDetails from "../../components/popUpElement/ViewCourseCardDetails";
import { Link } from "react-router-dom";

const CreateCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [deletedTrigger, { data: courseDeletedResponse }] =
    useCourseDeletedResquestMutation();
  const [trigge, { data }] = useAllCoursesMutation();

  const [trigger, { data: createCourseResponse }] = useCreatedCoursesMutation();

  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [deltedData, setDeltedData] = useState({});
  const [editCoursesData, setEditCoursesData] = useState({});
  const [coursesData, setCoursesData] = useState({});

  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";

  const dataSource = data?.data?.map((item) => {
    return {
      key: item?.id + item?.coursename,

      CourseName: item?.coursename,
      createdBy: item?.createdBy,
      createdTime: moment(item?.createdAt).format("DD-MM-YYYY hh:mm"),
      edit: (
        <>
          <Tag
            color={green}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setModalOpenCom(2);
              setUserData(item);
              setEditCoursesData({ ...editCoursesData, id: item._id });
              showModal();
            }}
          >
            Edit
          </Tag>
          {/* <Tag
            color={green}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setCoursesData(item);
              setModalOpenCom(3);
              showModal();
            }}
          >
            Add Desc
          </Tag> */}

          <Link to={`/view-course-card-details/${item?.id}`}>
            <Tag
              color={green}
              style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
              onClick={() => {
                // setCoursesData(item.id);
                // setModalOpenCom(5);
                // showModal();
              }}
            >
              View
            </Tag>
          </Link>
          {/* <Tag
            color={green}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setCoursesData(item);
              setModalOpenCom(4);
              showModal();
            }}
          >
            Add Course Card Desc
          </Tag> */}
          {item.delrequest ? (
            <>
              <Tag
                color={geekblue}
                style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
                onClick={() => {
                  setModalOpenCom(1);
                  setDeltedData({ courseID: item._id, delstatus: "1" });
                  showModal();
                }}
              >
                Cancel
              </Tag>
            </>
          ) : (
            <Tag
              color={redTag}
              style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
              onClick={() => {
                setModalOpenCom(1);
                setDeltedData({ courseID: item._id, delstatus: "0" });
                showModal();
              }}
            >
              Delete
            </Tag>
          )}
        </>
      ),
    };
  });
  const [editCourseTrigger, { editResponseData }] = useEditCourseMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const deltedSubmit = () => {
    deletedTrigger(deltedData);
  };

  const editCoursesSubmit = (values) => {
    const editData = { ...editCoursesData, ...values };
    editCourseTrigger(editData);
  };
  const onFinish = (values) => {
    const addCoursedata = { ...values, createdBy: "admin" };
    trigger(addCoursedata);
  };

  const messageFun = (msg) => {
    setIsModalOpen(false);
    toast.success(msg);
  };

  useEffect(() => {
    if (createCourseResponse?.success) {
      messageFun(createCourseResponse?.message);
    } else if (courseDeletedResponse?.success) {
      messageFun(courseDeletedResponse?.message);
    } else if (editResponseData?.success) {
      messageFun(editResponseData?.message);
    }
    trigge();
  }, [createCourseResponse, courseDeletedResponse, editResponseData]);

  const modalObj = {
    0: <AddNewCourses onFinish={onFinish} userData={userData} />,
    1: <AreYouSure fun={deltedSubmit} />,
    2: (
      <EditCourse
        fun={editCoursesSubmit}
        setEditCoursesData={setEditCoursesData}
        messageFun={messageFun}
        userData={userData}
      />
    ),
    // 3: <AddDescription data={coursesData} />,
    // 4: (
    //   <AddCardDescription
    //     userData={coursesData}
    //     handleCancel={handleCancel}
    //     category={1}
    //   />
    // ),
    5: <ViewCourseCardDetails userData={coursesData} />,
  };
  const modalObjTitle = {
    0: "Add New Course",
    1: "Delet Course",
    2: "Edit Course",
    // 3: "ADD  Description",
    // 4: "Add  Course Card Details",
    5: "View",
  };

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        onFinish={onFinish}
        element={modalObj[modalOpenCom]}
      />
      <BreadCrum name={"Create Courses"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add Courses"
          bg={"#6E61E4"}
          fontClr="white"
          fun={showModal}
          setModalOpenCom={setModalOpenCom}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default CreateCourses;
