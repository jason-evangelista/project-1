import { NextPage } from "next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SignUp from "@components/page-component/auth/sign-up/SignUp";
import Head from "next/head";

const SignUpPage: NextPage = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  useEffect(() => {
    if (session) router.push("/dashboard");
    return;
  }, [session, router]);

  return session ? (
    <></>
  ) : (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUp />
    </>
  );
};

export default SignUpPage;
