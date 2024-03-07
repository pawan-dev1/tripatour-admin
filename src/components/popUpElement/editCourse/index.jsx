import { Button, Form, Input } from "antd";
import { SecondaryButton } from "../../../common/button";

const EditCourse = ({ fun, userData }) => {
  const [form] = Form.useForm();

  // const onFinish = (values) => {
  //   console.log("click", values);
  // };

  const onFinishFailed = () => {
    console.log("Submit failed!");
  };
  return (
    <div>
      {/* <Input
        onChange={(e) =>
          setEditCoursesData((prev) => {
            return {
              ...prev,
              coursename: e.target.value,
            };
          })
        }
      />
      <SecondaryButton name={"Edit"} fun={fun} /> */}
      <Form
        form={form}
        layout="vertical"
        onFinish={fun}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="add-courses-form"
        initialValues={{
          coursename: userData?.coursename,
        }}
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
    </div>
  );
};

export default EditCourse;
