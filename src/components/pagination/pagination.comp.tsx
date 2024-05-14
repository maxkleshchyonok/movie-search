import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { Pagination } from "@mantine/core";
import React from "react";

function PaginationElement() {
  return (
    <Pagination
      total={3}
      color={colors["purple-500"]}
      sx={{ marginLeft: "80%" }}
    />
  );
}

export default PaginationElement;
