import { Input, Table, Tag, message } from "antd";
import PrimaryModal from "../../common/modal";
import { BreadCrum } from "../../components/breadCrume";
import { PrimaryButton } from "../../common/button";
import { useEffect, useState } from "react";
import AreYouSure from "../../components/popUpElement/areYouSure";
import {
  useCreateTypeOfCourseMutation,
  useDeleteTypeOfCourseMutation,
  useGetTypeOfCourseQuery,
} from "../../store/services/typeOfCourse";
import AddCourseTypeComp from "../../components/popUpElement/addCourseTypesComp";
import moment from "moment";
import EditCourseTypeComp from "../../components/popUpElement/editCourseTypeComp";

const AddCourseTypes = () => {
  let green = "green";
  let redTag = "red";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [getEditedData, setGetEditedData] = useState();
  const { data: getCourseTypeData } = useGetTypeOfCourseQuery();
  const [trigger, { data: deletedData }] = useDeleteTypeOfCourseMutation();

  const deleteCourseType = () => {
    trigger({
      id: getEditedData?._id,
    });
  };

  useEffect(() => {
    if (deletedData?.success) {
      setIsModalOpen(false);
      message.success(deletedData?.message);
    }
  }, [deletedData]);

  const modalObj = {
    0: <AddCourseTypeComp setIsModalOpen={setIsModalOpen} />,
    2: (
      <EditCourseTypeComp
        typeInputData={getEditedData}
        setIsModalOpen={setIsModalOpen}
      />
    ),
    1: <AreYouSure fun={deleteCourseType} />,
  };

  //   modal-title
  const modalObjTitle = {
    0: "Add Course Type",
    1: "Edit Course Type",
    2: "Delete Course Type",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Course Type",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = getCourseTypeData?.data?.map((elm) => {
    return {
      title: elm?.title,
      description: elm?.description,
      createdAt: moment(elm?.created_at).format("DD-MM-YYYY"),
      action: (
        <>
          <Tag
            color={green}
            onClick={() => {
              setModalOpenCom(2);
              setIsModalOpen(true);
              setGetEditedData(elm);
            }}
          >
            Edit
          </Tag>
          <Tag
            color={redTag}
            onClick={() => {
              setModalOpenCom(1);
              setGetEditedData(elm);
              setIsModalOpen(true);
            }}
          >
            Delete
          </Tag>
        </>
      ),
    };
  });

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />
      <BreadCrum name={"Add Course Types"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add Course Type"
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

export default AddCourseTypes;
