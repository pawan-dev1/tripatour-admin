import { useParams } from "react-router-dom";
import { Button, Table } from "antd";
import { useGetCourseDetailsQuery } from "../../store/services/getCourseDetails";
import { PrimaryButton } from "../../common/button";
import { useEffect, useState } from "react";
import PrimaryModal from "../../common/modal";
import AreYouSure from "../../components/popUpElement/areYouSure";
import AddCourseTopics from "../../components/popUpElement/addCourseTopics";
import AddCourseContent from "../../components/popUpElement/addCourseContent";

import "./styles.scss";
import { useGetCourseTopicMutation } from "../../store/services/getCourseTopics";
const columns = [
  {
    title: "Topic List",
    dataIndex: "topicList",
    key: "topicList",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const AddCourseDetails = () => {
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const { id } = useParams();

  // const { data: courseDetailsData } = useGetCourseDetailsQuery({ id: id });
  const [trigger, { data }] = useGetCourseTopicMutation();

  console.log(data, "data?.data");

  useEffect(() => {
    trigger({ id: id });
  }, []);
  // dataSourceWhatToLearn
  const dataSourceWhatToLearn = data?.data?.map((elm) => {
    return {
      topicList: elm?.whatWillYouLearn,
      action:(
        <>
        <Button style={{marginRight:"10px"}}>Edit</Button>
        <Button>Delete</Button>
        </>
      )
    };
  });

  // dataSourceCourseContent
  const dataSourceCourseContent = [];

  const showModal = (val) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
  };
  const delCheck = () => {
    console.log("first");
  };
  const modalComObj = [
    {
      content: "Edit",
      label: "Edit Course Card Details",
    },
    {
      content: <AreYouSure fun={delCheck} />,
      label: "Delete Course Card Details",
    },
    {
      content: <AddCourseTopics courseId={id} />,
      label: "ADD  Description",
    },
    {
      content: <AddCourseContent courseId={id} />,
      label: "Add Course Content",
    },
  ];

  const onFinish = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="add-course-details-sec">
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComObj[modalOpenValue]["label"]}
        onFinish={onFinish}
        element={modalComObj[modalOpenValue]["content"]}
      />
      <div className="content">
        <div className="course-header">
          <h4 className="name">Name</h4>
          <p className="desc">Desc</p>
        </div>

        <div className="what-you-will-learn">
          <div className="sec-header">
            <h1 className="heading">What Will you learn</h1>
            <PrimaryButton
              name="Add Course Topics"
              bg={"#6E61E4"}
              fontClr="white"
              val={2}
              fun={showModal}
              setModalOpenCom={setModalOpenCom}
            />
          </div>
          <div className="learning-lists">
            <Table
              columns={columns}
              dataSource={dataSourceWhatToLearn}
              pagination={false}
            />
          </div>
        </div>

        <div className="course-content">
          <div className="sec-header">
            <h1 className="heading">Course Content</h1>
            <PrimaryButton
              name="Add Course Content"
              bg={"#6E61E4"}
              fontClr="white"
              val={3}
              fun={showModal}
              setModalOpenCom={setModalOpenCom}
            />
          </div>
          <div className="course-syllabus-lists">
            <Table
              columns={columns}
              dataSource={dataSourceCourseContent}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseDetails;
