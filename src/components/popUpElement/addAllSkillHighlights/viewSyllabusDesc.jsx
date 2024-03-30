import { Table, Tag, message } from "antd";
import {
  useDeleteSyllabusDescMutation,
  useGetSyllabusDescQuery,
} from "../../../store/services/addSkillDetails";
import { useEffect, useState } from "react";
import PrimaryModal from "../../../common/modal";
import EditSyllabusDescList from "./editSyllabusDescList";
import AreYouSure from "../areYouSure";

const ViewSyllabusDesc = ({ paramsId, addDescId }) => {
  console.log(paramsId, addDescId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [getDescId, setGetDescId] = useState();

  // const [trigger, { data: getSyllabusDesc }] = useGetSyllabusDescMutation();
  const { data: getSyllabusDesc } = useGetSyllabusDescQuery({
    id: paramsId,
    titleId: addDescId?._id,
  });
  const [trigg, { data: getDeletedData }] = useDeleteSyllabusDescMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    trigg({
      id: paramsId,
      titleId: addDescId?._id,
      descId: getDescId?._id,
    });
  };

  useEffect(() => {
    if (getDeletedData?.success) {
      setIsModalOpen(false);
      message.success(getDeletedData?.message);
    }
  }, [getDeletedData]);

  const modalObj = {
    0: (
      <EditSyllabusDescList
        paramsId={paramsId}
        addDescId={addDescId}
        descId={getDescId}
        setIsModalOpen={setIsModalOpen}
      />
    ),
    1: (
      <AreYouSure
        fun={handleDelete}
        paramsId={paramsId}
        addDescId={addDescId}
        descId={getDescId}
        setIsModalOpen={setIsModalOpen}
      />
    ),
  };

  const modalObjTitle = {
    0: "Edit Selected Desc list",
    1: "Delete Selected  Desc List",
  };

  const columns = [
    {
      title: "Description List",
      dataIndex: "descList",
      key: "descList",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const dataSource = getSyllabusDesc?.data?.map((elm) => {
    return {
      descList: elm?.descText,
      action: (
        <>
          <Tag
            onClick={() => {
              setModalOpenCom(0);
              setGetDescId(elm);
              showModal();
            }}
          >
            Edit
          </Tag>
          <Tag
            onClick={() => {
              setModalOpenCom(1);
              setGetDescId(elm);
              showModal();
            }}
          >
            Delete
          </Tag>
        </>
      ),
    };
  });

  return (
    <div className="view-syllabus-desc">
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default ViewSyllabusDesc;
