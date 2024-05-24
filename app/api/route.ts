import {
  GenresList,
  GetMovieParams,
  MovieDetailsType,
  MoviesResults,
} from "@/types/movies/movies";
import axios from "axios";

const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGE1NmEwMzA0ZTQyNmQ1NmJhYjE1N2YyOTY2YWMzMCIsInN1YiI6IjY2NDg2ZTI3YjZmNjA5ZWFhYjBhYmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tDC9bsj5j7w8EqY7stzXVZsYYSYt3Lj_lcC-dhKWHos";

export async function GET_Movies(
  props: GetMovieParams
): Promise<MoviesResults[]> {
  const { genres, release, sort_by, min_rate, max_rate, page } = props;

  const genresArr = genres?.split(/(?=[A-Z])/);

  let genresString = "";

  const allGenres = await GET_Genres();
  if (allGenres && genresArr) {
    for (let i = 0; i < genresArr.length; i++) {
      for (let j = 0; j < allGenres.genres.length; j++) {
        if (genresArr[i] === allGenres.genres[j].name) {
          genresString += `|${allGenres.genres[j].id}`;
        }
      }
    }
  }

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie?append_to_response=videos,images",
    params: {
      include_adult: "true",
      include_video: "false",
      language: "en-US",
      page: page || 1,
      primary_release_year: release,
      sort_by,
      "vote_average.gte": min_rate,
      "vote_average.lte": max_rate,
      with_genres: genresString,
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
  id: string
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

export async function GET_Genres(): Promise<GenresList | undefined> {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list",
    params: { language: "en" },
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
