import React from "react";
import FiltersSelect from "./filters-select.comp";
import styled from "@emotion/styled";
import RatingsFilter from "./ratings.comp";

const genres: string[] = [
  "Drama",
  "Comedy",
  "Animation",
  "Thriller",
  "Fantasy",
  "Dramaa",
  "Comedya",
  "Animatiaon",
  "Thrillera",
  "Fantasya",
];

const releaseYear: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "11",
  "21",
  "31",
  "41",
  "51",
];

const FiltersContainer = styled("div")`
  display: flex;
  gap: 3%;
  margin: 4% 5%;
`;

function Filters() {
  return (
    <FiltersContainer>
      <FiltersSelect
        title="Genres"
        placeholder="Secelt genre"
        optionsArray={genres}
      />
      <FiltersSelect
        title="Release year"
        placeholder="Select release year"
        optionsArray={releaseYear}
      />
      <RatingsFilter />
    </FiltersContainer>
  );
}

export default Filters;
