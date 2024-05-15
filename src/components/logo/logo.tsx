import styled from "@emotion/styled";
import { Title } from "@mantine/core";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import colors from "@/helpers/index";

const StyledLogo = styled("div")`
  display: flex;
  align-items: center;
  color: ${colors["purple-500"]};
  gap: 3%;
  margin-bottom: 8vh;
`;

function LogoComponent() {
  return (
    <StyledLogo>
      <Image src={logo} alt="logo" />
      <Title order={2}>ArrowFlicks</Title>
    </StyledLogo>
  );
}

export default LogoComponent;
