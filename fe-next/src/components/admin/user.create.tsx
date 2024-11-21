"use client";

import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { handleCreateUserAction } from "@/utils/actions"; // You would implement this action

interface UserCreateProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

const UserCreate = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
}: UserCreateProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateUser = async (values: any) => {
    setIsSubmitting(true); // Indicate the start of submission
    try {
      const response = await handleCreateUserAction(values); // Call the action to create a user

      if (response) {
        message.success("User created successfully!"); // Notify success
        setIsCreateModalOpen(false); // Close the modal
        form.resetFields(); // Reset form fields
      } else {
        // Handle API errors or unsuccessful responses
        const errorMessage = "Failed to create user. Please try again.";
        message.error(errorMessage);
      }
    } catch (error: any) {
      // Handle unexpected errors, e.g., network issues
      const errorMsg =
        error?.message ||
        "An unexpected error occurred while creating the user.";
      message.error(errorMsg);
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const handleCancel = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add new user"
      open={isCreateModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateUser}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter an email address!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter user's email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter a password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password placeholder="Enter a password" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the user's name!" },
            { min: 2, message: "Name must be at least 2 characters long!" },
          ]}
        >
          <Input placeholder="Enter user's name" />
        </Form.Item>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            OK
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserCreate;
