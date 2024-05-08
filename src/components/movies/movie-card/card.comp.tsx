import styled from "@emotion/styled";
import { ActionIcon, Image, Text, Title } from "@mantine/core";
import React from "react";
import RatingIcon from "@/components/rating-icon/rating-icon.comp";
import colors from "@/helpers/index";

type Props = {
  title: string;
  year: number;
  rating: number;
  views: number;
  genres: string[];
  image: string;
};

const Container = styled("div")`
  background: ${colors.white};
  width: 49%;
  border-radius: 12px;
  padding: 2%;
  display: flex;
  margin-bottom: 2%;
`;

const StyledTitle = styled(Title)`
  color: ${colors["purple-500"]};
`;

const MovieDetails = styled("div")`
  margin-left: 3%;
  display: flex;
  flex-flow: column wrap;
`;

const RatingViewsContainer = styled("div")`
  display: flex;
`;

const Genres = styled("div")`
  margin-top: auto;
`;

function MovieCard(props: Props) {
  return (
    <Container>
      <Image
        w={150}
        h={200}
        src={props.image}
        alt="poster"
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />
      <MovieDetails>
        <StyledTitle order={3}>{props.title}</StyledTitle>
        <Text>{props.year}</Text>
        <RatingViewsContainer>
          <RatingIcon color={colors.yellow} />
          <Title order={4}>
            {props.rating} / {props.views}
          </Title>
        </RatingViewsContainer>
        <Genres>Genres {props.genres.map((genre) => genre)}</Genres>
      </MovieDetails>
      <ActionIcon
        variant="transparent"
        aria-label="rating"
        sx={{ marginLeft: "auto" }}
      >
        <RatingIcon color={colors["grey-300"]} />
      </ActionIcon>
    </Container>
  );
}

export default MovieCard;
