import { useParams } from "react-router-dom";
import { BreadCrum } from "../../components/breadCrume";
import {
  useCourseCardDetailsDelMutation,
  useGetCourseCardDescQuery,
} from "../../store/services/addCourseCardDesc";
import { Button, Space, Table } from "antd";
import { useState } from "react";
import EditCourseCardDetails from "../../components/popUpElement/ViewCourseCardDetails/EditCourseCardDetails";
import AreYouSure from "../../components/popUpElement/areYouSure";
import AddDescription from "../../components/popUpElement/addDescription";
import PrimaryModal from "../../common/modal";

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
          <Button
            className="ant-tag ant-tag-green"
            onClick={() => {
              setCourseCardData(item);
              clickHandler(2);
            }}
          >
            Add Detail
          </Button>
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

  const delCheck = () => {
    trigger({ id: courseCardData?._id });
  };
  const modalComObj = [
    {
      content: <EditCourseCardDetails courseCardData={courseCardData} />,
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
  ];

  const onFinish = () => {
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
      <div className="view-course-card-details">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default ViewCourseCardDetails;
