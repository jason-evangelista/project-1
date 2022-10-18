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

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SessionReturn>
) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

const DashBoardPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { session } = props;
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
        <Dashboard />
      </>
    )
  );
};

export default DashBoardPage;
