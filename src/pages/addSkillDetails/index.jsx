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
  useDeleteWhatToLearnMutation,
  useGetDetailsQuery,
  useGetWhatToLearnQuery,
} from "../../store/services/addSkillDetails";
import AddSkillsSyllabusTitleComp from "../../components/popUpElement/addAllSkillHighlights/addSkillsSyllabusTitleComp";
import AddSkillsSyllabusContent from "../../components/popUpElement/addAllSkillHighlights/addSkillsSyllabusContent";
import ViewSyllabusDesc from "../../components/popUpElement/addAllSkillHighlights/viewSyllabusDesc";
import EditSkillSyllabusTitle from "../../components/popUpElement/addAllSkillHighlights/editSkillSyllabusTitle";
import EditWhatToLearnHighLights from "../../components/popUpElement/addAllSkillHighlights/editWhatToLearnHighLights";

const AddSkillsDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const { data: getData } = useGetDetailsQuery(id);
  const [getTitleId, setGetTitleId] = useState();
  const [syllabusDescList, setSyllabusDescList] = useState([]);

  const [trigger, { data: deletedData }] = useDeleteSyllabusTitleMutation();
  const [trigg, { data: deletedHighlight }] = useDeleteWhatToLearnMutation();
  const { data: getWhatToLearnData } = useGetWhatToLearnQuery(id);

  const handleDeleteSkillSyllabus = () => {
    trigger({
      courseId: id,
      syllabusItemId: getTitleId,
    });
  };

  const handleDeleteSkillHighlights = () => {
    trigg({
      id: id,
      learnId: getTitleId,
    });
  };

  // Data success for skills syllabus
  useEffect(() => {
    if (deletedData?.success) {
      setIsModalOpen(false);
      message.success(deletedData?.message);
    }
  }, [deletedData]);

  // Data success for skills highlights
  useEffect(() => {
    if (deletedHighlight?.success) {
      setIsModalOpen(false);
      message.success(deletedHighlight?.message);
    }
  }, [deletedHighlight]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const modalObj = {
    0: (
      <AddSkillsHighlightsComp
        paramsId={id}
        titleId={getTitleId}
        setIsModalOpen={setIsModalOpen}
      />
    ),
    1: <AreYouSure fun={handleDeleteSkillSyllabus} />,
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
    6: (
      <EditWhatToLearnHighLights
        getParams={id}
        getTitleId={getTitleId}
        setIsModalOpen={setIsModalOpen}
      />
    ),
    7: <AreYouSure fun={handleDeleteSkillHighlights} />,
  };

  const modalObjTitle = {
    0: "Add Selected Skill Highlight",
    1: "Delete Selected Skill highlight",
    2: "Add selected Skill Title",
    3: "Add selected Skill Description",
    4: "All Syllabus Desc lists",
    5: "Edit Selected Syllabus Title",
    6: "Edit Selected What To Learn Highlight",
    7: "Delete Selected What To Learn Highlight",
  };

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
  //   tableData for skills highlights
  const dataSourceSkillsHighlights = getWhatToLearnData?.data?.map((elm) => {
    return {
      description: elm?.learn,
      action: (
        <>
          <Tag
            onClick={() => {
              setModalOpenCom(6);
              setIsModalOpen(true);
              setGetTitleId(elm);
            }}
          >
            Edit
          </Tag>
          <Tag
            onClick={() => {
              setModalOpenCom(7);
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
