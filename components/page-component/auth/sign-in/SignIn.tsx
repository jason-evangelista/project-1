import { FC } from "react";
import { Button, Container, TextInput, Divider } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSessionContext } from "@supabase/auth-helpers-react";

import SignUpBody from "../sign-up/type/SignUpBody";
import Notify from "@api/notify";

type SignInBody = Pick<SignUpBody, "email" | "password">;

const SignIn: FC = () => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<SignInBody>();

  const emailField = register("email", { required: "Email is required" });
  const passwordField = register("password", {
    required: "Password is required",
  });

  const handleOnGoogleSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
    if (error) return Notify(error.message, null, "error");
  };

  const onSignIn = async () => {
    const { email, password } = getValues();
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return Notify(error?.message, null, "error");
    router.replace("/dashboard");
    return;
  };

  return (
    <Container
      my="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <form onSubmit={handleSubmit(onSignIn)}>
        <TextInput
          placeholder="Email"
          my="sm"
          name={emailField.name}
          ref={emailField.ref}
          onChange={emailField.onChange}
          error={errors.email?.message}
        />
        <TextInput
          placeholder="Password"
          type="password"
          my="sm"
          name={passwordField.name}
          ref={passwordField.ref}
          onChange={passwordField.onChange}
          error={errors.password?.message}
        />
        <Button fullWidth type="submit" mb="sm" loading={isSubmitting}>
          Sign In
        </Button>
        <Button fullWidth variant="outline" onClick={handleOnGoogleSignIn}>
          Sign In with Google
        </Button>
        <Divider
          label="Don't have an account?"
          labelPosition="center"
          mt="sm"
        />
        <Button
          component={NextLink}
          href="/auth/sign-up"
          variant="light"
          fullWidth
          size="sm"
          mt="sm"
        >
          Sign up
        </Button>
      </form>
    </Container>
  );
};

export default SignIn;
