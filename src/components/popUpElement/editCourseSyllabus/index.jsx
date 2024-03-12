import { Button, Form, Input, message } from "antd";
import { useEditCourseSyllabusMutation } from "../../../store/services/getCourseDetails";
import { useEffect } from "react";

const EditCourseSyllabus = ({courseContentData,onCloseModal}) => {
const [trigger,{data}]=useEditCourseSyllabusMutation()
    const onFinish = (values) => {
        trigger({...values,id:courseContentData?._id});
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    useEffect(() => {
      if (data?.success) {
        message.success(data?.message);
        onCloseModal();
      }
    }, [data]);
  
    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
          courseTitle:courseContentData?.courseTitle,
          courseDesc:courseContentData?.courseDesc
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Syllabus Title"
          name="courseTitle"
          rules={[
            {
              required: true,
              message: "Please input your syllabus title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Syllabus Description"
          name="courseDesc"
          rules={[
            {
              required: true,
              message: "Please input your syllabus description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
}

export default EditCourseSyllabus