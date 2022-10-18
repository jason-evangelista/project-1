import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import SignIn from "@components/page-component/auth/sign-in/SignIn";
import Head from "next/head";
import SessionReturn from "@type/session";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SessionReturn>
) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

const SignInPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { session } = props;

  const router = useRouter();
  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [session, router]);

  if (session) return null;
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignIn />
    </>
  );
};

export default SignInPage;
