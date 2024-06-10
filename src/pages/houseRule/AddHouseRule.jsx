import { useState } from "react";
import { useAddPackageDetailMutation } from "../../store/services/addTourDetail";
import { Editor } from "primereact/editor";
// import UploadTripImg from './uploadTripImg';
import { useGetTourCategoryQuery } from "../../store/services/tourPackages";
import { Button, Input, Select } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { TimePicker } from 'antd';
import moment from 'moment';
import"./style.scss";
import { useParams } from "react-router-dom";

const AddHouseRule = () => {
  const [editorData, setEditorData] = useState({
    tourId: "",
    title: "",
    description: "",
    check_in: "",
    check_out: "",
    cancellation_policy: "",
    child_policy: "",
    crib_policy: [{ age: "", product: "", price: "" }],
    extra_bed_policy: "",
    age_restriction: "",
    pets: "",
    accepted_cards: [],
  });
  const [triggre, { data }] = useAddPackageDetailMutation();
  const { data: packagesData } = useGetTourCategoryQuery();

  const handleChange = (name, value) => {
    setEditorData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = () => {};

  const packageLists = packagesData?.data?.map((elm) => {
    return { value: elm?._id, label: elm?.title };
  });
  console.log(editorData,"kmkmkm")

  return (
    <div className="text-editor-wrapper">
      <BreadCrum name={"Add House Rule Details"} />
      <div
        className="search-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBlock: "10px",
        }}
      >
        <Input placeholder="Search here..." style={{ width: "50%" }} />
      </div>
      {/* <div className="text-editor">
        <h3 className="title">Title</h3>
        <Input
          value={editorData?.title}
        onChange={(e) => handleChange("title", e.target.value)}
        />
      </div> */}
      {/* ------------------------ */}
       <div className="text-editor">
        <h3 className="title">Title</h3>
        <Input
          value={editorData?.title}
        onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

         <div className="text-editor">
        <h3 className="title">Description</h3>
        <Input
          value={editorData?.description}
        onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
        <div className="time">
      <div className="text-editor">
        <h3 className="title">Check In Time</h3>
        <TimePicker
          value={editorData.check_in ? moment(editorData.check_in, 'h:mm A') : null}
          onChange={(time, timeString) => handleChange("check_in", timeString)}
          format="h:mm A"
          use12Hours
        />
      </div>

      <div className="text-editor">
        <h3 className="title">Check Out Time</h3>
        <TimePicker
          value={editorData.check_out ? moment(editorData.check_out, 'h:mm A') : null}
          onChange={(time, timeString) => handleChange("check_out", timeString)}
          format="h:mm A"
          use12Hours
          />
      </div>
          </div>
       <div className="text-editor">
        <h3 className="title">Cancellation Policy</h3>
        <Input
          value={editorData?.cancellation_policy}
        onChange={(e) => handleChange("cancellation_policy", e.target.value)}
        />
      </div>
      <div className="text-editor">
        <h3 className="title">Child Policy</h3>
        <Input
          value={editorData?.child_policy}
        onChange={(e) => handleChange("child_policy", e.target.value)}
        />
      </div>
        <h3 className="title">Crib Policy</h3>
      <div className="crib-policy">
        <div className="crib-sec">

        <Input
          placeholder="Age"
          value={editorData.crib_policy_age}
          onChange={(e) => handleChange("crib_policy_age", e.target.value)}
          />
        <Input
          placeholder="Product"
          value={editorData.crib_policy_product}
          onChange={(e) => handleChange("crib_policy_product", e.target.value)}
          />
          </div>
        <Input
          placeholder="Price"
          value={editorData.crib_policy_price}
          onChange={(value) => handleChange("crib_policy_price", value)}
        />
      </div>





      



      <div className="text-editor">
        <h3 className="title">Extra Bed Policy</h3>
        <Input
          value={editorData?.extra_bed_policy}
        onChange={(e) => handleChange("extra_bed_policy", e.target.value)}
        />
      </div>
      <div className="text-editor">
        <h3 className="title">Age Restriction</h3>
        <Input
          value={editorData?.age_restriction}
        onChange={(e) => handleChange("age_restriction", e.target.value)}
        />
      </div>
      <div className="text-editor">
        <h3 className="title">Pets</h3>
        <Input
          value={editorData?.pets}
        onChange={(e) => handleChange("pets", e.target.value)}
        />
      </div>


     
      <div className="text-editor">
        <h3 className="title">Our Packages</h3>
        <Select
          options={packageLists}
          style={{ width: "100%" }}
          onChange={(e) => handleChange("tourId", e)}
          placeholder="Select your packages"
        />
        ;
      </div>
      {/* <div className="text-editor">
                <h3 className='title'>Upload Trip Images</h3>
                <UploadTripImg setFileList={setFileList} fileList={fileList} />
            </div> */}

      <Button onClick={submitHandler}>Submit</Button>
    </div>
  );
};

export default AddHouseRule;
