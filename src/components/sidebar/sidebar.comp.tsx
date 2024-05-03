"use client";
import styled from "@emotion/styled";
import { AppShell, NavLink, Title } from "@mantine/core";
import logo from "@/assets/logo.svg";
import Image from "next/image";

const StyledNavbar = styled(AppShell.Navbar)`
  background: #f2ecfa;
`;

const StyledLogo = styled("div")`
  display: flex;
  align-items: center;
  color: rgba(152, 84, 246, 1);
  gap: 3%;
  margin-bottom: 8vh;
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
      <StyledLogo>
        <Image src={logo} alt="logo" />
        <Title order={2}>ArrowFlicks</Title>
      </StyledLogo>
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
