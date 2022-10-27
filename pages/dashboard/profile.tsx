import {
  createServerSupabaseClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import { Divider } from "@mantine/core";
import { ApiQuota } from "@prisma/client";
import { UserProfile } from "@prisma/client";
import DashBoardLayout from "@components/DashboardLayout";
import Profile from "@components/page-component/dashboard/profile/Profile";
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
    const userProfile = await prisma.userProfile.findUnique({
      where: { id: data.user?.id },
    });
    return {
      props: {
        apiQuota: JSON.parse(JSON.stringify(apiQuota)) as ApiQuota,
        userProfile: JSON.parse(JSON.stringify(userProfile)) as UserProfile,
      },
    };
  },
});

const ProfilePage: NextPage<{
  user: User;
  apiQuota: ApiQuota;
  userProfile: UserProfile;
}> = (props) => {
  const { user, apiQuota, userProfile } = props;
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <DashBoardLayout userProfile={userProfile}>
        <Divider />
        <Profile user={user} apiQuota={apiQuota} userProfile={userProfile} />
      </DashBoardLayout>
    </>
  );
};

export default ProfilePage;
