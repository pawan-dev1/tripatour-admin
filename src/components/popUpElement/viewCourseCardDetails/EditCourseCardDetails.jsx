import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";

const EditCourseCardDetails = ({ courseCardData, handleCancel }) => {
  const [trigger, { data }] = useCourseCardDetailsEditMutation();
  const onFinish = (values) => {
    const formData = {
      ...values,
      objId: courseCardData._id,
      id: courseCardData?.id,
    };
    trigger(formData);
  };

  const onFinishFailed = (error) => {
  };

  useEffect(() => {
    if (data?.success) {
      message.success(data?.message);
      handleCancel();
    }
  }, [data]);

  return (
    <div className="edit-course-card-details">
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
          desc: courseCardData?.desc,
          title: courseCardData?.title,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Edit Title" name="title" className="input-field">
          <Input />
        </Form.Item>

        <Form.Item label="Edit Description" name="desc" className="input-field">
          <Input />
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
    </div>
  );
};

export default EditCourseCardDetails;
