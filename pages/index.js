import Head from "next/head";
import Layout from "../layouts/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>

      <div>
        <Layout />
      </div>
    </>
  );
}
