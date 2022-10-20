import { NextPage } from "next";
import { User } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
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
    console.log(user);
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

    return {
      props: {
        food: JSON.parse(JSON.stringify(filteredFood)) as FoodListType[],
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
