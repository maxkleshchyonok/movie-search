import BreadcrumbsElement from "@/components/breadcrumbs/breadcrumbs.comp";
import React, { useEffect, useState } from "react";
import MovieCard, { CardSize } from "@/components/movies/movie-card/card.comp";
import DetailedMovieInfo from "@/components/movies/movie-card/detailed-card.comp";
import styled from "@emotion/styled";
import { GET_Movie_by_id } from "app/api/route";
import { useParams } from "next/navigation";
import { MovieDetailsType } from "@/types/movies/movies";

const Container = styled("div")`
  margin-left: 12.5%;
  margin-top: 2%;
`;

function MovieDetails() {
  const [movie, setMovie] = useState<MovieDetailsType>();
  const { id } = useParams();

  useEffect(() => {
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
