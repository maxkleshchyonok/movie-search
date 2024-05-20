import { MovieDetailsType, MoviesResults } from "@/types/movies/movies";
import axios from "axios";

const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGE1NmEwMzA0ZTQyNmQ1NmJhYjE1N2YyOTY2YWMzMCIsInN1YiI6IjY2NDg2ZTI3YjZmNjA5ZWFhYjBhYmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tDC9bsj5j7w8EqY7stzXVZsYYSYt3Lj_lcC-dhKWHos";

export async function GET_Movies(): Promise<MoviesResults[]> {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie?append_to_response=videos,images",
    params: {
      include_adult: "true",
      include_video: "false",
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization: accessToken,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function GET_Movie_by_id(
  id: number
): Promise<MovieDetailsType | undefined> {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: accessToken,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return undefined;
  }
}
