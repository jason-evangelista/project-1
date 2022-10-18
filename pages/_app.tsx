import "@styles/globals.css";
import "normalize.css/normalize.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <ToastContainer />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default MyApp;
