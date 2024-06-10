import { Button, Form, Input, Select, message } from "antd";
import { useEffect } from "react";
import { useEditCategoryMutation } from "../../../store/services/category";



const EditStudent = ({categoryData,handleCancel}) => {
  const [form] = Form.useForm();
  const [trigger,{data}] = useEditCategoryMutation()
  const onFinish =(values)=>{
    trigger({data:values,id:categoryData?._id})
  }
  const onFinishFailed = (error)=>{
  }


  useEffect(() => {
    if(data?.status){
      message.success(data?.message)
      handleCancel()
    }
  }, [data])
  
  return (
    <div>
        <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="edit-student-form"
        initialValues={{
          name:categoryData?.name,
          description:categoryData.description,
        
          // batch_time:studentdata?.batch_time
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter student name Here.."} />
        </Form.Item>
        <Form.Item
          name="description"
          label="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter email here.."} />
        </Form.Item>
      
        
       

      
    
          <Form.Item>
           

          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditStudent