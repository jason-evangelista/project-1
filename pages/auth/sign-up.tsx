import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import SignUp from "@components/page-component/auth/sign-up/SignUp";
import Head from "next/head";
import SessionReturn from "@type/session";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SessionReturn>
) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

const SignUpPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { session } = props;
  const router = useRouter();

  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [router, session]);

  if (session) return null;

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUp />
    </>
  );
};

export default SignUpPage;
