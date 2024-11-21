"use client";

import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { handleUpdateUserAction } from "@/utils/actions";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (value: boolean) => void;
  dataUpdate: any;
  setDataUpdate: (value: any) => void;
}

const UserUpdate = ({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  dataUpdate,
  setDataUpdate,
}: IProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      // Validate form data
      const values = await form.validateFields();
      setLoading(true);

      // Call update action
      await handleUpdateUserAction({ ...dataUpdate, ...values });

      // Close modal and reset data
      setIsUpdateModalOpen(false);
      setDataUpdate(null);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update a user"
      visible={isUpdateModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          email: dataUpdate?.email,
          name: dataUpdate?.name,
          phone: dataUpdate?.phone,
          address: dataUpdate?.address,
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Phone is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
