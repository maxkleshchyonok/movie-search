"use client";
import Sidebar from "@/components/sidebar/sidebar.comp";
import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { AppShell, Button, Title } from "@mantine/core";
import no_movies_img from "@/assets/no-movies.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Movies from "@/components/movies/movies.comp";
import SearchMovie from "@/components/search/search.comp";

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

const TopSection = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2% 5%;
`;

function Rated() {
  const [ratedMovies, setRatedMovies] = useState<RatedMovies[]>([]);

  useEffect(() => {
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      if (key.startsWith("movie_rating_")) {
        setRatedMovies([
          ...ratedMovies,
          { id: key.slice(13), rate: localStorage.getItem(key) },
        ]);
      }
    }
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
        <TopSection>
          <Title order={1}>Rated movies</Title>
          <SearchMovie />
        </TopSection>
        {ratedMovies.length ? (
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
