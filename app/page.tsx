"use client";
import { AppShell, MultiSelect, Skeleton, Title } from "@mantine/core";
import styled from "@emotion/styled";
import Sidebar from "@/components/sidebar/sidebar.comp";
import Filters from "@/components/filters/filters.comp";
import Movies from "@/components/movies/movies.comp";
import colors from "@/helpers/index";
import SortFilter from "@/components/sorting/sorting.comp";
import { Suspense } from "react";

const sortArray: string[] = [
  "Most Popular",
  "Least Popular",
  "Most Rated",
  "Least Rated",
  "Most Voted",
  "Least Voted",
  "Title asc",
  "Title desc",
  "Revenue most",
  "Revenue least",
  "Release latest",
  "Release oldest",
];

const StyledAppShell = styled(AppShell)`
  background: ${colors["grey-100"]};
`;

const StyledTitle = styled(Title)`
  color: black;
  font-weight: 700;
  font-size: 32px;
  margin-left: 4.5%;
  margin-top: 2%;
`;

export default function HomePage() {
  return (
    <StyledAppShell
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
      withBorder={false}
    >
      <Sidebar activeIndex={0} />
      <AppShell.Main>
        <Suspense>
          <StyledTitle>Movies</StyledTitle>
          <Filters />
          <SortFilter optionsArray={sortArray} />
          <Movies movies={null} />
        </Suspense>
      </AppShell.Main>
    </StyledAppShell>
  );
}
