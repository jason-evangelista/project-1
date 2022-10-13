import "@styles/globals.css";
import "normalize.css/normalize.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
