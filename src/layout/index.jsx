import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import SiderComponent from "../components/sider/index";
import HeaderComponent from "../components/header/Header";
const { Header, Sider, Content } = Layout;

import "./styles.scss";
import { useEffect, useRef } from "react";
import { dashBoardRoute, loginRoute } from "../routes/PagesRoutes";
const LayoutPrimary = () => {
  const elementRef = useRef(null);
  const navigate = useNavigate();
  const loginToken = localStorage.getItem("token");

  useEffect(() => {
    if (loginToken) {
      // navigate(dashBoardRoute);
    } else {
      navigate(loginRoute);
    }
  }, [loginToken]);
const location = window.location.pathname
  return (
    <Layout className="main-layout">
      <Header className="layout-header">
        <HeaderComponent />
      </Header>
      <Layout className="sub-layout">
        <Sider className="layout-sider">
          <SiderComponent />
        </Sider>
        <Content className="layout-content" ref={elementRef} style={{padding:location == "/" && "0px"}}>
          <Outlet context={[elementRef]} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPrimary;
