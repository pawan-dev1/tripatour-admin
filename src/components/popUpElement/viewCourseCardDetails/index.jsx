import { Button, Space, Table, Tag, message } from "antd";

import "./styles.scss";
import {
  useCourseCardDetailsDelMutation,
  useGetCourseCardDescQuery,
} from "../../../store/services/addCourseCardDesc";
import { useEffect, useState } from "react";
import PrimaryModal from "../../../common/modal";
import AreYouSure from "../areYouSure";
import EditCourseCardDetails from "./EditCourseCardDetails";
import AddDescription from "../addDescription";

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

const ViewCourseCardDetails = ({userData}) => {
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [courseCardData, setCourseCardData] = useState();

  const { data: getCourseCardDetails } = useGetCourseCardDescQuery();

const filterData = getCourseCardDetails?.data?.filter((item)=> item?.id == userData?.id)
  const clickHandler = (val) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
  };

  const [trigger, { data: delCourseData }] = useCourseCardDetailsDelMutation();

  const data = filterData?.map((item) => {
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

  const delCheck = () => {
    trigger({id:courseCardData?._id});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (delCourseData?.success) {
      message.success(delCourseData?.message);
      handleCancel();
    }
  }, [delCourseData]);

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
      content:<AddDescription data={courseCardData} />,
      label:"ADD  Description"
    }
  ];

  const onFinish = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComObj[modalOpenValue]["label"]}
        onFinish={onFinish}
        width={modalOpenValue ==2 && true}
        element={modalComObj[modalOpenValue]["content"]}
      />
      <div className="view-course-card-details">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </>
  );
};

export default ViewCourseCardDetails;
