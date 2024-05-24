import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import RatingsFilter from "./ratings.comp";
import ResetFilters from "./reset.comp";
import { GET_Genres } from "app/api/route";
import GenresFilter from "./genres-filter.comp";
import YearFilter from "./year-filter.comp";

const FiltersContainer = styled("div")`
  display: flex;
  gap: 3%;
  margin: 4% 5%;
`;

function Filters() {
  const [genresNames, setGenresNames] = useState<string[]>([]);

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
