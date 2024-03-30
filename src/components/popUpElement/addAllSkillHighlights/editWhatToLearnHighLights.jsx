import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useEditWhatToLearnMutation } from "../../../store/services/addSkillDetails";

const EditWhatToLearnHighLights = ({
  getParams,
  getTitleId,
  setIsModalOpen,
}) => {
  const [trigger, { data: editData }] = useEditWhatToLearnMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({
      ...values,
      id: getParams,
      learnId: getTitleId?._id,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (editData?.success) {
      setIsModalOpen(false);
      message.success(editData?.message);
    }
  }, [editData]);

  return (
    <div>
      <div className="edit-skills-title">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
            newLearn: getTitleId?.learn,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Syllabus Title"
            name="newLearn"
            rules={[
              {
                required: true,
                message: "Please input your syllabus title!",
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
    </div>
  );
};

export default EditWhatToLearnHighLights;
