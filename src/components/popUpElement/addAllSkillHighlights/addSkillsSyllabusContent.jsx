import { Button, Form, Input, message } from "antd";
import { useAddSyllabusDescMutation } from "../../../store/services/addSkillDetails";
import { useEffect } from "react";

const AddSkillsSyllabusContent = ({ skillId, getTitleId, setIsModalOpen }) => {
  const [trigger, { data: AddedDesc }] = useAddSyllabusDescMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({
      ...values,
      id: skillId,
      titleId: getTitleId?._id,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (AddedDesc?.success) {
      setIsModalOpen(false);
      message.success(AddedDesc?.message);
    }
  }, [AddedDesc]);

  return (
    <div className="add-skills-content">
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
          label="Syllabus Description"
          name="desc"
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
  );
};

export default AddSkillsSyllabusContent;
