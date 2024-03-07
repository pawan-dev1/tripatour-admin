import { Button, Form, Input, message } from "antd";
import { useAddCourseCardDescMutation } from "../../../store/services/addCourseCardDesc";
import { useEffect } from "react";
import TextArea from "antd/es/input/TextArea";

const EditCourseCategories = ({ userData, handleCancel }) => {
  const [trigger, { data: addCourseCardDesc }] = useAddCourseCardDescMutation();

  const onFinish = (values) => {
    const data = { ...values, id: userData?._id };
    trigger(data);

  };
  const onFinishFailed = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (addCourseCardDesc?.success) {
      message.success(addCourseCardDesc?.message);
      handleCancel();
    }
  }, [addCourseCardDesc]);
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
          title:userData?.title,
          desc:userData?.desc
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the Description!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item style={{ margin: "0" }}>
          <Button
            htmlType="submit"
            style={{ background: "#6E61E4", color: "white", border: "none" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditCourseCategories;
