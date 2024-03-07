import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SiderComponent from "../components/sider/index";
import HeaderComponent from "../components/header/Header";
const { Header, Sider, Content } = Layout;

import "./styles.scss";
import { useEffect, useRef } from "react";
const LayoutPrimary = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    window.onscroll = (e) => {
      console.log(
        document.documentElement.scrollTop,
        "elementRef",
        elementRef.current.clientHeight
      );
    };
  }, []);
  return (
    <Layout className="main-layout">
      <Header className="layout-header">
        <HeaderComponent />
      </Header>
      <Layout className="sub-layout">
        <Sider className="layout-sider">
          <SiderComponent />
        </Sider>
        <Content className="layout-content" ref={elementRef}>
          <Outlet context={[elementRef]} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPrimary;
