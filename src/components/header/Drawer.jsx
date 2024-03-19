import { Button, Drawer, Form, Input, Select } from "antd";
import { MdWavingHand } from "react-icons/md";
import { user } from "../../assets";
import { useState } from "react";
import { useEditAdminMutation, useGetUserDataQuery } from "../../store/services/getAllSubAdmin";
const DrawerComp = ({ open, setOpen }) => {
  const [disableState, setDisableState] = useState(true);
  const [form] = Form.useForm();

  const [trigger, { data: editUserData }] = useEditAdminMutation();
  const { data: getUserData } = useGetUserDataQuery();
  console.log(getUserData, "getUserData");

  const userName = localStorage?.username;
  const gender = localStorage?.gender;
  const profession = localStorage?.profession;
  const userId = localStorage?.userId;

  const onClose = () => {
    setOpen(false);
    setDisableState(true);
  };

  const formFeild = [
    {
      name: "username",
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
      label: "Profession",
      placeholder: "Enter Profession here",
      disable: disableState,
    },
  ];

  const onFinish = (values) => {
    console.log("click", values);
    trigger({...values, id:getUserData?.data?._id});
  };

  const onFinishFailed = () => {
    console.log("Submit failed!");
  };
  return (
    <Drawer
      title={
        <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {getUserData?.data?.username}
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
            initialValues={{
              profession: getUserData?.data?.profession,
              username: getUserData?.data?.username,
              gender: getUserData?.data?.gender,
            }}
          >
            {formFeild?.map((item) => {
              if (item.label == "Gender") {
                return (
                  <Form.Item label="Select" name={item?.name} key={item.label + item.name}>
                    <Select defaultValue={gender} disabled={item.disable}>
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
                <Button
                  type="primary"
                  // htmlType="submit"
                  className="form-submit-btn"
                  style={{marginTop:20}}
                  onClick={() => setDisableState(!disableState)}
                >
                  Edit Profile
                </Button>
            )}
          </Form>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerComp;
