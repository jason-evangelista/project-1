import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Layout, { title } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import parsePosts, { PostReturn } from "../utils/parsePosts";

type Props = {
  getPosts: PostReturn[];
};

export const getServerSideProps: GetStaticProps<Props> = async () => {
  const getPosts = await parsePosts();
  return {
    props: {
      getPosts,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = (
  props
) => {
  const { getPosts } = props;

  return (
    <Layout home>
      <Head>
        <title>{title}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {getPosts.map((item) => (
            <Link key={item.id} href={`/posts/${item.id}`}>
              <li className={utilStyles.listItem}>
                {item.title} - {item.userId}
                <br />
                {item.id}
                <br />
                {item.body}
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
