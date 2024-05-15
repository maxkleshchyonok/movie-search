"use client";
import styled from "@emotion/styled";
import { AppShell, NavLink } from "@mantine/core";
import LogoComponent from "../logo/logo";

const StyledNavbar = styled(AppShell.Navbar)`
  background: #f2ecfa;
`;

const SidebarArray = [
  { key: 0, href: "/", label: "Movies" },
  { key: 1, href: "/rated", label: "Rated movies" },
];

const activeNavLink = {
  color: "rgba(152, 84, 246, 1)",
};

const notActiveNavLink = {
  color: "black",
};

export default function Sidebar({ activeIndex }: { activeIndex: number }) {
  return (
    <StyledNavbar p="md">
      <LogoComponent />
      {SidebarArray.map((el, index) => (
        <NavLink
          key={el.key}
          href={el.href}
          label={el.label}
          active={activeIndex === index}
          color="#E5D5FA"
          variant="filled"
          style={activeIndex === index ? activeNavLink : notActiveNavLink}
          sx={{ borderRadius: "8px", marginTop: "5%" }}
        />
      ))}
    </StyledNavbar>
  );
}
