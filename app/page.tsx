"use client";
import { AppShell, MultiSelect, Skeleton, Title } from "@mantine/core";
import styled from "@emotion/styled";
import Sidebar from "@/components/sidebar/sidebar.comp";
import Filters from "@/components/filters/filters.comp";

const StyledAppShell = styled(AppShell)`
  background: #f5f5f6;
`;

const StyledTitle = styled(Title)`
  color: black;
  font-weight: 700;
  font-size: 32px;
  margin-left: 5%;
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
        <StyledTitle>Movies</StyledTitle>
        <Filters />
      </AppShell.Main>
    </StyledAppShell>
  );
}
