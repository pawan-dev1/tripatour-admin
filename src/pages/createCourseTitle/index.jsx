import { PrimaryButton } from "../../common/button";
import PrimaryModal from "../../common/modal";
import { BreadCrum } from "../../components/breadCrume";
import { Button, Input, Table, Tag, message } from "antd";
import AreYouSure from "../../components/popUpElement/areYouSure";
import EditCourse from "../../components/popUpElement/editCourse";
import AddCourseTitle from "../../components/popUpElement/addCourseTitle";
import { useEffect, useState } from "react";
import {
  useCourseGetCategoryQuery,
  useDelNewCourseCategoryMutation,
} from "../../store/services/courseCategories";
import moment from "moment";
import { Link } from "react-router-dom";
import { viewCourseCardDetails } from "../../routes/PagesRoutes";

const CreateCourseTitle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [getDelCategoryData, SetGetDelCategoryData] = useState(null);
  const [getEditData, setGetEditData] = useState({});

  const { data: getCourseCategory } = useCourseGetCategoryQuery();
  const [trigger, { data: delCourseCategory }] =
    useDelNewCourseCategoryMutation();

  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";

  const columns = [
    {
      title: "Course Name",
      dataIndex: "title",
      key: "title",
      onFilter: (value, record) => {
        return String(record.CourseName)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Create Time",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = getCourseCategory?.data.map((elm) => {
    return {
      title: elm?.name,
      createdTime: moment(elm?.createdAt).format("DD-MM-YYYY"),
      action: (
        <>
          <Tag
            color={green}
            onClick={() => {
              setIsModalOpen(true);
              setModalOpenCom(2);
              setGetEditData(elm)
            }}
          >
            Edit
          </Tag>
          <Link to={`${viewCourseCardDetails}/${elm._id}`}>
            <Tag color={geekblue}>View</Tag>
          </Link>
          <Tag color={redTag} onClick={() => deleteHandle(elm)}>
            Delete
          </Tag>
        </>
      ),
    };
  });

  const deleteHandle = (elm) => {
    SetGetDelCategoryData(elm);
    setModalOpenCom(1);
    showModal();
  };

  const delCategoryHandler = () => {
    trigger({
      id: getDelCategoryData?._id,
    });
  };

  useEffect(() => {
    if (delCourseCategory?.status) {
      setIsModalOpen(false);
      message.success(delCourseCategory?.message);
    }
  }, [delCourseCategory]);
  //   modal-poUp-com
  const modalObj = {
    0: <AddCourseTitle setIsModalOpen={setIsModalOpen} />,
    1: <AreYouSure fun={delCategoryHandler} />,
    2: <EditCourse getEditData={getEditData} setIsModalOpen={setIsModalOpen} />,
  };

  //   modal-title
  const modalObjTitle = {
    0: "Add Course Title",
    1: "Delete Course Title",
    2: "Edit Course Title",
    3: "View",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />
      <BreadCrum name={"Create Course Title"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add Course Title"
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

export default CreateCourseTitle;
