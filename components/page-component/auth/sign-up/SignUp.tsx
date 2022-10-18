import { FC } from "react";
import { Button, Container, TextInput, Divider } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import SignUpBody from "./type/SignUpBody";
import axios from "axios";
import Notify from "@api/notify";

const SignUp: FC = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<SignUpBody>();

  const userNameField = register("username", {
    required: "Username is required",
  });

  const emailField = register("email", { required: "Email is required" });
  const passwordField = register("password", {
    required: "Password is required",
  });

  const onSignUp = async () => {
    const data = getValues();
    try {
      await axios.post("/api/register", data);
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e.response.data.message;
      Notify(message, null, "error");
    }
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
          placeholder="Username"
          my="sm"
          name={userNameField.name}
          ref={userNameField.ref}
          onChange={userNameField.onChange}
          error={errors.username?.message}
        />
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
