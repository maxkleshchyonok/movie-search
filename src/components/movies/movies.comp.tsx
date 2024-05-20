import React, { useEffect, useState } from "react";
import MovieCard, { CardSize } from "./movie-card/card.comp";
import styled from "@emotion/styled";
import { RatedMovies } from "app/rated/page";
import { MoviesType } from "@/types/movies/movies";
import { GET_Movies } from "app/api/route";

// const movies = [
//   {
//     id: "1",
//     title: "The Spectacular Journey",
//     year: 2023,
//     rating: 8.2,
//     views: 12500,
//     image:
//       "https://media.istockphoto.com/id/1361394182/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B0%D0%B1%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9-%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%BE%D1%88%D0%B5%D1%80%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D0%BE%D1%88%D0%BA%D0%B8-%D0%B2%D1%8B%D0%B3%D0%BB%D1%8F%D0%B4%D1%8F%D1%89%D0%B8%D0%B9-%D1%88%D0%BE%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B8%D0%BB%D0%B8-%D1%83%D0%B4%D0%B8%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC.jpg?s=612x612&w=0&k=20&c=yEEyxvdyb-jUxnHmr8nXSf9qQPS0WfkhBITLVIaj7OY=",
//     genres: ["Action", "Adventure", "Sci-Fi"],
//   },
//   {
//     id: "2",
//     title: "Dreamscape",
//     year: 2024,
//     rating: 7.9,
//     views: 9800,
//     image: "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg",
//     genres: ["Mystery", "Thriller", "Drama"],
//   },
//   {
//     id: "3",
//     title: "The Forgotten Voyage",
//     year: 2023,
//     rating: 6.5,
//     views: 5600,
//     image:
//       "https://img.freepik.com/free-vector/cinema-realistic-poster-with-illuminated-bucket-popcorn-drink-3d-glasses-reel-tickets-blue-background-with-tapes-vector-illustration_1284-77070.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1715126400&semt=sph",
//     genres: ["Adventure", "Fantasy"],
//   },
//   {
//     id: "4",
//     title: "Echoes of Darkness",
//     year: 2024,
//     rating: 9.1,
//     views: 21500,
//     image: "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg",
//     genres: ["Horror", "Mystery", "Thriller"],
//   },
//   {
//     id: "5",
//     title: "Rise of the Machines",
//     year: 2023,
//     rating: 7.6,
//     views: 7100,
//     image: "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg",
//     genres: ["Action", "Sci-Fi"],
//   },
//   {
//     id: "6",
//     title: "The Enchanted Forest",
//     year: 2024,
//     rating: 8.5,
//     views: 15700,
//     image: "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg",
//     genres: ["Animation", "Fantasy"],
//   },
//   {
//     id: "7",
//     title: "Lost in Time",
//     year: 2023,
//     rating: 7.1,
//     views: 4200,
//     image: "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg",
//     genres: ["Adventure", "Sci-Fi"],
//   },
//   {
//     id: "8",
//     title: "The Secret Code",
//     year: 2024,
//     rating: 7.8,
//     views: 8900,
//     image: "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg",
//     genres: ["Action", "Mystery", "Thriller"],
//   },
// ];

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

  useEffect(() => {
    const fetchMovies = async () => {
      const allMovies = await GET_Movies();
      const data: MoviesType = {
        page: +page,
        results: allMovies,
        total_pages: 100,
        total_results: 500,
      };
      setMovies(data);
    };
    fetchMovies();
  }, []);

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
