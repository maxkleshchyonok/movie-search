import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { UnstyledButton } from "@mantine/core";
import React from "react";

function ResetFilters() {
  const handleClck = () => {
    window.location.href = "/";
  };

  return (
    <UnstyledButton
      onClick={handleClck}
      sx={{ color: colors["grey-600"], paddingTop: "2%" }}
    >
      Reset filters
    </UnstyledButton>
  );
}

export default ResetFilters;
