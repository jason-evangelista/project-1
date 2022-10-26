import { FC, useState } from "react";
import { Button, Container, TextInput, Divider } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import SignUpBody from "../sign-up/type/SignUpBody";
import Notify from "@api/notify";

type SignInBody = Pick<SignUpBody, "email" | "password">;

const SignIn: FC = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
    watch,
  } = useForm<SignInBody>();

  const [isMagicLinkSubmitting, setIsMagicLinkSubmitting] = useState(false);

  const emailField = register("email", { required: "Email is required" });
  const passwordField = register("password", {
    required: "Password is required",
  });

  const handleOnGoogleSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.OAUTH_REDIRECT,
      },
    });
    if (error) return Notify(error.message, null, "error");
  };

  const handleFacebookSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: process.env.OUATH_REDIRECT,
      },
    });
    if (error) return Notify(error.message, null, "error");
  };

  const handleMagicLinkSignIn = async () => {
    setIsMagicLinkSubmitting(true);
    const watchEmail = watch("email");
    if (!watchEmail) return Notify("Please provide an email", null, "error");
    const { email } = getValues();
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.OAUTH_REDIRECT,
      },
    });
    setIsMagicLinkSubmitting(false);
    Notify("Magic link login was sent to your email.", null, "success");

    if (error) {
      setIsMagicLinkSubmitting(false);
      return Notify(error.message, null, "error");
    }
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
        <Button
          fullWidth
          variant="outline"
          onClick={handleOnGoogleSignIn}
          mb="sm"
        >
          Sign In with Google
        </Button>
        <Button
          fullWidth
          variant="outline"
          onClick={handleFacebookSignIn}
          mb="sm"
        >
          Sign In with Facebook
        </Button>
        <Button
          fullWidth
          variant="outline"
          mb="sm"
          onClick={handleMagicLinkSignIn}
          loading={isMagicLinkSubmitting}
        >
          Sign In with Magic Link
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
