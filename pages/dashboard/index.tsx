/* eslint-disable react-hooks/rules-of-hooks */
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import SessionReturn from "@type/session";
import Dashboard from "@components/page-component/dashboard/Dashboard";
import DashBoardLayout from "@components/DashboardLayout";
import prisma from "@prisma/prisma-client";
import FoodListType from "@components/page-component/dashboard/type/FoodListType";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SessionReturn>
) => {
  const session = await getSession(context);

  const getUser = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

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

  const filterFood = food.filter(
    (item) => item.user_id === getUser?.id || item.isPublic
  );

  return {
    props: {
      session,
      food: JSON.parse(JSON.stringify(filterFood)) as FoodListType[],
    },
  };
};

const DashBoardPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { session, food } = props;
  const router = useRouter();

  useEffect(() => {
    if (!session) router.replace("/auth/sign-in");
  }, [router, session]);

  return (
    session && (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <DashBoardLayout session={session}>
          <Dashboard food={food} />
        </DashBoardLayout>
      </>
    )
  );
};

export default DashBoardPage;
