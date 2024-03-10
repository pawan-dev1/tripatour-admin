import { Button, Form, Input } from "antd";
import { useCourseDetailsMutation } from "../../../store/services/coursesDetail";

const AddCourseTopics = ({courseId}) => {
  const [trigger, { data: addCourseDetails }] = useCourseDetailsMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({ ...values, type: "1",id:courseId});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          label="Course Topic"
          name="courseTopic"
          rules={[
            {
              required: true,
              message: "Please input your courseTopic!",
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
};

export default AddCourseTopics;
