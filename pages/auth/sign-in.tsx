import { NextPage } from "next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import SignIn from "@components/page-component/auth/sign-in/SignIn";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SignInPage: NextPage = () => {
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
        <title>Sign In</title>
      </Head>
      <SignIn />
    </>
  );
};

export default SignInPage;
