import {  useEffect, useState } from "react";
import PrimaryModal from "../../common/modal";
import AreYouSure from "../../components/popUpElement/areYouSure";
import { BreadCrum } from "../../components/breadCrume";
import { Input, Table, Tag, message } from "antd";
import { PrimaryButton } from "../../common/button";
import AddNewfaq from '../../components/popUpElement/faqPop/Add'
import EditFaq from '../../components/popUpElement/faqPop/EditFaq'

import { columns } from "./colums";
import {
  useGetAllTeamMemberQuery,
} from "../../store/services/teamMember";
import { useDeleteFaqMutation, useGetFaqQuery } from "../../store/services/faq";

const Faq = () => {
  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";
  const [faqData, setFaqData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const  { data: faqResponse }= useGetFaqQuery();
  const [trigger,{data:deletedFaqResponse}]= useDeleteFaqMutation()

  const showModal = (val) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataSource = faqResponse?.data?.map((item) => {
    return {
      key: item?.que + item?.ans,
      que:item?.que,
      ans: item?.ans,
      Action: (
        <>
          <Tag
            color={geekblue}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setFaqData(item);
              showModal(2);
            }}
          >
            Edit
          </Tag>
          <Tag
            color={redTag}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setFaqData(item);
              showModal(1);
            }}
          >
            Delete
          </Tag>
        </>
      ),
    };
  });

  // useEffect(() => {
  //   if (userDeleteResponse?.success) {
  //     message.success(userDeleteResponse?.message);
  //     handleCancel();
  //   }
  // }, [userDeleteResponse]);
const delteFaq = () =>{
  trigger({id:faqData?._id})
}
  const modalComponentObject = [
    {
      content: <AddNewfaq handleCancel={handleCancel} />,
      label: "Add New Faq",
    },
    {
      content: <AreYouSure  fun={delteFaq}/>,
      label: "Are You Sure",
    },
    {
      content: <EditFaq faqData={faqData} handleCancel={handleCancel} />,
      label: "Edit Faq",
    },
  ];
  useEffect(() => {
  if(deletedFaqResponse?.success){
    message.success(deletedFaqResponse?.message)
    handleCancel()
  }
  }, [deletedFaqResponse])
  
  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      <BreadCrum name={"Our Team"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add New Faq"
          bg={"#6E61E4"}
          fontClr="white"
          val={0}
          fun={showModal}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </div>
  );
};

export default Faq;
