"use client";
import styled from "@emotion/styled";
import { AppShell, NavLink } from "@mantine/core";
import LogoComponent from "../logo/logo";
import colors from "@/helpers/index";

const StyledNavbar = styled(AppShell.Navbar)`
  background: ${colors["purple-100"]};
  width: 17.7%;
`;

const SidebarArray = [
  { key: 0, href: "/", label: "Movies" },
  { key: 1, href: "/rated", label: "Rated movies" },
];

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
          style={{
            color: activeIndex === index ? colors["purple-500"] : colors.black,
            fontWeight: activeIndex === index ? "700" : "500",
          }}
          styles={{
            label: {
              fontSize: "17px",
              ":hover": {
                color: `${
                  activeIndex !== index
                    ? colors["purple-400"]
                    : colors["purple-500"]
                }`,
              },
            },
            root: {
              ":hover": {
                background: `${
                  activeIndex !== index ? "transparent" : colors["purple-200"]
                }`,
              },
            },
          }}
          sx={{ borderRadius: "8px", margin: "5% 0 0 2.3%", width: "95%" }}
        />
      ))}
    </StyledNavbar>
  );
}
