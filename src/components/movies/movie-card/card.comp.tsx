import styled from "@emotion/styled";
import { ActionIcon, Image, Modal, Text, Title } from "@mantine/core";
import React, { MouseEventHandler, useEffect, useState } from "react";
import RatingIcon from "@/components/rating-icon/rating-icon.comp";
import colors from "@/helpers/index";
import { useRouter } from "next/navigation";
import RatingModal from "@/components/rating-modal/rating-modal.comp";
import { useDisclosure } from "@mantine/hooks";

export enum CardSize {
  small = "small",
  big = "big",
}

type Props = {
  id: string;
  title: string;
  year: number;
  rating: number;
  views: number;
  genres: string[];
  image: string;
  details?: {
    duration: string;
    premiere: string;
    budget: string;
    gross: string;
  };
  cardSize: CardSize;
  imageHeight: number;
  imageWidth: number;
};

type ContainerProps = {
  width: string;
};

const Container = styled("div")`
  background: ${colors.white};
  width: ${(props: ContainerProps) => props.width};
  border-radius: 12px;
  padding: 2%;
  display: flex;
  margin-bottom: 2%;
`;

const StyledTitle = styled(Title)`
  cursor: pointer;
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

const DetailedMovieInfo = styled("div")`
  margin-top: 10vh;
`;

const RatingBox = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: auto;
  margin-left: auto;
`;

function MovieCard(props: Props) {
  const { title } = props;
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`movie/${props.id}`);
  };

  const [rating, setRating] = useState("");

  useEffect(() => {
    const ratingCount = localStorage.getItem(`movie_rating_${props.id}`);
    if (ratingCount) {
      setRating(ratingCount);
    }
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  const handleRateChange = (rate: number) => {
    if (!rate) {
      return setRating("");
    }
    return setRating(rate.toString());
  };

  return (
    <Container width={props.cardSize === CardSize.small ? "49%" : "88%"}>
      <Image
        w={props.imageWidth}
        h={props.imageHeight}
        src={props.image}
        alt="poster"
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />
      <MovieDetails>
        <StyledTitle order={3} onClick={handleClick}>
          {title}
        </StyledTitle>
        <Text>{props.year}</Text>
        <RatingViewsContainer>
          <RatingIcon color={colors.yellow} />
          <Title order={4}>
            {props.rating} / {props.views}
          </Title>
        </RatingViewsContainer>
        {props.details && (
          <DetailedMovieInfo>
            {Object.entries(props.details).map(([key, value]) => (
              <div key={key}>
                {key[0].toUpperCase() + key.slice(1)} {value}
              </div>
            ))}
          </DetailedMovieInfo>
        )}
        <Genres>Genres {props.genres.map((genre) => genre)}</Genres>
      </MovieDetails>
      <RatingBox>
        <ActionIcon variant="transparent" aria-label="rating" onClick={open}>
          <RatingIcon
            color={rating ? colors["purple-500"] : colors["grey-300"]}
          />
        </ActionIcon>
        {rating && <Title order={4}>{rating}</Title>}
      </RatingBox>
      <Modal opened={opened} onClose={close} title="Your rating" centered>
        <RatingModal
          id={`movie_rating_${props.id}`}
          title={props.title}
          rating={rating}
          callback={handleRateChange}
        />
      </Modal>
    </Container>
  );
}

export default MovieCard;
