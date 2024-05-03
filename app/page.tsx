"use client";
import { AppShell, Skeleton } from "@mantine/core";
import styled from "@emotion/styled";
import Sidebar from "@/components/sidebar/sidebar.comp";

const StyledAppShell = styled(AppShell)`
  background: #f5f5f6;
`;

export default function HomePage() {
  return (
    <>
      <StyledAppShell
        navbar={{ width: 300, breakpoint: "sm" }}
        padding="md"
        withBorder={false}
      >
        <Sidebar activeIndex={0} />
        <AppShell.Main>Main</AppShell.Main>
      </StyledAppShell>
    </>
  );
}
