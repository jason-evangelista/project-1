import DashBoardLayout from "@components/DashboardLayout";
import CreateFood from "@components/page-component/dashboard/create-food/CreateFood";
import SessionReturn from "@type/session";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SessionReturn>
) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

const CreateFoodPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { session } = props;
  const router = useRouter();

  useEffect(() => {
    if (!session) router.replace("/auth/sign-in");
  }, [session, router]);

  return (
    session && (
      <>
        <Head>
          <title>Create Food</title>
        </Head>
        <DashBoardLayout session={session}>
          <CreateFood />
        </DashBoardLayout>
      </>
    )
  );
};

export default CreateFoodPage;
