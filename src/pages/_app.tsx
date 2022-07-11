import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import fetcher from "../utils/fetcher";

/*
 * The <SWRConfig> is a HOC (Higher Order Component) that wraps the whole app
 * to provide the `fetcher` fn in every useSWR call
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Toaster />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
