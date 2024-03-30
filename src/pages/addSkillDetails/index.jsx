import { useEffect, useState } from "react";
import { PrimaryButton } from "../../common/button";
import "./styles.scss";
import PrimaryModal from "../../common/modal";
import AreYouSure from "../../components/popUpElement/areYouSure";
import { Table, Tag, message } from "antd";
import AddSkillsHighlightsComp from "../../components/popUpElement/addAllSkillHighlights/AddSkillsHighlightsComp";
import { useParams } from "react-router-dom";
import {
  useDeleteSyllabusTitleMutation,
  useGetDetailsQuery,
} from "../../store/services/addSkillDetails";
import AddSkillsSyllabusTitleComp from "../../components/popUpElement/addAllSkillHighlights/addSkillsSyllabusTitleComp";
import AddSkillsSyllabusContent from "../../components/popUpElement/addAllSkillHighlights/addSkillsSyllabusContent";
import ViewSyllabusDesc from "../../components/popUpElement/addAllSkillHighlights/viewSyllabusDesc";
import EditSkillSyllabusTitle from "../../components/popUpElement/addAllSkillHighlights/editSkillSyllabusTitle";

const AddSkillsDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const { data: getData } = useGetDetailsQuery(id);
  const [getTitleId, setGetTitleId] = useState();
  const [syllabusDescList, setSyllabusDescList] = useState([]);

  const [trigger, { data: deletedData }] = useDeleteSyllabusTitleMutation();

  const handleDelete = () => {
    console.log("Deleted");
    trigger({
      courseId: id,
      syllabusItemId: getTitleId,
    });
  };

  useEffect(() => {
    if (deletedData?.success) {
      setIsModalOpen(false);
      message.success(deletedData?.message);
    }
  }, [deletedData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const modalObj = {
    0: <AddSkillsHighlightsComp />,
    1: <AreYouSure fun={handleDelete} />,
    2: (
      <AddSkillsSyllabusTitleComp
        skillId={id}
        setIsModalOpen={setIsModalOpen}
      />
    ),
    3: (
      <AddSkillsSyllabusContent
        skillId={id}
        getTitleId={getTitleId}
        setIsModalOpen={setIsModalOpen}
      />
    ),
    4: <ViewSyllabusDesc paramsId={id} addDescId={getTitleId} />,
    5: (
      <EditSkillSyllabusTitle
        getParams={id}
        getTitleId={getTitleId}
        setIsModalOpen={setIsModalOpen}
      />
    ),
  };

  const modalObjTitle = {
    0: "Add Selected Skill Highlight",
    1: "Delete Selected Skill highlight",
    2: "Add selected Skill Title",
    3: "Add selected Skill Description",
    4: "All Syllabus Desc lists",
    5: "Edit Selected Syllabus Title",
  };

  //   tableData for skills highlights
  const dataSourceSkillsHighlights = [];

  const columnsSkillsHighlights = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const data = getData?.data;

  //   tableData for skills syllabus
  const columnsSkillsSyllabus = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSourceSkillsSyllabus = data?.map((elm) => {
    return {
      title: elm?.title,
      action: (
        <>
          <Tag
            onClick={() => {
              setGetTitleId(elm);
              setModalOpenCom(3);
              setIsModalOpen(true);
            }}
          >
            Add
          </Tag>
          <Tag
            onClick={() => {
              setGetTitleId(elm);
              setModalOpenCom(4);
              setIsModalOpen(true);
            }}
          >
            View
          </Tag>
          <Tag
            onClick={() => {
              setModalOpenCom(5);
              setIsModalOpen(true);
              setGetTitleId(elm);
            }}
          >
            Edit
          </Tag>
          <Tag
            onClick={() => {
              setModalOpenCom(1);
              setIsModalOpen(true);
              setGetTitleId(elm._id);
            }}
          >
            Delete
          </Tag>
        </>
      ),
    };
  });

  return (
    <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />
      <div className="add-skill-details">
        <div className="skill-highlights-wrapper">
          <div className="header">
            <h1 className="title">Skill Highlights</h1>
            <PrimaryButton
              name="Add Skill Highlight"
              bg={"#6E61E4"}
              fontClr="white"
              fun={showModal}
              setModalOpenCom={() => setModalOpenCom(0)}
            />
          </div>

          <div className="skill-highlights-table">
            <Table
              dataSource={dataSourceSkillsHighlights}
              columns={columnsSkillsHighlights}
              pagination={false}
            />
          </div>
        </div>
        <div className="skill-syllabus-wrapper">
          <div className="header">
            <h1 className="title">Skill Syllabus</h1>
            <PrimaryButton
              name="Add Skill Syllabus"
              bg={"#6E61E4"}
              fontClr="white"
              fun={showModal}
              setModalOpenCom={() => setModalOpenCom(2)}
            />
          </div>

          <div className="syllabus-highlights-table">
            <Table
              dataSource={dataSourceSkillsSyllabus}
              columns={columnsSkillsSyllabus}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSkillsDetails;
