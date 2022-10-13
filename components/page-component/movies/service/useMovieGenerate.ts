import useMovieService from "@api/useMovieService";

const useMovieGenerate = async () => {
  await useMovieService("POST", "");
};

export default useMovieGenerate;
