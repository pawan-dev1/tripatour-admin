import { Button, Form, Input, message } from "antd";
import { useEditSyllabusTitleMutation } from "../../../store/services/addSkillDetails";
import { useEffect } from "react";
const EditSkillSyllabusTitle = ({ getParams, getTitleId, setIsModalOpen }) => {
  const [trigger, { data: editedData }] = useEditSyllabusTitleMutation();
  console.log(getTitleId);
  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({
      ...values,
      courseId: getParams,
      syllabusItemId: getTitleId?._id,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (editedData?.success) {
      setIsModalOpen(false);
      message.success(editedData?.message);
    }
  }, [editedData]);

  return (
    <div className="edit-skills-title">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
          newTitle: getTitleId?.title,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Syllabus Title"
          name="newTitle"
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

export default EditSkillSyllabusTitle;
