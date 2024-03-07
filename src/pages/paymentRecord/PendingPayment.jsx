import { BreadCrum } from "../../components/breadCrume";
import {  Table } from "antd";
import { usePendingFeesQuery } from "../../store/services/pendingFees";
import moment from "moment";
import { SecondaryButton } from "../../common/button";
import PrimaryModal from "../../common/modal";
import {  useState } from "react";
import { columns } from "./Colums";
import FeesSubmitPop from "../../components/popUpElement/feesSubmit/index";

import "./styles.scss";
const PendingPayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stdUserId, setStdUserId] = useState("");
  const { data } = usePendingFeesQuery();

  const modalHandler = (userId) => {
    setStdUserId(userId);
    setIsModalOpen(!isModalOpen);
  };
  const dataSource = data?.data?.map((item) => {
    let feesDate = moment(item?.fees_Date).format("DD-MM-YYYY");
    return {
      key: item?.student_name + item?.coursename,
      student_name: item?.student_name,
      email: item?.email,
      coursename: item?.coursename,
      phone: item?.phone,
      roll_no: item?.roll_no,
      fee_Delay: item?.fee_Delay,
      fees_Date: feesDate,
      Action: (
        <SecondaryButton name={"Submit Fees"} fun={() => modalHandler(item)} />
      ),
    };
  });

 

 

  return (
    <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={"Submit Fees"}
        element={<FeesSubmitPop stdUserId={stdUserId} />}
      />
      <BreadCrum name={"Pending Fees"} sub={"Student Fees"} />
      <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </>
  );
};
 
export default PendingPayment;
