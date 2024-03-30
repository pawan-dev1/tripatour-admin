import { Input, Table, Tag, message } from "antd";
import PrimaryModal from "../../common/modal";
import { BreadCrum } from "../../components/breadCrume";
import { PrimaryButton } from "../../common/button";
import NewCoursesCategory from "../../components/popUpElement/newCoursesCategory";
import { useEffect, useState } from "react";
import {
  useDeleteNewCourseSkillMutation,
  useGetNewCourseCategoryQuery,
} from "../../store/services/courseCategories";
import { useParams } from "react-router-dom";
import moment from "moment";
import AreYouSure from "../../components/popUpElement/areYouSure";

const ViewCourseCardDetails = () => {
  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [getDeleteItem, setGetDeletedItem] = useState();
  const { id } = useParams();
  const { data: getAddCourseCategoryData } = useGetNewCourseCategoryQuery(id);
  const [trigger, { data: delData }] = useDeleteNewCourseSkillMutation();

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
      title: "Description",
      dataIndex: "description",
      key: "description",
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

  const dataSource = getAddCourseCategoryData?.data?.skill?.map((elm) => {
    return {
      title: elm?.title,
      description: elm?.description,
      createdTime: moment(elm?.createAt).format("DD-MM-YYYY"),
      action: (
        <>
          <Tag
            color={redTag}
            onClick={() => {
              setModalOpenCom(1);
              showModal();
              setGetDeletedItem(elm);
            }}
          >
            Delete
          </Tag>
        </>
      ),
    };
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const deletedSubmit = () => {
    trigger({
      id: id,
      dltId: getDeleteItem?._id,
      status: 1,
    });
  };

  useEffect(() => {
    if (delData?.success) {
      setIsModalOpen(false);
      message.success(delData?.message);
    }
  }, [delData]);

  const modalObj = {
    0: <NewCoursesCategory setIsModalOpen={setIsModalOpen} />,
    1: <AreYouSure fun={deletedSubmit} />,
  };
  const modalObjTitle = {
    0: "Add New Course Category",
    1: "Delete new course skill",
  };

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />
      <BreadCrum
        name={getAddCourseCategoryData?.data?.category?.name}
        sub={""}
      />
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

export default ViewCourseCardDetails;
