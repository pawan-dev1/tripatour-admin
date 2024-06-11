import { useGetDashboardQuery } from "../../store/services/dashBoard";
import Card from "./Crad";
import "./style.scss";
const Dashboard = () => {
  const { data } = useGetDashboardQuery();
  console.log(data?.data, "data1");

  const dashBoardData = data?.data;

  return (
    <>
      
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
          name={"Total Safari Enquiries"}
          value={dashBoardData?.totalSafariEnquiriesCount}
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
