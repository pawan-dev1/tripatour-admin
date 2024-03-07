import { Button, Form, Input } from "antd";
///styles
import "./styles.scss";

const AddNewCourses = ({ onFinish }) => {
  const [form] = Form.useForm();

  // const onFinish = (values) => {
  //   console.log("click", values);
  // };

  const onFinishFailed = () => {
    console.log("Submit failed!");
  };
 

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="add-courses-form"
      >
        <Form.Item
          name="coursename"
          label="Add Courses"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter New Course Here.."} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNewCourses;
