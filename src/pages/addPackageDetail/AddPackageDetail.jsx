import  { useState } from 'react'
import { useAddPackageDetailMutation } from '../../store/services/addTourDetail'
import { Editor } from "primereact/editor";
import "./styles.scss"
import UploadTripImg from './uploadTripImg';
import { useGetTourCategoryQuery } from '../../store/services/tourPackages';
import { Button, Input, Select } from 'antd';
import { BreadCrum } from '../../components/breadCrume';
import {  useParams } from 'react-router-dom';

const AddPackageDetail = () => {


    const [fileList, setFileList] = useState([])
    const [editorData, setEditorData] = useState({
        tourId: "",
        highlights: "",
        needToKnow: "",
        canclePolicy: "",
        inclusions: "",
        images: []
    })
    const [triggre, { data }] = useAddPackageDetailMutation()
    const { data: packagesData } = useGetTourCategoryQuery()

    const handleChange = (name, value) => {
        setEditorData((prev) => {
            return {
                ...prev, [name]: value

            }
        })
    }


    const submitHandler = () => {
        const formData = new FormData();
        formData.append("highlights", editorData.highlights);
        formData.append("needToKnow", editorData.needToKnow);
        formData.append("canclePolicy", editorData.canclePolicy);
        formData.append("inclusions", editorData.inclusions);
        
        formData.append("tourId", editorData?.tourId)
        fileList.map((item)=>formData.append("images", item?.originFileObj))
        triggre(formData);
    }

    const packageLists = packagesData?.data?.map((elm) => {
        return { value: elm?._id, label: elm?.title }
    })

    return (
        <div className='text-editor-wrapper'>
             <BreadCrum name={'Trip Packages Details'} />
                <div className="search-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlock: "10px" }}>
                    <Input placeholder="Search here..." style={{ width: "50%" }} />
                </div>
            <div className="text-editor">
                <h3 className='title'>Highlights</h3>
                <Editor value={editorData?.highlights} onTextChange={(e) => handleChange("highlights", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Need to know</h3>
                <Editor value={editorData?.needToKnow} onTextChange={(e) => handleChange("needToKnow", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Cancel policy</h3>
                <Editor value={editorData?.canclePolicy} onTextChange={(e) => handleChange("canclePolicy", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Inclusions</h3>
                <Editor value={editorData?.inclusions} onTextChange={(e) => handleChange("inclusions", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>
            <div className="text-editor">
                <h3 className='title'>Our Packages</h3>
                <Select options={packageLists} style={{ width: '100%' }} onChange={(e)=>handleChange("tourId",e)} placeholder='Select your packages'/>;

            </div>
            <div className="text-editor">
                <h3 className='title'>Upload Trip Images</h3>
                <UploadTripImg setFileList={setFileList} fileList={fileList} />
            </div>


            <Button onClick={submitHandler}>Submit</Button>
        </div>
    )
}

export default AddPackageDetail