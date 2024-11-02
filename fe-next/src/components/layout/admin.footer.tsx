"use client";
import { Layout } from "antd";
const AdminFooter = () => {
  const { Footer } = Layout;
  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        Do Duong Dang Khoa ©{new Date().getFullYear()} Created by
        @doduongdangkhoa
      </Footer>
    </>
  );
};

export default AdminFooter;
