import { User } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { UserProfile } from "@prisma/client";
import CreateFood from "@components/page-component/dashboard/create-food/CreateFood";
import DashBoardLayout from "@components/DashboardLayout";
import Head from "next/head";
import prisma from "@prisma/prisma-client";

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/sign-in",
  getServerSideProps: async (ctx, supabase) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userProfile = await prisma.userProfile.findUnique({
      where: { id: user?.id },
    });

    return {
      props: {
        userProfile: JSON.parse(JSON.stringify(userProfile)) as UserProfile,
      },
    };
  },
});

const CreateFoodPage: NextPage<{ user: User; userProfile: UserProfile }> = (
  props
) => {
  const { userProfile } = props;

  return (
    <>
      <Head>
        <title>Create Food</title>
      </Head>
      <DashBoardLayout userProfile={userProfile}>
        <CreateFood />
      </DashBoardLayout>
    </>
  );
};

export default CreateFoodPage;
