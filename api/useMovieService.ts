const MOVIE_SERVICE_URL = process.env.MOVIE_SERVICE || "";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const useMovieService = async <TResponse, TPayload>(
  method: HTTPMethod,
  bodyResponse?: TPayload
): Promise<TResponse> => {
  const movieService = async () => {
    const res = await fetch(MOVIE_SERVICE_URL, {
      method,
      body: method === "GET" ? null : JSON.stringify(bodyResponse),
    });
    const data = (await res.json()) as TResponse;
    return data;
  };
  return movieService();
};

export default useMovieService;
