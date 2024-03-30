import { Input, Table, Tag, message } from "antd";
import {
  useCourseDeleteCategorySkillMutation,
  useCourseGetCategorySkillQuery,
} from "../../store/services/courseCategorySkills";
import AreYouSure from "../../components/popUpElement/areYouSure";
import { useEffect, useState } from "react";
import moment from "moment";
import AddCourseSkillComp from "../../components/addCourseSkill";
import PrimaryModal from "../../common/modal";
import { BreadCrum } from "../../components/breadCrume";
import { PrimaryButton } from "../../common/button";
import EditCourseSkillComp from "../../components/popUpElement/editCourseSkill";
import { Link } from "react-router-dom";
import { skillDetails } from "../../routes/PagesRoutes";

const AddCourseSkills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [editSkillData, setEditSkillData] = useState({});

  const { data: addSkill } = useCourseGetCategorySkillQuery();
  const [trigger, { data: delSkill }] = useCourseDeleteCategorySkillMutation();

  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";

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
      title: "Create Time",
      dataIndex: "createdTime",
      key: "createdTime",
    },
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

  const dataSource = addSkill?.data.map((elm) => {
    return {
      title: elm?.title,
      description: elm?.description,
      createdTime: moment(elm?.createdAt).format("DD-MM-YYYY"),
      action: (
        <>
          <Tag color={green} onClick={() => editSkill(elm)}>
            Edit
          </Tag>
          <Link to={`${skillDetails}/${elm?._id}`}>
            <Tag color={geekblue}>Details</Tag>
          </Link>
          <Tag
            color={redTag}
            onClick={() => {
              setEditSkillData(elm);
              setModalOpenCom(1);
              showModal();
            }}
          >
            Delete
          </Tag>
        </>
      ),
    };
  });

  const editSkill = (skillData) => {
    setModalOpenCom(2);
    showModal();
    setEditSkillData(skillData);
  };

  const deletedSubmit = () => {
    trigger({ id: editSkillData?._id });
  };

  useEffect(() => {
    if (delSkill?.success) {
      setIsModalOpen(false);
      message.success(delSkill?.message);
    }
  }, [delSkill]);

  //   modal-poUp-com
  const modalObj = {
    0: <AddCourseSkillComp setIsModalOpen={setIsModalOpen} />,
    1: <AreYouSure fun={deletedSubmit} />,
    2: (
      <EditCourseSkillComp
        editSkillData={editSkillData}
        setIsModalOpen={setIsModalOpen}
      />
    ),
  };

  //   modal-title
  const modalObjTitle = {
    0: "Add Course Title",
    1: "Delete Course Title",
    2: "Edit Course Skill",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />
      <BreadCrum name={"Add Skill"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add Skill"
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

export default AddCourseSkills;
