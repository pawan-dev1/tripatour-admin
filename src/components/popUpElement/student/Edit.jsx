import { Button, Form, Input, Select, TimePicker, message } from "antd";
import { useEditStudentMutation } from '../../../store/services/getAllStudent'
import { useEffect, useState } from "react";
import moment from "moment";


const EditStudent = ({studentdata,fun,handleCancel}) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [date, setDate] = useState("");
  const [trigger,{data}] = useEditStudentMutation()
  const onFinish =(values)=>{
    trigger({...values,batch_time:date,id:studentdata?._id})
  }
  const onFinishFailed = (error)=>{
    console.log(error)
  }
  const onChange = (time, timeString) => {
    setDate(timeString);
  };
  useEffect(() => {
    setDate(studentdata?.batch_time)
  }, [studentdata])
  useEffect(() => {
    if(data?.success){
      message.success(data?.message)
      handleCancel()
      fun()
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
          student_name:studentdata?.student_name,
          email:studentdata.email,
          phone:studentdata?.phone,
          gender:studentdata?.gender,
          coursename:studentdata?.coursename,
          address:studentdata?.address,
          parent_name:studentdata?.parent_name,
          classroom_type:studentdata?.classroom_type,
          // batch_time:studentdata?.batch_time
        }}
      >
        <Form.Item
          name="student_name"
          label="Student Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter student name Here.."} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter email here.."} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter phone no here.."} />
        </Form.Item>
        
        <Form.Item>
        <Form.Item
            label="Gender"
            name="gender"
          >
            <Select placeholder="Select a gender" allowClear name="gander">
            <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>

        <Form.Item
          label="Course Name"
          name="coursename"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter course name here.."} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter address here.."} />
        </Form.Item>
        <Form.Item
          label="Parent Name"
          name="parent_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter parent name here.."} />
        </Form.Item>
        <Form.Item
            label="Class Room Type"
            name="classroom_type"
          >
            <Select
              placeholder="Select a"
              allowClear
              name="classroom_type"
            >
              <Option value="Offline">Offline</Option>
              <Option value="Online">Online</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="batch_time"
            label="Batch Time"
            
        
          >
            <TimePicker
              onChange={onChange}
              format={("00:00", "h:mm")}
              style={{ width: "100%" }}
              // defaultValue={moment(studentdata?.batch_time).format("hh:mm")}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditStudent