import { Button, Form, Input, Space } from "antd";

///styles
import "./styles.scss";
import { useLoginMutation } from "../../store/services/login";
import { Link } from "react-router-dom";
import { signUp } from "../../routes/PagesRoutes";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [trigger, { data, error }] = useLoginMutation();

  const onFinish = (values) => {
    console.log("click", values);
    trigger(values);
  };

  const onFinishFailed = () => {
    console.log("Submit failed!");
  };

  const formFeild = [
    {
      name: "username",
      value: "",
      label: "Username",
      placeholder: "Enter Username here",
    },
    {
      name: "password",
      value: "",
      label: "Password",
      placeholder: "Enter Password here",
    },
  ];

  return (
    <>
      <div className="logo">GI</div>
      <div className="login-form-container">
        <div className="login-form-title">
          <h3>Log In</h3>
          <p>Welcome back! Please enter your detail</p>
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login-form"
      >
        {formFeild?.map((item) => {
          return (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={[
                {
                  required: true,
                },
              ]}
              key={item.name + item.label}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          );
        })}
        <Space
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Link to={signUp}>Create Account</Link>
          {/* <Link to={""}>Forgot Password?</Link> / */}
        </Space>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
