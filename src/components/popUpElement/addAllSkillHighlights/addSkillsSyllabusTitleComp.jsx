import { Button, Form, Input, message } from "antd";
import { useAddSyllabusTitleMutation } from "../../../store/services/addSkillDetails";
import { useEffect } from "react";

const AddSkillsSyllabusTitleComp = ({ skillId, setIsModalOpen }) => {
  const [trigger, { data: AddedTitle }] = useAddSyllabusTitleMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({
      ...values,
      id: skillId,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (AddedTitle?.success) {
      setIsModalOpen(false);
      message.success(AddedTitle.message);
    }
  }, [AddedTitle]);

  return (
    <div className="add-skills-title">
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
          label="Syllabus Title"
          name="title"
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

export default AddSkillsSyllabusTitleComp;
