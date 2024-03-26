import { useParams } from "react-router-dom";
import { Button, Table, message } from "antd";
import { PrimaryButton } from "../../common/button";
import { useEffect, useState } from "react";
import PrimaryModal from "../../common/modal";
import AreYouSure from "../../components/popUpElement/areYouSure";
import AddCourseTopics from "../../components/popUpElement/addCourseTopics";
import AddCourseContent from "../../components/popUpElement/addCourseContent";

import "./styles.scss";
import EditWhatToLearn from "../../components/popUpElement/editWhatToLearnData";
import EditCourseSyllabus from "../../components/popUpElement/editCourseSyllabus";
const columnsWhatToLearn = [
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

const courseSyllabus = [
  {
    title: "Syllabus Title",
    dataIndex: "courseTitle",
    key: "courseTitle",
  },
  {
    title: "Syllabus Desc",
    dataIndex: "courseDesc",
    key: "courseDesc",
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
  const [whatToLearnData, setWhatToLearnData] = useState(null);
  const [courseContentData, setCourseContentData] = useState(null);
  const [delCheckStatus, setDelCheckStatus] = useState(0);

  const { id } = useParams();

  const { data: courseDetailsData } = useGetCourseDetailsQuery({ id: id });

  const [trigger, { data: delTopicRes }] = useCourseTopicDelMutation();
  const [trigg, { data: delSyllabusRes }] = useCourseSyllabusDelMutation();

  // dataSourceWhatToLearn
  const dataSourceWhatToLearn = courseDetailsData?.data?.topicsData?.map(
    (elm) => {
      return {
        topicList: elm?.whatWillYouLearn,
        action: (
          <>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => showModal(0, elm)}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                showModal(1, elm);
                setDelCheckStatus(0);
              }}
            >
              Delete
            </Button>
          </>
        ),
      };
    }
  );

  // dataSourceCourseContent
  const dataSourceCourseContent = courseDetailsData?.data?.courseSyllabus?.map(
    (elm) => {
      return {
        courseTitle: elm?.courseTitle,
        courseDesc: elm?.courseDesc,
        action: (
          <>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => showModal(4, elm)}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                showModal(1, elm);
                setDelCheckStatus(1);
              }}
            >
              Delete
            </Button>
          </>
        ),
      };
    }
  );

  const showModal = (val, elm) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
    setWhatToLearnData(elm);
    setCourseContentData(elm);
  };
  const onCloseModal = () => setIsModalOpen(false);

  const delCheck = () => {
    if (delCheckStatus === 0) {
      trigger({ id: whatToLearnData?._id });
    } else {
      trigg({ id: courseContentData?._id });
    }
  };

  const modalComObj = [
    {
      content: (
        <EditWhatToLearn
          whatToLearnData={whatToLearnData}
          onCloseModal={onCloseModal}
        />
      ),
      label: "Edit Course Card Details",
    },
    {
      content: <AreYouSure fun={delCheck} />,
      label: "Delete Course Card Details",
    },
    {
      content: <AddCourseTopics courseId={id} onCloseModal={onCloseModal} />,
      label: "ADD  Description",
    },
    {
      content: <AddCourseContent courseId={id} onCloseModal={onCloseModal} />,
      label: "Add Course Content",
    },
    {
      content: (
        <EditCourseSyllabus
          courseContentData={courseContentData}
          onCloseModal={onCloseModal}
        />
      ),
      label: "Edit Course Content",
    },
  ];

  const onFinish = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (delTopicRes?.success) {
      message.success(delTopicRes?.message);
      onCloseModal()
    }else if(delSyllabusRes?.success){
      message.success(delSyllabusRes?.message);
      onCloseModal();
    }
  }, [delTopicRes,delSyllabusRes]);

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
              columns={columnsWhatToLearn}
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
              columns={courseSyllabus}
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
