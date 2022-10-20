import "@styles/globals.css";
import "normalize.css/normalize.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <ToastContainer />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default MyApp;
