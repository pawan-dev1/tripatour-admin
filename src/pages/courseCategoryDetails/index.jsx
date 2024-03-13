import React, { useEffect, useState } from "react";
import PrimaryModal from "../../common/modal";
import AddCardDescription from "../../components/popUpElement/addCardDescription/AddCardDescription";
import { BreadCrum } from "../../components/breadCrume";
import { Button, Input, Space, Table, message } from "antd";
import { PrimaryButton } from "../../common/button";
import {
  useDeleteCourseCategoryMutation,
  useGetCardDescQuery,
} from "../../store/services/addCourseCardDesc";
import EditCourseCategories from "../../components/popUpElement/addCardDescription/EditCourseCartegories";
import AreYouSure from "../../components/popUpElement/areYouSure";
import AddCourseCategory from "../../components/popUpElement/addCourseCategory";

const CourseCategoryDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const [courseCardData, setCourseCardData] = useState("");
  const { data: courseCategoryData } = useGetCardDescQuery();
  const [trigger, { data: checkDelCourseCategory }] =
    useDeleteCourseCategoryMutation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const delCheck = () => {
    trigger({ id: courseCardData?._id });
  };

  useEffect(() => {
    if (checkDelCourseCategory?.success) {
      handleCancel();
      message.success(checkDelCourseCategory?.message);
    }
  }, [checkDelCourseCategory]);

  const modalComponentObject = [
    {
      content: <AddCourseCategory handleCancel={handleCancel} category={0} />,
      label: "Add Course Category",
    },
    {
      content: (
        <EditCourseCategories
          handleCancel={handleCancel}
          userData={courseCardData}
        />
      ),
      label: "Edit Team Info",
    },
    {
      content: <AreYouSure fun={delCheck} />,
      label: "Edit Team Info",
    },
  ];

  const showModal = (val) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
  };

  const clickHandler = (val) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Description",
      dataIndex: "courseDesc",
      key: "courseDesc",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const data = courseCategoryData?.data.map((item) => {
    return {
      key: item?._id + item?.title,
      name: item?.title,
      courseDesc: item?.desc,
      action: (
        <Space size="middle">
          <Button
            className="ant-tag ant-tag-green"
            onClick={() => {
              setCourseCardData(item);
              clickHandler(1);
            }}
          >
            Edit
          </Button>
          <Button
            className="ant-tag ant-tag-red"
            onClick={() => {
              setCourseCardData(item);
              clickHandler(2);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    };
  });

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      <BreadCrum name={"Course Category"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add Course Category"
          bg={"#6E61E4"}
          fontClr="white"
          val={0}
          fun={showModal}
        />
      </div>
      <Table dataSource={data} columns={columns} pagination={false} />;
    </div>
  );
};

export default CourseCategoryDetails;
