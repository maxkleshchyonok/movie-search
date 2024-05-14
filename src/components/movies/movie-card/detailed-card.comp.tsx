import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { Divider, Text, Title } from "@mantine/core";
import React from "react";

const Container = styled("div")`
  width: 88%;
  background: ${colors.white};
  border-radius: 12px;
  padding: 2%;
`;

function DetailedMovieInfo() {
  return (
    <Container>
      <Title order={3}>Trailer</Title>
      <p>Trailer will be here...</p>
      <Divider my="md" />

      <Title order={3}>Description</Title>
      <Text size="md">
        When variant prop is set to gradient, you can control gradient with
        gradient prop, it accepts an object with from, to and deg properties. If
        thegradient prop is not set, Text will use theme.defaultGradient which
        can be configured on the theme object. gradient prop is ignored when
        variant is not gradient.
      </Text>
      <Divider my="md" />

      <Title order={3}>Production</Title>
      <Text>Castle Rock Entertainment</Text>
      <Text>Darkwoods Productions</Text>
    </Container>
  );
}

export default DetailedMovieInfo;
