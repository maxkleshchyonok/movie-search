"use client";
import Sidebar from "@/components/sidebar/sidebar.comp";
import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { AppShell, Button, Loader, Title } from "@mantine/core";
import no_movies_img from "@/assets/no-movies.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Movies from "@/components/movies/movies.comp";

export type RatedMovies = {
  id: string;
  rate: string | null;
};

const StyledAppShell = styled(AppShell)`
  background: ${colors["grey-100"]};
`;

const NoMoviesContainer = styled("div")`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoaderContainer = styled("div")`
  width: 100%;
  margin-top: 29%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Rated() {
  const [ratedMovies, setRatedMovies] = useState<RatedMovies[]>([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    let keys = Object.keys(localStorage);
    const filledRatedMovies: RatedMovies[] = [];
    for (let key of keys) {
      if (key.startsWith("movie_rating_")) {
        filledRatedMovies.push({
          id: key.slice(13),
          rate: localStorage.getItem(key),
        });
        setRatedMovies([
          ...ratedMovies,
          { id: key.slice(13), rate: localStorage.getItem(key) },
        ]);
      }
    }
    setRatedMovies(filledRatedMovies);
    setIsLoader(false);
  }, []);

  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <StyledAppShell
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
      withBorder={false}
    >
      <Sidebar activeIndex={1} />
      <AppShell.Main>
        {isLoader ? (
          <LoaderContainer>
            <Loader color={colors["purple-500"]} type="dots" size="xl" />
          </LoaderContainer>
        ) : ratedMovies.length ? (
          <Movies movies={ratedMovies} />
        ) : (
          <NoMoviesContainer>
            <Image src={no_movies_img} alt="no-movies-yet" />
            <Title order={2}>You haven't rated any films yet</Title>
            <Button
              onClick={handleClick}
              variant="filled"
              color={colors["purple-500"]}
              size="md"
              radius="md"
              sx={{ marginTop: "2%" }}
            >
              Find movies
            </Button>
          </NoMoviesContainer>
        )}
      </AppShell.Main>
    </StyledAppShell>
  );
}

export default Rated;
