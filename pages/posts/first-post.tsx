import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";

const FirstPost: NextPage = () => {
  return (
    <Layout home={false}>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>First Post</h1>
      <Image
        width={150}
        height={200}
        src="/images/profile.jpg"
        alt="profile picture"
      />
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  );
};

export default FirstPost;
