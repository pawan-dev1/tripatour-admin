import { Input, Table } from "antd"
import { useState } from "react"
import PrimaryModal from "../../../common/modal"
import { BreadCrum } from "../../breadCrume"
import { PrimaryButton } from "../../../common/button"
import NewCoursesCategory from "../newCoursesCategory"
import { useGetNewCourseCategoryQuery } from "../../../store/services/courseCategories"

const ViewCourseCardDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpenCom, setModalOpenCom] = useState(0);
    const {data: getAddCourseCategoryData} = useGetNewCourseCategoryQuery()
    const columns = [
        {
          title: "Course Name",
          dataIndex: "CourseName",
          key: "CourseName",
          // filteredValue: [searchText],
      
          onFilter: (value, record) => {
            return String(record.CourseName)
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: "Description",
          dataIndex: "desc",
          key: "desc",
        },
        {
          title: "Created By",
          dataIndex: "createdBy",
          key: "createdBy",
        },
        {
          title: "Create Time",
          dataIndex: "createdTime",
          key: "createdTime",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
      ];


      const dataSource = getAddCourseCategoryData?.data?.map((elm)=>{
        return{
            title:""
        }
      })
      const showModal =()=>{
        setIsModalOpen(true);
      }
      
    const modalObj = {
        0: <NewCoursesCategory/>,
      };
      const modalObjTitle = {
        0: "Add New Course Category",
      };

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalObjTitle[modalOpenCom]}
        element={modalObj[modalOpenCom]}
      />
      <BreadCrum name={"Skills And Categories"} sub={""} />
      <div className="search-container">
        <Input placeholder="Search here..." />
        <PrimaryButton
          name="Add Courses"
          bg={"#6E61E4"}
          fontClr="white"
          fun={showModal}
          setModalOpenCom={setModalOpenCom}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
  )
}

export default ViewCourseCardDetails
