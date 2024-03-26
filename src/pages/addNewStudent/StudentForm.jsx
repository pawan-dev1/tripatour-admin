import { useEffect, useState } from "react";
import { Button, Form, Input, Select, TimePicker } from "antd";
import { useCreateNewStudentMutation } from "../../store/services/createNewStudent";
import { toast } from "react-toastify";
import PrimaryModal from "../../common/modal";
import UserCredentialModal from "../../components/popUpElement/userCredentialModal/index";
import { useCourseGetCategoryQuery } from "../../store/services/courseCategories";

const StudentForm = () => {
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInstituteType, setCheckInstituteType] = useState({});
  const [trigger, { data }] = useCreateNewStudentMutation();
  const { data: CourseData } = useCourseGetCategoryQuery();

  const { Option } = Select;
  const [form] = Form.useForm();

  const courseName = CourseData?.data?.map((elm) => elm?.name);
  const instituteType = ["Academy", "Computer"];

  const checkIntituteTpyeHnadler = (name, value) => {
    setCheckInstituteType((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
      form.resetFields();
      showModal();
    }
  }, [data]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  // useEffect(() => {
  //   trigge();
  // }, []);

  const onFinish = (values) => {
    const newValue = {
      ...values,
      batch_time: date,
    };
    trigger(newValue);
  };

  const onFinishFailed = () => {
  };
  const onChange = (time, timeString) => {
    setDate(timeString);
  };

  return (
    <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={"User Credential"}
        onFinish={onFinish}
        element={
          <UserCredentialModal data={data} setIsModalOpen={setIsModalOpen} />
        }
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="student-form"
      >
        <div className="student-form-left-col">
          <Form.Item
            name="student_name"
            label="Name"
            className="form-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter User Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
            className="form-item"
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone No."
            rules={[
              {
                required: true,
              },
            ]}
            className="form-item"
          >
            <Input placeholder="Enter User Name" />
          </Form.Item>
          <Form.Item
            label="Course Name"
            name="coursename"
            className="form-item"
          >
            <Select placeholder="Select a" allowClear name={courseName}>
              {courseName?.map((item, index) => (
                <Option value={item} key={item + index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
     
          <Form.Item label="Gender" name="gender" className="form-item">
            <Select
              placeholder="Select a"
              allowClear
              name={["address", "province"]}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Class Room Type"
            name="classroom_type"
            className="form-item"
          >
            <Select
              placeholder="Select a"
              allowClear
              name={["Offline", "Online"]}
            >
              <Option value="Offline">Offline</Option>
              <Option value="Online">Online</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parent_name"
            label="Parents Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Parents Name" />
          </Form.Item>
        </div>
        <div className="student-form-right-col">
          <Form.Item label="Type" name="type" className="form-item">
            <Select
              placeholder="Select a Type"
              allowClear
              name={instituteType}
              onChange={(e) => checkIntituteTpyeHnadler("type", e)}
            >
              {instituteType?.map((item, index) => {
                return (
                  <Option value={item} key={item + index}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {checkInstituteType?.type == "Computer" && (
            <>
              <Form.Item
                name="course_price"
                label="Course Price"
                rules={[
                  {
                    required:
                      checkInstituteType?.type == "Computer" ? true : false,
                  },
                ]}
              >
                <Input placeholder="Enter Course Price" />
              </Form.Item>
              <Form.Item
                name="registration_fee"
                label="Registration Fees"
                rules={[
                  {
                    required:
                      checkInstituteType?.type == "Computer" ? true : false,
                  },
                ]}
                className="form-item"
              >
                <Input placeholder="Enter Registration Fees" />
              </Form.Item>
            </>
          )}

          <Form.Item
            name="monthly_fee"
            label="Monthly Fees"
            rules={[
              {
                required: true,
              },
            ]}
            className="form-item"
          >
            <Input placeholder="Enter Monthly Fees" />
          </Form.Item>
          <Form.Item
            name="batch_time"
            label="Batch Time"
            rules={[
              {
                required: true,
              },
            ]}
            className="form-item"
          >
            <TimePicker
              onChange={onChange}
              format={("00:00", "h:mm")}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="reference"
            label="Reference"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter refrence " />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address "
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter address " />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form-submit-btn"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default StudentForm;
