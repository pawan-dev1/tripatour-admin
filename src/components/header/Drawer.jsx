import { Button, Drawer, Form, Input, Select } from "antd";
import { MdWavingHand } from "react-icons/md";
import { user } from "../../assets";
import { useState } from "react";
const DrawerComp = ({ open, setOpen }) => {
  const [disableState, setDisableState] = useState(true);
  const [form] = Form.useForm();
  const onClose = () => {
    setOpen(false);
    setDisableState(true);
  };

  const formFeild = [
    {
      name: "userid",
      value: "",
      label: "Username",
      placeholder: "Enter Username here",
      disable: disableState,
    },
    {
      name: "gender",
      value: "",
      label: "Gender",
      placeholder: "Enter Gender here",
      children: ["Male", "Female"],
      disable: disableState,
    },
    {
      name: "profession",
      value: "",
      label: "Profession",
      placeholder: "Enter Profression here",
      disable: disableState,
    },
  ];

  const onFinish = (values) => {
    console.log("click", values);
  };

  const onFinishFailed = () => {
    console.log("Submit failed!");
  };
  return (
    <Drawer
      title={
        <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          Hii, Raghav
          <span
            style={{
              color: "#6e61e4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdWavingHand />
          </span>
        </p>
      }
      placement="right"
      onClose={onClose}
      open={open}
    >
      <div className="user-profile-container">
        <div className="user-profile">
          <img src={user} alt="" />
        </div>
        <div className="user-detail">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login-form"
          >
            {formFeild?.map((item) => {
              if (item.label == "Gender") {
                return (
                  <Form.Item label="Select" key={item.label + item.name}>
                    <Select defaultValue={"Male"} disabled={item.disable}>
                      {item?.children?.map((list) => {
                        return (
                          <Select.Option value={list} key={list}>
                            {list}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                );
              } else {
                return (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    // rules={[
                    //   {
                    //     required: true,
                    //   },
                    // ]}
                    key={item.name + item.label}
                  >
                    <Input
                      placeholder={item.placeholder}
                      disabled={item.disable}
                    />
                  </Form.Item>
                );
              }
            })}
            {!disableState ? (
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="form-submit-btn"
                >
                  Submit
                </Button>
              </Form.Item>
            ) : (
              <Form.Item>
                <Button
                  type="primary"
                  // htmlType="submit"
                  className="form-submit-btn"
                  onClick={() => setDisableState(!disableState)}
                >
                  Edit Profile
                </Button>
              </Form.Item>
            )}
          </Form>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerComp;
