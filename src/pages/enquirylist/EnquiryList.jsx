import React, { useEffect, useState } from 'react'
import { Select, Space, Table, Tag } from 'antd';
import { Columns } from './TableColums';
import {useEnquiryListQuery, useUpdateStatusMutation} from "../../store/services/enquiryList"

const EnquiryList = () => {
const [status,setStatus] = useState()
const {data:enquiryListDara} = useEnquiryListQuery(1)
const [trigger,{data:updateStatusData}] = useUpdateStatusMutation()
const option = [{
    value: "IN PROCESS",
    label:"IN PROCESS"
},{
    value: "COMPLETED",
    label:"APPROVED"
},
{
    value: "CANCELLED",
    label:"REJECTED"
}]
const checkStatus = {
    "IN PROCESS":"IN PROCESS",
    COMPLETED:"APPROVED",
    CANCELLED:"REJECTED"
}
    const data = enquiryListDara?.data?.enquiries.map((item,index)=>{
        return {
            key: item.fullName,
            Sno:index+1,
            name: item?.fullName,
            email: item?.email,
            phone: item?.phone_number,
            packageName: item?.packageName,
            status:checkStatus[item?.status],
            peopleInfo:item?.peopleInfo,
            message:item?.message,
            Action:<Select options= {option} style={{width:"120px"}} onChange={(e)=>setStatus({value:e,id:item?._id})}/>,
          }
    })
       
      
useEffect(()=>{
    trigger(status)
},[status])
 

  return (
    <div className='wrapper'>
         <div className="entries-pagination">
          <div className="show-entites">
          <div style={{ paddingLeft: "5px" }}>
          <label className="d-inline-flex align-items-center">
            Show&nbsp;
            <select
              className="custom-select-sm"
              value={""}
             
            >
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
            </select>
            &nbsp;entries
          </label>
        </div>
        </div>
          <div className="search">
            <label htmlFor="#" className="search-label">Search : </label>
            <input type="text" className="search-bar" />
          </div>
        </div>
        <Table columns={Columns} dataSource={data} />;
    </div>
  )
}

export default EnquiryList