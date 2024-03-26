import { Input, Table, Tag, message } from "antd";
import {
  useDeleteClientQueryMutation,
  useGetClientQueryQuery,
} from "../../store/services/clientFeedback";
import moment from "moment";
import { BreadCrum } from "../../components/breadCrume";
import { PrimaryButton } from "../../common/button";
import { useEffect, useState } from "react";
import AreYouSure from "../../components/popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";

const ClientFeedback = () => {
  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [getDeletedId, setGetDeletedId] = useState();

  const { data: clientQueryData } = useGetClientQueryQuery();
  const [trigger, { data: getDelClientQuery }] = useDeleteClientQueryMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contactUs",
      key: "contactUs",
    },
    {
      title: "Feedback",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const showModal = (id) => {
    setIsModalOpen(true);
    setGetDeletedId(id);
  };

  const deleteHandler = () => {
    trigger({
      id: getDeletedId,
    });
  };

  useEffect(() => {
    if (getDelClientQuery?.status) {
      setIsModalOpen(false);
      message.success(getDelClientQuery?.message);
    }
  }, [getDelClientQuery]);

  const modalObj = {
    0: <AreYouSure fun={deleteHandler} />,
  };

  //   modal-title
  const modalObjTitle = {
    0: "Delete Client Query",
  };

  const dataSource = clientQueryData?.data?.map((elm) => {
    return {
      title: elm?.name,
      email: elm?.email,
      contactUs: elm?.contactUs,
      message: elm?.message,
      createdAt: moment(elm?.createdAt).format("DD-MM-YYYY"),
      action: (
        <Tag
          color={redTag}
          onClick={() => {
            showModal(elm._id);
          }}
        >
          Delete
        </Tag>
      ),
    };
  });

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />

      <BreadCrum name={"Client Feedbacks"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default ClientFeedback;
