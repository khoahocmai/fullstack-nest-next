import { auth } from "@/auth";
import UserTable from "@/components/admin/user.table";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ManageUserPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-user"] },
    },
  });

  return (
    <div>
      <UserTable users={res?.data.results ?? []} meta={res?.data.meta} />
    </div>
  );
};

export default ManageUserPage;
