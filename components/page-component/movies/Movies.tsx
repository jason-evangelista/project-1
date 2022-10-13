/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from "react";
import Layout from "@components/Layout";
import Movie from "./type/Movie";
import MovieCard from "./components/MovieCard";
import utilSyle from "@styles/utils.module.css";
import useMovieGenerate from "./service/useMovieGenerate";

type Props = {
  data: Movie[];
  refetch: () => void;
};

const Movies: FC<Props> = (props) => {
  const { data, refetch } = props;

  if (!data) return <h1>Loading data...</h1>;

  const handleGenerate = async () => {
    await useMovieGenerate();
    refetch();
  };

  return (
    <Layout home={false}>
      <div className={utilSyle.center}>
        <button onClick={handleGenerate}>Generate Random Article</button>
        {data.map((item) => (
          <MovieCard key={item.id.toString()} {...item} />
        ))}
      </div>
    </Layout>
  );
};

export default Movies;
