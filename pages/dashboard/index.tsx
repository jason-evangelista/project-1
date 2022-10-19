import { NextPage } from "next";
import Head from "next/head";
import Dashboard from "@components/page-component/dashboard/Dashboard";
import DashBoardLayout from "@components/DashboardLayout";
import prisma from "@prisma/prisma-client";
import FoodListType from "@components/page-component/dashboard/type/FoodListType";
import { User } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/sign-in",
  getServerSideProps: async () => {
    const food = await prisma.food.findMany({
      include: {
        User: {
          select: {
            user_name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return {
      props: {
        food: JSON.parse(JSON.stringify(food)) as FoodListType[],
      },
    };
  },
});

const DashBoardPage: NextPage<{ user: User; food: FoodListType[] }> = (
  props
) => {
  const { food, user } = props;

  return (
    user && (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <DashBoardLayout user={user}>
          <Dashboard food={food} />
        </DashBoardLayout>
      </>
    )
  );
};

export default DashBoardPage;
