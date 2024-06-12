import { useState } from 'react'
import { useAddPackageDetailMutation } from '../../store/services/addTourDetail'
import { Editor } from "primereact/editor";
import "./styles.scss"
import UploadTripImg from './uploadTripImg';
import { useGetTourCategoryQuery } from '../../store/services/tourPackages';
import { Button, Input, Select } from 'antd';
import { BreadCrum } from '../../components/breadCrume';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../../store/services/category';

const AddPackageDetail = () => {


    const [fileList, setFileList] = useState([])
    const [fileList2, setFileList2] = useState([])
    const [editorData, setEditorData] = useState({
        categoryId: "",
        name: "",
        highlights: "",
        needToKnow: "",
        canclePolicy: "",
        inclusions: "",
        DNSchedule: "",
        packagesNight: "",
        star: "",
        info: "",
        description: "",
        shortDescription: "",
        location: "",
        price: "",
        discountPrice: "",
        map: "",

        galleryPhoto: []
    })
    const [triggre, { data }] = useAddPackageDetailMutation()
    const { data: packagesData } = useGetCategoryQuery()

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
        formData.append("name", editorData.name);
        formData.append("DNSchedule", editorData.DNSchedule);
        formData.append("packagesNight", editorData.packagesNight);
        formData.append("star", editorData.star);
        formData.append("info", editorData.info);
        formData.append("description", editorData.description);
        formData.append("shortDescription", editorData.shortDescription);
        formData.append("location", editorData.location);
        formData.append("price", editorData.price);
        formData.append("map", editorData.map);
        formData.append("needToKnow", editorData.needToKnow);
        formData.append("canclePolicy", editorData.canclePolicy);
        formData.append("inclusions", editorData.inclusions);
        formData.append("image", fileList2[0].originFileObj)
        formData.append("categoryId", editorData?.categoryId)
        fileList.map((item) => formData.append("galleryPhoto", item?.originFileObj))
        triggre(formData);
    }
    console.log(editorData)

    const packageLists = packagesData?.data?.map((elm) => {
        return { value: elm?._id, label: elm?.name }
    })
    const starOption =[
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
    ]
    return (
        <div className='text-editor-wrapper'>
            <BreadCrum name={'Trip Packages Details'} />
            <div className="search-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlock: "10px" }}>
                <Input placeholder="Search here..." style={{ width: "50%" }} />
            </div>
            <div className="text-editor">
                <h3 className='title'>Name</h3>
                <Input type="text" style={{ width: '100%', color: '' }} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className='text-editor-num2'>


                <div className="text-editor">
                    <h3 className='title'>Packages Night</h3>
                    <select className="packageNight" id="rating" style={{ width: '100%', padding: "7px", outline: "none", border: "1px solid #ccc" }} onChange={(e) => handleChange("packagesNight", e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>

                    </select>
                </div>
                <div className="text-editor">
                    <h3 className='title'>star</h3>
                    <Select className="rating" style={{width:"100%"}} options={starOption} onChange={(e) => handleChange("star", e)} />
                   
                 

                </div>
            </div>
            <div className="text-editor">
                <h3 className='title'>DNSchedule</h3>
                <textarea id="textarea" name="textarea" rows="4" cols="50" style={{ width: '100%' }} onChange={(e) => handleChange("DNSchedule", e.target.value)} />
            </div>
            <div className="text-editor">
                <h3 className='title'>info</h3>
                <textarea id="textarea" name="textarea" rows="4" cols="50" style={{ width: '100%' }} onChange={(e) => handleChange("info", e.target.value)} />
            </div>
            <div className="text-editor">
                <h3 className='title'>Description</h3>
                <textarea id="textarea" name="textarea" rows="4" cols="50" style={{ width: '100%' }} onChange={(e) => handleChange("description", e.target.value)} />
            </div>
            <div className="text-editor">
                <h3 className='title'>Short Description</h3>
                <textarea id="textarea" name="textarea" rows="4" cols="50" style={{ width: '100%' }} onChange={(e) => handleChange("shortDescription", e.target.value)} />

            </div>
            <div className='text-editor-num'>
                <div className="text-editor">
                    <h3 className='title'>price</h3>
                    <Input type="number" style={{ width: '100%', color: '' }} onChange={(e) => handleChange("price", e.target.value)} />
                </div>
                <div className="text-editor" >
                    <h3 className='title'>Discount Price</h3>
                    <Input type="number" style={{ width: '100%' }} onChange={(e) => handleChange("discountPrice", e.target.value)} />
                </div>
            </div>
            <div className="text-editor">
                <h3 className='title'>map</h3>
                <Input type="" style={{ width: '100%', color: '' }} onChange={(e) => handleChange("map", e.target.value)} />
            </div>
            <div className="text-editor">
                <h3 className='title'>location</h3>
                <Input type="" style={{ width: '100%', color: '' }} onChange={(e) => handleChange("location", e.target.value)} />
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
                <Select options={packageLists} style={{ width: '100%' }} onChange={(e) => handleChange("categoryId", e)} placeholder='Select your packages' />;

            </div>
            <div className="text-editor">
                <h3 className='title'>Images</h3>
                <UploadTripImg setFileList={setFileList2} fileList={fileList2} length={1} />
            </div>



            <div className="text-editor">
                <h3 className='title'>Upload Trip Images</h3>
                <UploadTripImg setFileList={setFileList} fileList={fileList} length={5} />
            </div>


            <Button onClick={submitHandler}>Submit</Button>
        </div>
    )
}

export default AddPackageDetail