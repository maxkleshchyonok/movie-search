import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { UnstyledButton } from "@mantine/core";
import React from "react";

function ResetFilters() {
  return (
    <UnstyledButton sx={{ color: colors["grey-600"], paddingTop: "2%" }}>
      Reset filters
    </UnstyledButton>
  );
}

export default ResetFilters;
