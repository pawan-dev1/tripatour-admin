import { Button, Input, Switch, Table, message } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import {
  useDeleteAdminMutation,
  useGetAllSubAdminQuery,
} from "../../store/services/getAllSubAdmin";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../common/button";
import AddSubAdmins from "../../components/popUpElement/addSubAdmins";
import PrimaryModal from "../../common/modal";
import AreYouSure from "../../components/popUpElement/areYouSure";

const SubAdminList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [userData, setUserData] = useState();

  const { data } = useGetAllSubAdminQuery();

  const [trigg, { data: delAdminData }] = useDeleteAdminMutation();

  const userTypeCheck = localStorage.getItem("token");

  const columns = [
    {
      title: "Admin Name",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  const delAdmin = () => {
    trigg({ id: userData?._id });
  };

  const dataSource = data?.data?.map((item) => {
    return {
      key: item.username + item?.gender,
      adminName: item?.username,
      gender: item?.gender,
      profession: item?.profession,
      Action: (
        <Button
          className="ant-tag ant-tag-red"
          onClick={() => {
            showModal(item), setModalOpenCom(1);
          }}
        >
          Delete
        </Button>
      ),
    };
  });

  useEffect(() => {
    if (delAdminData?.status) {
      message.success(delAdminData?.message);
      setIsModalOpen(false);
    }
  }, [delAdminData]);

  const showModal = (data) => {
    setIsModalOpen(true);
    setUserData(data);
  };

  const modalObj = {
    0: <AddSubAdmins setIsModalOpen={setIsModalOpen} />,
    1: <AreYouSure fun={delAdmin} />,
  };
  const modalObjTitle = {
    0: "Add sub admin",
    1: "Are You Sure",
  };

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        // onFinish={onFinish}
        element={modalObj[modalOpenCom]}
      />
      <BreadCrum name={"Sub Admin List"} sub={"Record"} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Create Sub Admin"
          bg={"#6E61E4"}
          fontClr="white"
          fun={showModal}
          setModalOpenCom={setModalOpenCom}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </div>
  );
};

export default SubAdminList;
