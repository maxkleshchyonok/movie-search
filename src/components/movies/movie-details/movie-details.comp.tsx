import BreadcrumbsElement from "@/components/breadcrumbs/breadcrumbs.comp";
import React from "react";
import MovieCard, { CardSize } from "@/components/movies/movie-card/card.comp";
import DetailedMovieInfo from "@/components/movies/movie-card/detailed-card.comp";
import styled from "@emotion/styled";

const breadcrumbs = [
  { title: "Movies", href: "/" },
  { title: "The green mile", href: "#" },
];

const movie = {
  id: 1,
  title: "The Spectacular Journey",
  year: 2023,
  rating: 8.2,
  views: 12500,
  image:
    "https://media.istockphoto.com/id/1361394182/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B0%D0%B1%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9-%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%BE%D1%88%D0%B5%D1%80%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D0%BE%D1%88%D0%BA%D0%B8-%D0%B2%D1%8B%D0%B3%D0%BB%D1%8F%D0%B4%D1%8F%D1%89%D0%B8%D0%B9-%D1%88%D0%BE%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B8%D0%BB%D0%B8-%D1%83%D0%B4%D0%B8%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC.jpg?s=612x612&w=0&k=20&c=yEEyxvdyb-jUxnHmr8nXSf9qQPS0WfkhBITLVIaj7OY=",
  genres: ["Action", "Adventure", "Sci-Fi"],
  details: {
    duration: "3h50m",
    premiere: "December 6, 1999",
    budget: "$120,000,000",
    gross: "$760,006,945",
  },
};

const Container = styled("div")`
  margin-left: 10%;
`;

function MovieDetails() {
  return (
    <Container>
      <BreadcrumbsElement items={breadcrumbs} />
      <MovieCard
        id={movie.id}
        key={movie.id}
        title={movie.title}
        year={movie.year}
        rating={movie.rating}
        genres={movie.genres}
        image={movie.image}
        views={movie.views}
        details={movie.details}
        cardSize={CardSize.big}
        imageHeight={300}
        imageWidth={250}
      />
      <DetailedMovieInfo />
    </Container>
  );
}

export default MovieDetails;
