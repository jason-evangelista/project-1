/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import useMovieService from "@api/useMovieService";
import Movie from "../type/Movie";

const useMovieList = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [refetch, setRefetch] = useState(false);

  const handleRefetch = () => setRefetch(!refetch);

  useEffect(() => {
    useMovieService<Movie[], undefined>("GET").then((data) => {
      setData(data);
    });
  }, [refetch]);

  return {
    data,
    refetch: handleRefetch,
  };
};

export default useMovieList;
