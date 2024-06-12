import { Button, Image, Input, Table, Tag, message } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useEffect, useState } from "react";

import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../store/services/category";
import Pagination from "../../components/pagination/Index";
import { Columns } from "./TableColums";

import AreYouSure from "../../components/popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";
import AddTourPackages from "../../components/popUpElement/tourPakcages/AddTourPackages"
// import { useGetTourPackagesQuery } from "../../store/services/tourPackages";
import EditTourPackages from "../../components/popUpElement/tourPakcages/EditTourPackages";
import { useDeleteTourPackageMutation, useGetTourCategoryQuery } from "../../store/services/tourPackages";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addPackageDetail } from "../../routes/PagesRoutes";
import "./style.scss";
let green = "green";
let geekblue = "geekblue";
let redTag = "red";
const Packages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0)
  const [tourPackageData, setTourPackageData] = useState({})
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
  const { data } = useGetCategoryQuery();
  const [trigg, { data: categoryDeleteResponse }] = useDeleteTourPackageMutation()


  const { data: getTourPackages } = useGetTourCategoryQuery()

  const dataSource = getTourPackages?.data?.map((item, index) => {
    return {
      key: item.student_name + item?.phone,
      sno: index + 1,
      Images: (
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "100px" }}
          src={item?.images}
        />
      ),
      title: item.name,
      activity: item.categoryName,
      Action: (
        <div style={{ display: "flex", alignItems: "center" }}>


          {/* <Link to={`/house-rule/${item?._id}`}>
          <Tag color={geekblue} className="cursor-pointor">
            Check House Rule
          </Tag>
            </Link>
        <Link to={`/package-detail/${item?._id}`}>
          <Tag color={geekblue} className="cursor-pointor">
            Check Detail
          </Tag>
            </Link> */}
          <Tag color={geekblue} className="cursor-pointor "
            onClick={() => {

              showModal(item, 1)
            }}>
            Edit
          </Tag>
          <Tag color={redTag} className="cursor-pointor "
            onClick={() => {
              showModal(item, 2)

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
  const showModal = (item, val) => {
    setTourPackageData(item)
    setModalOpenValue(val)
    setIsModalOpen(true)
  }
  const deleteStudent = () => {
    trigg({ id: tourPackageData?._id });
  };


  const modalComponentObject = [
    {
      content: <AddTourPackages handleCancel={handleCancel} data={data} />,
      label: "Add New Tour Package",
    },
    {
      content: <EditTourPackages getCategory={data} handleCancel={handleCancel} data={tourPackageData} fun={""} />,
      label: "Edit Tour Package",
    },
    {
      content: <AreYouSure fun={deleteStudent} />,
      label: "Are You Sure",
    },

  ];
  useEffect(() => {
    if (categoryDeleteResponse?.status || categoryDeleteResponse?.success) {
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
      <div className="wrapper">
<Link to={"/add-package-detail/"}>
        <Button  >Add New Packages</Button>
</Link>
        <div className="entries-pagination">
          <div className="show-entites">
          <div style={{ paddingLeft: "5px" }}>
          <label className="d-inline-flex align-items-center">
            Show&nbsp;
            <select
              className="custom-select-sm"
              value={paginationData.noOfRecords}
             
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
        <Table dataSource={dataSource} columns={Columns} pagination={false} />;
        {/* <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
        /> */}
      </div>
    </div>
  );
};

export default Packages;
