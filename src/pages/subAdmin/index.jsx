import { Switch, Table } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useGetAllSubAdminMutation } from "../../store/services/getAllSubAdmin";
import { useEffect } from "react";

const SubAdminList = () => {
  const [trigger, { data }] = useGetAllSubAdminMutation();
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
      title: "Active",
      dataIndex: "Active",
      key: "Active",
    },
  ];
  const dataSource = data?.data?.map((item) => {
    return {
      key: item.username + item?.gender,
      adminName: item?.username,
      gender: item?.gender,
      profession: item?.profession,
      Active: <Switch checked={item?.active} size="small" disabled />,
    };
  });
  useEffect(() => {
    trigger();
  }, []);

  return (
    <div>
      <BreadCrum name={"Sub Admin List"} sub={"Record"} />
      <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </div>
  );
};

export default SubAdminList;
