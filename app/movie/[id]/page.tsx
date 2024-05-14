"use client";
import MovieDetails from "@/components/movies/movie-details/movie-details.comp";
import Sidebar from "@/components/sidebar/sidebar.comp";
import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { AppShell } from "@mantine/core";
import React from "react";

const StyledAppShell = styled(AppShell)`
  background: ${colors["grey-100"]};
`;

function MoviePage() {
  return (
    <StyledAppShell
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
      withBorder={false}
    >
      <Sidebar activeIndex={0} />
      <AppShell.Main>
        <MovieDetails />
      </AppShell.Main>
    </StyledAppShell>
  );
}

export default MoviePage;
