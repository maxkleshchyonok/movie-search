import BreadcrumbsElement from "@/components/breadcrumbs/breadcrumbs.comp";
import React, { useEffect, useState } from "react";
import MovieCard, { CardSize } from "@/components/movies/movie-card/card.comp";
import DetailedMovieInfo from "@/components/movies/movie-card/detailed-card.comp";
import styled from "@emotion/styled";
import { useParams } from "next/navigation";
import { MovieDetailsType } from "@/types/movies/movies";
import axios from "axios";

const Container = styled("div")`
  margin-left: 12.5%;
  margin-top: 2%;
`;

function MovieDetails() {
  const [movie, setMovie] = useState<MovieDetailsType>();
  const { id } = useParams();

  useEffect(() => {
    async function GET_Movie_by_id(
      id: string
    ): Promise<MovieDetailsType | undefined> {
      const accessToken =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGE1NmEwMzA0ZTQyNmQ1NmJhYjE1N2YyOTY2YWMzMCIsInN1YiI6IjY2NDg2ZTI3YjZmNjA5ZWFhYjBhYmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tDC9bsj5j7w8EqY7stzXVZsYYSYt3Lj_lcC-dhKWHos";

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
    const fetchMovieDetails = async () => {
      const detailedMovie = await GET_Movie_by_id(id as string);
      setMovie(detailedMovie);
    };
    fetchMovieDetails();
  }, []);

  return (
    <Container>
      {movie && (
        <>
          <BreadcrumbsElement
            items={[
              { title: "Movies", href: "/" },
              { title: movie.title, href: `/movie/${movie.id}` },
            ]}
          />
          <MovieCard
            id={movie.id}
            key={movie.id}
            title={movie.title}
            year={movie.release_date.split("-")[0]}
            rating={movie.vote_average}
            genres={movie.genres.map((genre) => {
              return genre.id;
            })}
            image={movie.poster_path}
            views={movie.popularity}
            details={{
              budget: movie.budget,
              duration: movie.runtime,
              gross: movie.revenue,
              premiere: movie.release_date,
            }}
            cardSize={CardSize.big}
            imageHeight={350}
            imageWidth={260}
          />
          <DetailedMovieInfo
            videos={movie.videos}
            overview={movie.overview}
            production_companies={movie.production_companies}
          />
        </>
      )}
    </Container>
  );
}

export default MovieDetails;
