import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Layout from "../../components/Layout";
import parsePosts, { PostReturn } from "../../utils/parsePosts";

import { ParsedUrlQuery } from "querystring";

type StaticPathProps = ParsedUrlQuery & {
  id: string;
};

type StaticProps = {
  post: PostReturn;
};

export const getStaticPaths = async () => {
  const getPosts = await parsePosts();

  const paths = getPosts.map((item) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<StaticPathProps>
): Promise<GetStaticPropsResult<StaticProps>> => {
  const { id } = context.params as StaticPathProps;
  const getOnePost = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = (await getOnePost.json()) as PostReturn;
  return {
    props: {
      post: data,
    },
  };
};

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { post } = props;
  return (
    <Layout home={false}>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </Layout>
  );
};

export default Post;
