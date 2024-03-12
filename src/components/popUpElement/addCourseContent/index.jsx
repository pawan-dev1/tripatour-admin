import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useCourseDetailsMutation } from "../../../store/services/getCourseDetails";

const AddCourseContent = ({courseId,onCloseModal}) => {
    const [trigger, { data: addCourseDetails }] = useCourseDetailsMutation();

    const onFinish = (values) => {
      trigger({ ...values, type: "2",id:courseId });
    }; 
  
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    useEffect(() => {
      if (addCourseDetails?.success) {
        message.success(addCourseDetails?.message);
        onCloseModal();
      }
    }, [addCourseDetails]);
    return (
      <div className="add-course-topic">
        <Form
          name="basic"
          labelCol={{
              span: 24,
            }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Course Title"
            name="courseTitle"
            rules={[
              {
                required: true,
                message: "Please input your courseTitle!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Course Description"
            name="courseDesc"
            rules={[
              {
                required: true,
                message: "Please input your courseDesc!",
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
      </div>
    );
}

export default AddCourseContent