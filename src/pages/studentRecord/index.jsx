import { Button, Checkbox, Input, Radio, Switch, Table, Tag, message } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useEffect, useState } from "react";
import { addNewStudent } from "../../routes/PagesRoutes";
import { Link } from "react-router-dom";
import { useDeleteStudentMutation, useGetAllStudentMutation } from "../../store/services/getAllStudent";
import Pagination from "../../components/pagination/Index";
import { Columns } from "./TableColums";
import EditStudent from "../../components/popUpElement/student/Edit";
import ViewStudent from "../../components/popUpElement/student/View";

import AreYouSure from "../../components/popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";

let green = "green";
let geekblue = "geekblue";
let redTag = "red";
const StudentRecord = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0)
  const [studentdata, setStudentdata] = useState({})
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
  const [trigger, { data }] = useGetAllStudentMutation();
  const [trigg,{data:studentDeleteResponse}]=useDeleteStudentMutation()

  const dataSource = data?.data?.studentList?.map((item) => {
    return {
      key:item.student_name+item?.phone,
      student_name: item.student_name,
      email: item.email,
      phone: item?.phone,
      coursename: item?.coursename,
      batch_time: item?.batch_time,
      Refrence: item?.reference,
      classroom_type: (
        <Switch
          size="small"
          checked={item?.classroom_type === "Offline" ? false : true}
          disabled
        />
      ),
      Action: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tag color={green} className="cursor-pointor "
          onClick={()=>{
            showModal(item,2)
          }}>
            View
          </Tag>
          <Tag color={geekblue} className="cursor-pointor "
           onClick={()=>{
            
            showModal(item,0)
          }}>
            Edit
          </Tag>
          <Tag color={redTag} className="cursor-pointor "
           onClick={()=>{
            showModal(item,1)
           
          }}>
            Delete
          </Tag>
        </div>
      ),
    };
  });
  const triggerHandler = ()=>{
    trigger(paginationData)
  } 
  useEffect(() => {
    triggerHandler(paginationData);
  }, [paginationData?.index]);

  useEffect(() => {
    if (data?.totalPages) {
      setPagination({
        ...paginationData,
        totalPages: data?.totalPages || 1,
      });
    }
  }, [data]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (item,val)=>{
    setStudentdata(item)
    setModalOpenValue(val)
    setIsModalOpen(true)
  }
  const deleteStudent = () => {
    trigg({id:studentdata?._id});
  };


 
  const modalComponentObject = [
    {
      content: <EditStudent handleCancel={handleCancel} studentdata={studentdata} fun={triggerHandler}/>,
      label: "Edit Student Info",
    },
    {
      content: <AreYouSure fun={deleteStudent} />,
      label: "Are You Sure",
    },
    {
      content: <ViewStudent studentdata={studentdata} handleCancel={handleCancel} />,
      label: "Student Data",
    },
  ];
  useEffect(() => {
    if(studentDeleteResponse?.success){
      message.success(studentDeleteResponse.message)
      triggerHandler(paginationData)
      handleCancel()
    }
  }, [studentDeleteResponse])
  
  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      <BreadCrum name={"Students"} sub={"Record"} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <Link to={addNewStudent}>
          <Button>Add Student</Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={Columns} pagination={false} />;
      <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
      />
    </div>
  );
};

export default StudentRecord;
