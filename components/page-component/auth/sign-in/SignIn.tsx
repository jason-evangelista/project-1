import { FC } from "react";
import { Button, Container, TextInput, Divider } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import Notify from "@api/notify";
import SignUpBody from "../sign-up/type/SignUpBody";

type SignInBody = Pick<SignUpBody, "email" | "password">;

const SignIn: FC = () => {
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

  const onSignIn = async () => {
    const { email, password } = getValues();
    const data = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (data?.error) return Notify(data.error, null, "error");

    return router.replace("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <Button fullWidth type="submit" loading={isSubmitting}>
          Sign In
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
