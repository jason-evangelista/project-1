import { NextPage } from "next";
import Movies from "@components/page-component/movies/Movies";
import useMovieList from "@components/page-component/movies/service/useMovieList";
import Head from "next/head";

const MoviePage: NextPage = () => {
  const { data, refetch } = useMovieList();

  return (
    <>
      <Head>
        <title>My Favorite Movie</title>
      </Head>
      <Movies data={data} refetch={refetch} />
    </>
  );
};

export default MoviePage;
