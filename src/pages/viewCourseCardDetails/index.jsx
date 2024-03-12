import { Link, useParams } from "react-router-dom";
import { BreadCrum } from "../../components/breadCrume";
import {
  useCourseCardDetailsDelMutation,
  useGetCourseCardDescQuery,
} from "../../store/services/addCourseCardDesc";
import { Button, Input, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import EditCourseCardDetails from "../../components/popUpElement/ViewCourseCardDetails/EditCourseCardDetails";
import AreYouSure from "../../components/popUpElement/areYouSure";
import AddDescription from "../../components/popUpElement/addDescription";
import PrimaryModal from "../../common/modal";
import { PrimaryButton } from "../../common/button";
import AddCardDescription from "../../components/popUpElement/addCardDescription/AddCardDescription";
import { addCourseDetails } from "../../routes/PagesRoutes";

const columns = [
  {
    title: "Course Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Course Description",
    dataIndex: "courseDesc",
    key: "courseDesc",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const ViewCourseCardDetails = () => {
  const [courseCardData, setCourseCardData] = useState();
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [coursesData, setCoursesData] = useState({});
  const { id } = useParams();
  console.log(id);

  const { data: getCourseCardDetails } = useGetCourseCardDescQuery({ id: id });
  const [trigger, { data: delCourseData }] = useCourseCardDetailsDelMutation();
  // console.log(getCourseCardDetails,"getCourseCardDetails");

  const data = getCourseCardDetails?.data?.map((item) => {
    return {
      key: item?._id + item?.title,
      name: item?.title,
      courseDesc: item?.desc,
      action: (
        <Space size="middle">
          <Link to={`${addCourseDetails}/${item?._id}`}>
            <Button className="ant-tag ant-tag-green">Add Detail</Button>
          </Link>
          <Button
            className="ant-tag ant-tag-green"
            onClick={() => {
              setCourseCardData(item);
              clickHandler(0);
            }}
          >
            Edit
          </Button>
          <Button
            className="ant-tag ant-tag-red"
            onClick={() => {
              setCourseCardData(item);
              clickHandler(1);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    };
  });

  const clickHandler = (val) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const delCheck = () => {
    trigger({ id: courseCardData?._id });
  };

  useEffect(() => {
    if (delCourseData?.success) {
      message.success(delCourseData?.message);
      handleCancel();
    }
  }, [delCourseData]);
  const modalComObj = [
    {
      content: (
        <EditCourseCardDetails
          courseCardData={courseCardData}
          handleCancel={handleCancel}
        />
      ),
      label: "Edit Course Card Details",
    },
    {
      content: <AreYouSure fun={delCheck} />, 
      label: "Delete Course Card Details",
    },
    {
      content: <AddDescription data={courseCardData} />,
      label: "ADD  Description",
    },
    {
      content: (
        <AddCardDescription
          userData={coursesData}
          handleCancel={handleCancel}
          category={1}
          id={id}
        />
      ),
      label: "Add  Course Card Details",
    },
  ];

  const onFinish = () => {
    setIsModalOpen(true);
  };

  const showModal = () => {
    clickHandler(3);
    setIsModalOpen(true);
  };

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComObj[modalOpenValue]["label"]}
        onFinish={onFinish}
        width={modalOpenValue == 2 && true}
        element={modalComObj[modalOpenValue]["content"]}
      />
      <BreadCrum name={"View Course Card Details"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add Course Card Desc"
          bg={"#6E61E4"}
          fontClr="white"
          fun={showModal}
          val={3}
          setModalOpenCom={setModalOpenCom}
        />
      </div>
      <div className="view-course-card-details">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default ViewCourseCardDetails;
