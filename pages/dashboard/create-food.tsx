import { User } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import CreateFood from "@components/page-component/dashboard/create-food/CreateFood";
import DashBoardLayout from "@components/DashboardLayout";
import Head from "next/head";

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/sign-in",
});

const CreateFoodPage: NextPage<{ user: User }> = (props) => {
  const { user } = props;

  return (
    <>
      <Head>
        <title>Create Food</title>
      </Head>
      <DashBoardLayout user={user}>
        <CreateFood />
      </DashBoardLayout>
    </>
  );
};

export default CreateFoodPage;
