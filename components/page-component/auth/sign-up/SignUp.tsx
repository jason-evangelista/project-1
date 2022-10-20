import { FC } from "react";
import { Button, Container, TextInput, Divider } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import SignUpBody from "./type/SignUpBody";
import Notify from "@api/notify";
import { useSessionContext } from "@supabase/auth-helpers-react";

const SignUp: FC = () => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<SignUpBody>();

  const emailField = register("email", { required: "Email is required" });
  const passwordField = register("password", {
    required: "Password is required",
  });

  const onSignUp = async () => {
    const { email, password } = getValues();

    const checkUser = await supabaseClient
      .from("user_profile")
      .select()
      .eq("email", email);

    if (checkUser) return Notify("Email already exist", null, "error");

    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) return Notify(error.message, null, "error");
    router.push("/auth/sign-in");
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
      <form onSubmit={handleSubmit(onSignUp)}>
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
        <Button fullWidth type="submit" loading={isSubmitting}>
          Sign Up
        </Button>
        <Divider
          label="Already have an account?"
          labelPosition="center"
          mt="sm"
        />
        <Button
          component={NextLink}
          href="/auth/sign-in"
          variant="light"
          fullWidth
          size="sm"
          mt="sm"
        >
          Sign in
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
