import colors from "@/helpers/index";
import { MovieDetailsType } from "@/types/movies/movies";
import styled from "@emotion/styled";
import { AspectRatio, Divider, Image, Text, Title } from "@mantine/core";
import React from "react";
import no_movies_img from "@/assets/no-movies.png";

const Container = styled("div")`
  width: 73%;
  background: ${colors.white};
  border-radius: 12px;
  padding: 2%;
  margin-left: -1%;
  margin-top: -3%;
`;

const StyledAspectRatio = styled(AspectRatio)`
  width: 70%;
`;

const StyledIframe = styled("iframe")`
  border-radius: 16px;
`;

const Companies = styled("div")`
  display: flex;
  align-items: center;
  gap: 2%;
`;

function DetailedMovieInfo(
  props: Pick<MovieDetailsType, "videos" | "overview" | "production_companies">
) {
  const { videos, overview, production_companies } = props;

  let video = videos.results.find((el) => el.official);

  if (!video) {
    video = videos.results[0];
  }

  return (
    <Container>
      <Title order={3}>Trailer</Title>
      <StyledAspectRatio ratio={16 / 9}>
        <StyledIframe src={`https://www.youtube.com/embed/${video.key}`} />
      </StyledAspectRatio>
      <Divider my="md" />

      <Title order={3}>Description</Title>
      <Text size="md">{overview}</Text>
      <Divider my="md" />

      <Title order={3}>Production</Title>
      {production_companies.map((el) => (
        <Companies key={el.id}>
          {el.logo_path ? (
            <Image
              w={50}
              src={`https://image.tmdb.org/t/p/w500/${el.logo_path}`}
            />
          ) : (
            <Image
              w={50}
              src="https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/512x512/plain/clapperboard.png"
            />
          )}
          <Title order={4}>{el.name}</Title>
        </Companies>
      ))}
    </Container>
  );
}

export default DetailedMovieInfo;
