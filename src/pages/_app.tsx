import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Layout from "~/components/layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
