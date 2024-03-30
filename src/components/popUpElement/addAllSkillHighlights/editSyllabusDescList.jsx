import { Button, Form, Input, message } from "antd";
import { useEditSyllabusDescMutation } from "../../../store/services/addSkillDetails";
import { useEffect } from "react";

const EditSyllabusDescList = ({
  paramsId,
  addDescId,
  descId,
  setIsModalOpen,
}) => {
  console.log(paramsId, addDescId, descId);
  const [trigger, { data: editedData }] = useEditSyllabusDescMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({
      ...values,
      id: paramsId,
      titleId: addDescId?._id,
      descId: descId?._id,
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
    <div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
          newDesc: descId?.descText,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Syllabus Description"
          name="newDesc"
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

export default EditSyllabusDescList;
