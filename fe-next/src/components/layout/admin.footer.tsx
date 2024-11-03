"use client";
import { Layout } from "antd";

const AdminFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        Đăng Khoa ©{new Date().getFullYear()} Created by @doduongdangkhoa
      </Footer>
    </>
  );
};

export default AdminFooter;
