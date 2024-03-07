import { Table, Tag } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import {
  useDeletedRequestMutation,
  useGetDeletedRequestQuery,
} from "../../store/services/getDeletedRequest";
import PrimaryModal from "../../common/modal";
import { useEffect, useState } from "react";
import AreYouSure from "../../components/popUpElement/areYouSure";
import { toast } from "react-toastify";

const DeletedRequest = () => {
  let green = "green";
  let geekblue = "geekblue";
  let redTag = "red";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState({});
  const [newArray, setNewArray] = useState([]);

  const { data } = useGetDeletedRequestQuery(
    {},
    {
      pollingInterval: 3000,
      skipPollingIfUnfocused: true,
    }
  );

  const [trigger, { data: deletedRequestRsponse }] =
    useDeletedRequestMutation();
  useEffect(() => {
    let newDAt = data?.data?.map((item) => {
      const newObj = {
        ...item?.courseID,
        req: item._id,
      };
      return newObj;
    });
    setNewArray(newDAt);
  }, [data]);

  const dataSource = newArray?.map((item) => {
    return {
      key: item?.coursename + item?.createdBy,
      CourseName: item?.coursename,
      createdBy: item?.createdBy,
      Action: (
        <>
          <Tag
            color={redTag}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setDeletedData({ courseID: item.req, delstatus: "0" });
              showModal();
            }}
          >
            CANCEL
          </Tag>
          <Tag
            color={green}
            style={{ cursor: "pointer", padding: "3px 15px 3px 15px" }}
            onClick={() => {
              setDeletedData({ courseID: item.req, delstatus: "1" });
              showModal();
            }}
          >
            APPROVED
          </Tag>
        </>
      ),
    };
  });

  const columns = [
    {
      title: "Course Name",
      dataIndex: "CourseName",
      key: "CourseName",
    },
    {
      title: "created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  // const onFinish = (values) => {
  //   trigger("addCoursedata");
  // };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const submit = () => {
    trigger(deletedData);
  };

  const messageFun = (msg) => {
    setIsModalOpen(false);
    toast.success(msg);
    // trigger();
  };
  // useEffect(() => {
  //   trigger();
  // }, []);

  useEffect(() => {
    if (deletedRequestRsponse?.success) {
      messageFun(deletedRequestRsponse?.message);
    } else {
      toast.error(deletedRequestRsponse?.message);
    }
  }, [deletedRequestRsponse]);
  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={"Approved"}
        element={<AreYouSure fun={submit} />}
      />
      <BreadCrum name={"Courses Deleted"} sub={"Request"} />
      <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </div>
  );
};

export default DeletedRequest;
