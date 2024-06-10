import { Button,Input, Table,  } from "antd";
import {  useState } from "react";
import { BreadCrum } from "../../components/breadCrume";
import Pagination from "../../components/pagination/Index";
import { Columns } from "./Columns";
import { useGetFeedbackQuery} from "../../store/services/feedback";


const Feedback = () =>{
    const [paginationData, setPagination] = useState({
        noOfRecords: 10,
        index: 0,
        // totalPages: 1,
      });
    const {data} = useGetFeedbackQuery()
    console.log(data,"data1")

    const dataSource = data?.feedbacks?.map((item)=>{
        return{
            key: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
      
        }
    })
    
    return(
        <div>
<BreadCrum name={"Feedback"} sub={""} />
 <div className="search-container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBlock:"10px"}}>
        <Input placeholder="Search here..." style={{width:"50%"}}/>
      </div>
      <Table dataSource={dataSource} columns={Columns} pagination={false} />;
      <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
      />
      </div>
    )
}
export default Feedback