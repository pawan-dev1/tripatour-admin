import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";

const EditWhatToLearn = ({ whatToLearnData ,onCloseModal}) => {
  const [trigger, { data: whatToLearnEdited }] = useEditCourseTopicsMutation();


  const onFinish = (values) => {

   
    trigger({...values,id:whatToLearnData?._id});
  };

  const onFinishFailed = (errorInfo) => {
  };

  useEffect(() => {
    if (whatToLearnEdited?.success) {
      message.success(whatToLearnEdited?.message);
      onCloseModal();
    }
  }, [whatToLearnEdited]);

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
        whatWillYouLearn: whatToLearnData?.whatWillYouLearn,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Topics"
        name="whatWillYouLearn"
        rules={[
          {
            required: true,
            message: "Please input your topics!",
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
};

export default EditWhatToLearn;
