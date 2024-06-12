import { Button, Checkbox, Input, Radio, Switch, Table, Tag, message } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useEffect, useState } from "react";
import { addNewStudent } from "../../routes/PagesRoutes";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../store/services/category";
import Pagination from "../../components/pagination/Index";
import { Columns } from "./TableColums";

import AreYouSure from "../../components/popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";
import AddNewCategory from "../../components/popUpElement/category/AddCategory";
import EditCategory from "../../components/popUpElement/category/Edit";

let green = "green";
let geekblue = "geekblue";
let redTag = "red";
const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0)
  const [categoryData, setCategoryData] = useState({})
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
  const  { data:getCategory,isLoading } = useGetCategoryQuery();
  const [trigg,{data:categoryDeleteResponse}]=useDeleteCategoryMutation()

  const dataSource = getCategory?.data?.map((item,index) => {
    return {
      key:item.student_name+item?.phone,
      sno:index+1,
      name: item.name,
      description:<span style={{textTransform:"lowercase"}}>{item.name}</span> ,
      Action: (
        <div style={{ display: "flex", alignItems: "center" }}>
      
          <Tag color={geekblue} className="cursor-pointor "
           onClick={()=>{
            
            showModal(item,1)
          }}>
            Edit
          </Tag>
          <Tag color={redTag} className="cursor-pointor "
           onClick={()=>{
            showModal(item,2)
           
          }}>
            Delete
          </Tag>
        </div>
      ),
    };
  });

  // useEffect(() => {
  //   triggerHandler(paginationData);
  // }, [paginationData?.index]);

  // useEffect(() => {
  //   if (data?.totalPages) {
  //     setPagination({
  //       ...paginationData,
  //       totalPages: data?.totalPages || 1,
  //     });
  //   }
  // }, [data]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (item,val)=>{
    setCategoryData(item)
    setModalOpenValue(val)
    setIsModalOpen(true)
  }
  const deleteStudent = () => {
    trigg({id:categoryData?._id});
  };


 
  const modalComponentObject = [
    {
      content: <AddNewCategory handleCancel={handleCancel}/>,
      label: "Add New Category",
    },
    {
      content: <EditCategory handleCancel={handleCancel} categoryData={categoryData} fun={""}/>,
      label: "Edit Student Info",
    },
    {
      content: <AreYouSure fun={deleteStudent} />,
      label: "Are You Sure",
    },
   
  ];
  useEffect(() => {
    if(categoryDeleteResponse?.status){
      message.success(categoryDeleteResponse.message)
      // triggerHandler(paginationData)
      handleCancel()
    }
  }, [categoryDeleteResponse])
  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      <BreadCrum name={"Category"} sub={""} />
      <div className="search-container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBlock:"10px"}}>
        <Input placeholder="Search here..." style={{width:"50%"}}/>
          <Button onClick={()=> showModal("",0)}>Add New Category</Button>
      </div>
      <Table dataSource={dataSource} columns={Columns} pagination={false} />;
      <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
      />
    </div>
  );
};

export default Category;
