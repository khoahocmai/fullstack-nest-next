"use server";
import { auth, signIn } from "@/auth";
import { sendRequest } from "./api";
import { revalidateTag } from "next/cache";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      //   callbackUrl: "/",
      redirect: false,
    });
    return r;
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return {
        error: "Internal server error",
        code: 0,
      };
    }
  }
}

export const handleCreateUserAction = async (data: any) => {
  const session = await auth(); // Lấy thông tin phiên đăng nhập
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`, // API endpoint
    method: "POST", // Phương thức HTTP
    headers: {
      Authorization: `Bearer ${session?.access_token}`, // Đính kèm token vào header
    },
    body: { ...data }, // Dữ liệu cần gửi đến API
  });

  revalidateTag("list-users"); // Làm mới dữ liệu cho thẻ "list-users"
  return res; // Trả về kết quả từ API
};

export const handleUpdateUserAction = async (data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: { ...data },
  });

  revalidateTag("list-users");
  return res;
};

export const handleDeleteUserAction = async (id: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  revalidateTag("list-users");
  return res;
};
