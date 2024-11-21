"use client";

import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";

const ModalChangePassword = (props: any) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [userEmail, setUserEmail] = useState("");

  const hasMounted = useHasMounted();

  if (!hasMounted) return <></>;

  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-password`,
      method: "POST",
      body: {
        email,
      },
    });

    if (res?.data) {
      setUserEmail(res?.data?.email);
      setCurrent(1);
    } else {
      notification.error({
        message: "Call APIs error",
        description: res?.message,
      });
    }
  };

  const onFinishStep1 = async (values: any) => {
    const { code, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      notification.error({
        message: "Error change password",
        description: "Mật khẩu và xác nhận mật khẩu không trùng khớp",
      });
      return;
    }
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/change-password`,
      method: "POST",
      body: {
        code,
        password,
        confirmPassword,
        email: userEmail,
      },
    });

    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: "Call APIs error",
        description: res?.message,
      });
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCurrent(0);
    setUserEmail("");
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Quên mật khẩu"
        open={isModalOpen}
        onOk={resetModal}
        onCancel={resetModal}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Email",
              // status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              // status: 'finish',
              icon: <SolutionOutlined />,
            },

            {
              title: "Done",
              // status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current === 0 && (
          <>
            <div style={{ margin: "20px 0" }}>
              <p>
                Để thực hiện thay đổi mật khẩu, vui lòng nhập email tài khoản
                của bạn.
              </p>
            </div>
            <Form
              name="change-password"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
              <Form.Item label="" name="email">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 1 && (
          <>
            <div style={{ margin: "20px 0" }}>
              <p>Vui lòng thực hiện đổi mật khẩu</p>
            </div>

            <Form
              name="change-pass-2"
              onFinish={onFinishStep1}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 2 && (
          <div style={{ margin: "20px 0" }}>
            <p>
              Tải khoản của bạn đã được thay đổi mật khẩu thành công. Vui lòng
              đăng nhập lại
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalChangePassword;
