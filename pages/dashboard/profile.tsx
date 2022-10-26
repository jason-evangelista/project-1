import {
  createServerSupabaseClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import { Divider } from "@mantine/core";
import { ApiQuota } from "@prisma/client";
import DashBoardLayout from "@components/DashboardLayout";
import Profile from "@components/page-component/dashboard/type/Profile";
import Head from "next/head";
import prisma from "@prisma/prisma-client";

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/sign-in",
  getServerSideProps: async (ctx) => {
    const { auth } = createServerSupabaseClient(ctx);
    const { data } = await auth.getUser();

    const apiQuota = await prisma.apiQuota.findUnique({
      where: { fromUser: data.user?.id },
    });
    return {
      props: {
        apiQuota: JSON.parse(JSON.stringify(apiQuota)) as ApiQuota,
      },
    };
  },
});

const ProfilePage: NextPage<{ user: User; apiQuota: ApiQuota }> = (props) => {
  const { user, apiQuota } = props;
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <DashBoardLayout user={user}>
        <Divider />
        <Profile user={user} apiQuota={apiQuota} />
      </DashBoardLayout>
    </>
  );
};

export default ProfilePage;
