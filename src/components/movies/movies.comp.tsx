// import React, { useEffect, useState } from "react";
// import MovieCard, { CardSize } from "./movie-card/card.comp";
// import styled from "@emotion/styled";
// import { RatedMovies } from "app/rated/page";
// import {
//   GetMovieParams,
//   MovieDetailsType,
//   MoviesType,
// } from "@/types/movies/movies";
// import { GET_Movie_by_id, GET_Movies } from "app/api/movies";
// import { useSearchParams } from "next/navigation";
// import { Loader, Pagination, Title } from "@mantine/core";
// import SearchMovie from "../search/search.comp";
// import Image from "next/image";
// import no_movies_searched from "@/assets/no-movies-searched.png";
// import colors from "@/helpers/index";
// import PaginationElement from "@/components/pagination/pagination.comp";

// type Props = {
//   movies: RatedMovies[] | null;
// };

// const Container = styled("div")`
//   width: 90%;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2%;
//   margin: 5%;
// `;

// const TopSection = styled("div")`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin: 1.5% 17% 3% 4.3%;
// `;

// const NoMoviesContainer = styled("div")`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 0 0 0 20%;
// `;

// const PaginationContainer = styled("div")`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: -3%;
// `;

// export const LoaderContainer = styled("div")`
//   width: 100%;
//   margin-top: 8%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// function Movies(props: Props) {
//   const [movies, setMovies] = useState<MoviesType>();
//   const [ratedMovies, setRatedMovies] = useState<MovieDetailsType[]>([]);
//   const [page, setPage] = useState(1);
//   const [searchValue, setSearchValue] = useState("");
//   const [paginatedRatedMovies, setPaginatedRatedMovies] = useState<
//     MovieDetailsType[][]
//   >([[]]);
//   const [isLoader, setIsLoader] = useState(true);

//   const searchParams = useSearchParams();
//   const selectedSort = searchParams.get("sort_by");
//   const selectedGenre = searchParams.get("genres");
//   const selectedRelease = searchParams.get("release");
//   const selectedMinRate = searchParams.get("min_rate");
//   const selectedMaxRate = searchParams.get("max_rate");
//   const selectedPage = searchParams.get("page");

//   useEffect(() => {
//     const params: GetMovieParams = {
//       genres: selectedGenre,
//       release: selectedRelease,
//       sort_by: selectedSort,
//       min_rate: selectedMinRate,
//       max_rate: selectedMaxRate,
//       page: selectedPage,
//     };

//     const fetchMovieById = async (
//       id: string
//     ): Promise<MovieDetailsType | undefined> => {
//       return GET_Movie_by_id(id) || undefined;
//     };

//     if (props.movies) {
//       const fetchMovies = async () => {
//         const movieDetails = await Promise.all(
//           props.movies!.map(async (movie) => {
//             const movieData = await fetchMovieById(movie.id);
//             return movieData;
//           })
//         );
//         setRatedMovies(movieDetails.filter(Boolean) as MovieDetailsType[]);
//       };
//       fetchMovies();
//     } else {
//       const fetchMovies = async () => {
//         const allMovies = await GET_Movies(params);
//         const data: MoviesType = {
//           page: page,
//           results: allMovies,
//           total_pages: 100,
//           total_results: 500,
//         };
//         setMovies(data);
//       };
//       fetchMovies();
//     }
//     setIsLoader(false);
//     console.log(movies);
//   }, [searchParams]);

//   const handleSearchChange = (value: string) => {
//     setSearchValue(value);
//   };

//   useEffect(() => {
//     setIsLoader(true);
//     if (ratedMovies.length) {
//       const paginatedArr: MovieDetailsType[][] = [];
//       for (let i = 0; i < ratedMovies.length; i += 4) {
//         paginatedArr.push(ratedMovies.slice(i, i + 4));
//       }
//       setPaginatedRatedMovies(paginatedArr);
//     }
//     setIsLoader(false);
//   }, [ratedMovies]);

//   return (
//     <>
//       {isLoader ? (
//         <LoaderContainer>
//           <Loader color={colors["purple-500"]} type="dots" size="xl" />
//         </LoaderContainer>
//       ) : (
//         ""
//       )}

//       {props.movies ? (
//         <>
//           <TopSection>
//             <Title order={1}>Rated movies</Title>
//             <SearchMovie callback={handleSearchChange} />
//           </TopSection>
//           <Container>
//             {searchValue
//               ? ratedMovies.map((el, index) =>
//                   el.title.toLowerCase().includes(searchValue) ? (
//                     <MovieCard
//                       id={el.id}
//                       key={el.id}
//                       title={el.title}
//                       year={el.release_date.split("-")[0]}
//                       rating={el.vote_average}
//                       genres={el.genres.map((el) => el.id)}
//                       image={el.poster_path}
//                       views={el.popularity}
//                       cardSize={CardSize.small}
//                       imageHeight={170}
//                       imageWidth={150}
//                     />
//                   ) : index === ratedMovies.length - 1 ? (
//                     <NoMoviesContainer key={el.id}>
//                       <Image src={no_movies_searched} alt="no-movies-found" />
//                       <Title order={2}>
//                         We dont have such movies, look for another one
//                       </Title>
//                     </NoMoviesContainer>
//                   ) : (
//                     ""
//                   )
//                 )
//               : paginatedRatedMovies[page - 1].map((el) => (
//                   <MovieCard
//                     id={el.id}
//                     key={el.id}
//                     title={el.title}
//                     year={el.release_date.split("-")[0]}
//                     rating={el.vote_average}
//                     genres={el.genres.map((el) => el.id)}
//                     image={el.poster_path}
//                     views={el.popularity}
//                     cardSize={CardSize.small}
//                     imageHeight={170}
//                     imageWidth={150}
//                   />
//                 ))}
//           </Container>
//           <PaginationContainer>
//             <Pagination
//               value={page}
//               onChange={setPage}
//               total={Math.ceil(ratedMovies.length / 4)}
//               siblings={0}
//               color={colors["purple-500"]}
//               sx={{ dots: { display: "none" } }}
//             />
//           </PaginationContainer>
//         </>
//       ) : (
//         <Container>
//           {movies?.results.map((el) => (
//             <MovieCard
//               id={el.id}
//               key={el.id}
//               title={el.title}
//               year={el.release_date.split("-")[0]}
//               rating={el.vote_average}
//               genres={el.genre_ids}
//               image={el.poster_path}
//               views={el.popularity}
//               cardSize={CardSize.small}
//               imageHeight={170}
//               imageWidth={150}
//             />
//           ))}
//           {movies?.results.length === 0 && (
//             <NoMoviesContainer>
//               <Image src={no_movies_searched} alt="no-movies-found" />
//               <Title order={3}>
//                 We dont have such movies, look for another one
//               </Title>
//             </NoMoviesContainer>
//           )}
//           {isLoader || movies?.results.length === 0 ? (
//             ""
//           ) : (
//             <PaginationElement />
//           )}
//         </Container>
//       )}
//     </>
//   );
// }

// export default Movies;

import React, { useEffect, useState } from "react";
import MovieCard, { CardSize } from "./movie-card/card.comp";
import styled from "@emotion/styled";
import { RatedMovies } from "app/rated/page";
import {
  GenresList,
  GetMovieParams,
  MovieDetailsType,
  MoviesType,
} from "@/types/movies/movies";
import { useSearchParams } from "next/navigation";
import { Loader, Pagination, Title } from "@mantine/core";
import SearchMovie from "../search/search.comp";
import Image from "next/image";
import no_movies_searched from "@/assets/no-movies-searched.png";
import colors from "@/helpers/index";
import PaginationElement from "@/components/pagination/pagination.comp";
import axios from "axios";

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

const TopSection = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5% 17% 3% 4.3%;
`;

const NoMoviesContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 0 20%;
`;

const PaginationContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -3%;
`;

export const LoaderContainer = styled("div")`
  width: 100%;
  margin-top: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGE1NmEwMzA0ZTQyNmQ1NmJhYjE1N2YyOTY2YWMzMCIsInN1YiI6IjY2NDg2ZTI3YjZmNjA5ZWFhYjBhYmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tDC9bsj5j7w8EqY7stzXVZsYYSYt3Lj_lcC-dhKWHos";

function Movies(props: Props) {
  const [movies, setMovies] = useState<MoviesType>();
  const [ratedMovies, setRatedMovies] = useState<MovieDetailsType[]>([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [paginatedRatedMovies, setPaginatedRatedMovies] = useState<
    MovieDetailsType[][]
  >([[]]);
  const [isLoader, setIsLoader] = useState(true);

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

    async function GET_Movie_by_id(
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

    const fetchMovieById = async (
      id: string
    ): Promise<MovieDetailsType | undefined> => {
      return GET_Movie_by_id(id) || undefined;
    };

    if (props.movies) {
      const fetchMovies = async () => {
        const movieDetails = await Promise.all(
          props.movies!.map(async (movie) => {
            const movieData = await fetchMovieById(movie.id);
            return movieData;
          })
        );
        setRatedMovies(movieDetails.filter(Boolean) as MovieDetailsType[]);
      };
      fetchMovies();
    } else {
      const fetchMovies = async () => {
        // const allMovies = await get(params);
        const params: GetMovieParams = {
          genres: selectedGenre,
          release: selectedRelease,
          sort_by: selectedSort,
          min_rate: selectedMinRate,
          max_rate: selectedMaxRate,
          page: selectedPage,
        };
        const { genres, release, sort_by, min_rate, max_rate, page } = params;

        const genresArr = genres?.split(/(?=[A-Z])/);

        let genresString = "";

        async function GET_Genres(): Promise<GenresList | undefined> {
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
        const response = axios.request(options);
        const data: MoviesType = {
          page: +!page,
          results: (await response).data.results,
          total_pages: 100,
          total_results: 500,
        };
        setMovies(data);
      };
      fetchMovies();
    }
    setIsLoader(false);
    console.log(movies);
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    setIsLoader(true);
    if (ratedMovies.length) {
      const paginatedArr: MovieDetailsType[][] = [];
      for (let i = 0; i < ratedMovies.length; i += 4) {
        paginatedArr.push(ratedMovies.slice(i, i + 4));
      }
      setPaginatedRatedMovies(paginatedArr);
    }
    setIsLoader(false);
  }, [ratedMovies]);

  return (
    <>
      {isLoader ? (
        <LoaderContainer>
          <Loader color={colors["purple-500"]} type="dots" size="xl" />
        </LoaderContainer>
      ) : (
        ""
      )}

      {props.movies ? (
        <>
          <TopSection>
            <Title order={1}>Rated movies</Title>
            <SearchMovie callback={handleSearchChange} />
          </TopSection>
          <Container>
            {searchValue
              ? ratedMovies.map((el, index) =>
                  el.title.toLowerCase().includes(searchValue) ? (
                    <MovieCard
                      id={el.id}
                      key={el.id}
                      title={el.title}
                      year={el.release_date.split("-")[0]}
                      rating={el.vote_average}
                      genres={el.genres.map((el) => el.id)}
                      image={el.poster_path}
                      views={el.popularity}
                      cardSize={CardSize.small}
                      imageHeight={170}
                      imageWidth={150}
                    />
                  ) : index === ratedMovies.length - 1 ? (
                    <NoMoviesContainer key={el.id}>
                      <Image src={no_movies_searched} alt="no-movies-found" />
                      <Title order={2}>
                        We dont have such movies, look for another one
                      </Title>
                    </NoMoviesContainer>
                  ) : (
                    ""
                  )
                )
              : paginatedRatedMovies[page - 1].map((el) => (
                  <MovieCard
                    id={el.id}
                    key={el.id}
                    title={el.title}
                    year={el.release_date.split("-")[0]}
                    rating={el.vote_average}
                    genres={el.genres.map((el) => el.id)}
                    image={el.poster_path}
                    views={el.popularity}
                    cardSize={CardSize.small}
                    imageHeight={170}
                    imageWidth={150}
                  />
                ))}
          </Container>
          <PaginationContainer>
            <Pagination
              value={page}
              onChange={setPage}
              total={Math.ceil(ratedMovies.length / 4)}
              siblings={0}
              color={colors["purple-500"]}
              sx={{ dots: { display: "none" } }}
            />
          </PaginationContainer>
        </>
      ) : (
        <Container>
          {movies?.results.map((el) => (
            <MovieCard
              id={el.id}
              key={el.id}
              title={el.title}
              year={el.release_date.split("-")[0]}
              rating={el.vote_average}
              genres={el.genre_ids}
              image={el.poster_path}
              views={el.popularity}
              cardSize={CardSize.small}
              imageHeight={170}
              imageWidth={150}
            />
          ))}
          {movies?.results.length === 0 && (
            <NoMoviesContainer>
              <Image src={no_movies_searched} alt="no-movies-found" />
              <Title order={3}>
                We dont have such movies, look for another one
              </Title>
            </NoMoviesContainer>
          )}
          {isLoader || movies?.results.length === 0 ? (
            ""
          ) : (
            <PaginationElement />
          )}
        </Container>
      )}
    </>
  );
}

export default Movies;
