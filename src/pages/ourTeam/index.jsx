import { useEffect, useState } from "react";
import PrimaryModal from "../../common/modal";
import AreYouSure from "../../components/popUpElement/areYouSure";
import { BreadCrum } from "../../components/breadCrume";
import EditTeamInfo from "../../components/popUpElement/editTeamInfo/index";
import { Image, Input, Table, Tag, message } from "antd";
import { PrimaryButton } from "../../common/button";
import AddNewTeamMember from "../../components/popUpElement/addNewTeamMember/index";
import { columns } from "./colums";
import {
  useDeleteTeamMemberMutation,
  useGetAllTeamMemberQuery,
} from "../../store/services/teamMember";

const OurTeam = () => {
  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const { data } = useGetAllTeamMemberQuery();
  const [trigger, { data: userDeleteResponse }] = useDeleteTeamMemberMutation();

  const showModal = (val) => {
    setModalOpenValue(val);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataSource = data?.data?.map((item) => {
    return {
      key: item?.designation + item?.id,
      Images: (
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "100px" }}
          src={"http://192.168.1.2:4000/" + item?.image}
        />
      ),
      Name: item?.name,
      Designation: item?.designation,
      Action: (
        <>
          <Tag
            color={geekblue}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setUserData(item);
              showModal(2);
            }}
          >
            Edit
          </Tag>
          <Tag
            color={redTag}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setUserData(item);
              showModal(1);
            }}
          >
            Delete
          </Tag>
        </>
      ),
    };
  });
  const deleteUser = () => {
    trigger(userData?._id);
  };
  useEffect(() => {
    if (userDeleteResponse?.success) {
      message.success(userDeleteResponse?.message);
      handleCancel();
    }
  }, [userDeleteResponse]);

  const modalComponentObject = [
    {
      content: <AddNewTeamMember handleCancel={handleCancel} />,
      label: "Add New Team Member",
    },
    {
      content: <AreYouSure fun={deleteUser} />,
      label: "Are You Sure",
    },
    {
      content: <EditTeamInfo userData={userData} handleCancel={handleCancel} />,
      label: "Edit Team Info",
    },
  ];
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
          name="Add Team Member"
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

export default OurTeam;
