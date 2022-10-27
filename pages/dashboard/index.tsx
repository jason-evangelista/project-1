import { NextPage } from "next";
import { User } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { UserProfile } from "@prisma/client";
import Head from "next/head";
import Dashboard from "@components/page-component/dashboard/Dashboard";
import DashBoardLayout from "@components/DashboardLayout";
import prisma from "@prisma/prisma-client";
import FoodListType from "@components/page-component/dashboard/type/FoodListType";

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/sign-in",
  getServerSideProps: async (ctx, supabase) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const food = await prisma.food.findMany({
      include: {
        User: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const filteredFood = food.filter(
      (item) => item.user_id === user?.id || item.isPublic
    );

    const userProfile = await prisma.userProfile.findUnique({
      where: { id: user?.id },
    });

    return {
      props: {
        food: JSON.parse(JSON.stringify(filteredFood)) as FoodListType[],
        userProfile: JSON.parse(JSON.stringify(userProfile)) as UserProfile,
      },
    };
  },
});

const DashBoardPage: NextPage<{
  user: User;
  food: FoodListType[];
  userProfile: UserProfile;
}> = (props) => {
  const { food, user, userProfile } = props;

  return (
    user && (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <DashBoardLayout userProfile={userProfile}>
          <Dashboard food={food} />
        </DashBoardLayout>
      </>
    )
  );
};

export default DashBoardPage;
