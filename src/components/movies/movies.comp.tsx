import React, { useEffect, useState } from "react";
import MovieCard, { CardSize } from "./movie-card/card.comp";
import styled from "@emotion/styled";
import { RatedMovies } from "app/rated/page";
import { GetMovieParams, MoviesType } from "@/types/movies/movies";
import { GET_Movies } from "app/api/route";
import { useSearchParams } from "next/navigation";

type Props = {
  movies: RatedMovies[] | null;
};

const Container = styled("div")`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  margin: 5%;
`;

function Movies(props: Props) {
  const [movies, setMovies] = useState<MoviesType>();
  const [page, setPage] = useState("1");

  const searchParams = useSearchParams();
  const selectedSort = searchParams.get("sort_by");
  const selectedGenre = searchParams.get("genres");
  const selectedRelease = searchParams.get("release");
  const selectedMinRate = searchParams.get("min_rate");
  const selectedMaxRate = searchParams.get("max_rate");
  const selectedPage = searchParams.get("page");

  useEffect(() => {
    const params: GetMovieParams = {
      genres: selectedGenre,
      release: selectedRelease,
      sort_by: selectedSort,
      min_rate: selectedMinRate,
      max_rate: selectedMaxRate,
      page: selectedPage,
    };
    const fetchMovies = async () => {
      const allMovies = await GET_Movies(params);
      const data: MoviesType = {
        page: +page,
        results: allMovies,
        total_pages: 100,
        total_results: 500,
      };
      setMovies(data);
    };
    fetchMovies();
  }, [searchParams]);

  return (
    <Container>
      {movies?.results.map((el) => (
        <MovieCard
          id={el.id}
          key={el.id}
          title={el.title}
          year={el.release_date}
          rating={el.vote_average}
          genres={el.genre_ids}
          image={el.poster_path}
          views={el.popularity}
          cardSize={CardSize.small}
          imageHeight={200}
          imageWidth={150}
        />
      ))}
    </Container>
  );
}

export default Movies;
