import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import RatingsFilter from "./ratings.comp";
import ResetFilters from "./reset.comp";
import GenresFilter from "./genres-filter.comp";
import YearFilter from "./year-filter.comp";
import { GenresList } from "@/types/movies/movies";
import axios from "axios";

const FiltersContainer = styled("div")`
  display: flex;
  width: 80%;
  gap: 3%;
  margin: 3.3% 4.4% 2.1% 4.4%;
`;

function Filters() {
  const [genresNames, setGenresNames] = useState<string[]>([]);

  async function GET_Genres(): Promise<GenresList | undefined> {
    const accessToken =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGE1NmEwMzA0ZTQyNmQ1NmJhYjE1N2YyOTY2YWMzMCIsInN1YiI6IjY2NDg2ZTI3YjZmNjA5ZWFhYjBhYmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tDC9bsj5j7w8EqY7stzXVZsYYSYt3Lj_lcC-dhKWHos";

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

  useEffect(() => {
    const fetchGenres = async () => {
      const allGenres = await GET_Genres();
      if (allGenres) {
        setGenresNames(allGenres.genres.map((el) => el.name));
      }
    };
    fetchGenres();
  }, []);

  return (
    <FiltersContainer>
      {genresNames && (
        <>
          <GenresFilter optionsArray={genresNames} />
          <YearFilter
            optionsArray={Array.from(new Array(175), (_, i) =>
              (2024 - i).toString()
            )}
          />
          <RatingsFilter />
          <ResetFilters />
        </>
      )}
    </FiltersContainer>
  );
}

export default Filters;
