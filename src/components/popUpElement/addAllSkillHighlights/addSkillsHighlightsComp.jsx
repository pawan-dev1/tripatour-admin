import { Button, Form, Input, message } from "antd";
import { useAddWhatToLearnMutation } from "../../../store/services/addSkillDetails";
import { useEffect } from "react";

const AddSkillsHighlightsComp = ({ paramsId, setIsModalOpen }) => {
  const [trigger, { data: addedHighlights }] = useAddWhatToLearnMutation();
  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({
      ...values,
      id: paramsId,
    });
  };

  useEffect(() => {
    if (addedHighlights?.success) {
      setIsModalOpen(false);
      message.success(addedHighlights?.message);
    }
  }, [addedHighlights]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="add-skills-highlights">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Highlight"
          name="learn"
          rules={[
            {
              required: true,
              message: "Please input your skill name!",
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

export default AddSkillsHighlightsComp;
