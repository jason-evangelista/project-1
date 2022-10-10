export type PostReturn = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

const parsePosts = async (): Promise<PostReturn[]> => {
  const getPost = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = (await await getPost.json()) as PostReturn[];
  return data;
};

export default parsePosts;
