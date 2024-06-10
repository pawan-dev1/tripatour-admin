import  { useEffect, useState } from 'react'
import {  useEditPackageDetailsMutation, useGetPackageDetailsMutation } from '../../store/services/addTourDetail'
import { Editor } from "primereact/editor";
import "./styles.scss"
import UploadTripImg from './uploadTripImg';
import { useGetTourCategoryQuery } from '../../store/services/tourPackages';
import { Button, Input, Select } from 'antd';
import { BreadCrum } from '../../components/breadCrume';
import {  useParams } from 'react-router-dom';
export async function blobCreationFromURL(inputURI) {
    const response = await fetch(inputURI);
    const blob = await response.blob();
    return new File([blob], inputURI, {
        type: blob.type || "image/jpeg",
      })
    // return blob
  }

const EditPackageDetail = () => {


    const [fileList, setFileList] = useState([])
    const [editorData, setEditorData] = useState({
        tourId: "",
        highlights: "",
        needToKnow: "",
        canclePolicy: "",
        inclusions: "",
        images: []
    })
    const [triggre, { data }] = useEditPackageDetailsMutation()
    const { data: packagesData } = useGetTourCategoryQuery()


    const [trigger, { data:packageDetailData }] = useGetPackageDetailsMutation()
    const { id } = useParams()
  


    useEffect(() => {
        trigger({ tourId: id })
    }, [])

    const handleChange = (name, value) => {
        setEditorData((prev) => {
            return {
                ...prev, [name]: value

            }
        })
    }


    const submitHandler = async() => {
        
        const formData = new FormData();
        formData.append("highlights", editorData.highlights);
        formData.append("needToKnow", editorData.needToKnow);
        formData.append("canclePolicy", editorData.canclePolicy);
        formData.append("inclusions", editorData.inclusions);
        
        // formData.append("tourId", editorData?.tourId)
        
        for(let item of fileList){
            console.log(item,"item")
            if(item?.originFileObj )  {
              formData.append("images",item?.originFileObj)
            }else { const data  = await blobCreationFromURL(item?.url)
              formData.append("images",data)
            }
          }
        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        
        triggre({data:formData,id:editorData?.tourId});
    }

    const packageLists = packagesData?.data?.map((elm) => {
        return { value: elm?._id, label: elm?.title }
    })

    useEffect(() => {
      const getImage =  packageDetailData?.data[0].images?.map((item)=>{
         return {
            url:item
         }
        } 
     )
     setFileList(getImage)

     const highlights = packageDetailData?.data[0]?.highlights[0]
     const inclusions = packageDetailData?.data[0]?.inclusions[0]
     const needToKnow = packageDetailData?.data[0]?.needToKnow[0]
     const canclePolicy = packageDetailData?.data[0]?.canclePolicy[0]
     const tourId = packageDetailData?.data[0]?._id
     setEditorData((prev)=>{
        return{
            ...prev,highlights:highlights,inclusions:inclusions,needToKnow:needToKnow,canclePolicy:canclePolicy,tourId:tourId
        }
     })
     
    }, [packageDetailData])
    console.log(fileList)
    return (
        <div className='text-editor-wrapper'>
             <BreadCrum name={'Edit Packages Details'} sub={"Packages Section"}/>
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
                <Select  options={packageLists} style={{ width: '100%' }} onChange={(e)=>handleChange("tourId",e)} placeholder='Select your packages'/>;

            </div>
            <div className="text-editor">
                <h3 className='title'>Upload Trip Images</h3>
                <UploadTripImg setFileList={setFileList} fileList={fileList} />
            </div>


            <Button onClick={submitHandler}>Submit</Button>
        </div>
    )
}

export default EditPackageDetail