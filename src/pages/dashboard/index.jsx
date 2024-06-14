import { useGetDashboardQuery } from "../../store/services/dashBoard";
import Card from "./Crad";
import { DatePicker, Space } from 'antd';
import "./style.scss";
import { useState } from "react";
import moment from "moment";

const Dashboard = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  
  useState(() => {

  })
  const { data } = useGetDashboardQuery(date);
  console.log(data?.data, "data1");

  const dashBoardData = data?.data;

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <>
      
    <div className="date-filter">
<h3>Dashboard</h3>
      <div style={{display:"flex",justifyContent:"space-between"}}>
    <Space direction="horizontal" >
    <span>Search by date</span><DatePicker onChange={onChange} />
   
  </Space>
      </div>
    </div>
      <div className="cards-container">
        <Card
          name={"Total Activity"}
          value={dashBoardData?.totalActivityCount}
        />

        <Card
          name={"Total Buggy Packages"}
          value={dashBoardData?.totalBuggyPackagesCount}
        />
        <Card
          name={"Total Safari Packages"}
          value={dashBoardData?.totalSafariPackagesCount}
        />
        <Card
          name={"Total Enquiries"}
          value={dashBoardData?.totalEnquiriesCount}
        />
        <Card
          name={"Total Completed Enquiries"}
          value={dashBoardData?.totalCompletedEnquiries}
        />
        <Card
          name={"Total Cancelled Enquiries"}
          value={dashBoardData?.totalCancelledEnquiries}
        />
        <Card
          name={"Total InProgress Enquiries"}
          value={dashBoardData?.totalInProgressEnquiries}
        />
        <Card
          name={"Total Buggy Enquiries"}
          value={dashBoardData?.totalBuggyEnquiries}
        />
        <Card
          name={"Total Desert Enquiries"}
          value={dashBoardData?.totalDesertEnquiries}
        />
      </div>
    </>
  );
};
export default Dashboard;
