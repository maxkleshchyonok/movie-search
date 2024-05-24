import styled from "@emotion/styled";
import { ActionIcon, Image, Modal, Text, Title } from "@mantine/core";
import React, { MouseEventHandler, useEffect, useState } from "react";
import RatingIcon from "@/components/rating-icon/rating-icon.comp";
import colors from "@/helpers/index";
import { useRouter } from "next/navigation";
import RatingModal from "@/components/rating-modal/rating-modal.comp";
import { useDisclosure } from "@mantine/hooks";
import { GET_Genres } from "app/api/route";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export enum CardSize {
  small = "small",
  big = "big",
}

type Props = {
  id: number;
  title: string;
  year: string;
  rating: number;
  views: number;
  genres: number[];
  image: string;
  details?: {
    duration: number;
    premiere: string;
    budget: number;
    gross: number;
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
  margin: -3.5% 0 5% -1%;
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

const StyledViews = styled(Title)`
  color: ${colors["grey-600"]};
  margin-left: 4%;
  font-weight: 500;
`;

const Genres = styled("div")`
  margin-top: auto;
  margin-left: 2.1%;
  height: 3vh;
  overflow: hidden;
`;

const DetailedMovieInfo = styled("div")`
  display: flex;
  margin-left: 2%;
  margin-top: auto;
`;

const DetailedBlock = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
`;

const GreyTitle = styled(Title)`
  color: ${colors["grey-600"]};
  font-weight: 500;
`;

const BlackTitle = styled(Title)`
  font-weight: 500;
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
  const [genresInfo, setGenresInfo] = useState("");

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

  useEffect(() => {
    async function fetchGenres() {
      let genresString = "";
      const allGenres = await GET_Genres();
      if (allGenres && props.genres) {
        for (let i = 0; i < allGenres?.genres.length; i++) {
          for (let j = 0; j < props.genres.length; j++) {
            if (props.genres[j] === allGenres.genres[i].id) {
              genresString += ` ${allGenres.genres[i].name}`;
            }
          }
        }
      }
      setGenresInfo(genresString);
    }
    fetchGenres();
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  const handleRateChange = (rate: number) => {
    if (!rate) {
      return setRating("");
    }
    return setRating(rate.toString());
  };

  const viewsCount = `(${props.views.toFixed(0)}K)`;
  const convertDate = (oldDate: string) => {
    const date = new Date(oldDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <Container width={props.cardSize === CardSize.small ? "43%" : "73%"}>
      <Image
        w={props.imageWidth}
        h={props.imageHeight}
        src={`https://image.tmdb.org/t/p/w500${props.image}`}
        alt="poster"
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />
      <MovieDetails>
        <StyledTitle order={3} onClick={handleClick}>
          {title}
        </StyledTitle>
        <Text sx={{ color: colors["grey-600"] }}>{props.year}</Text>
        <RatingViewsContainer>
          <RatingIcon color={colors.yellow} />
          <Title order={4}>{props.rating.toFixed(1)}</Title>
          <StyledViews order={4}>{viewsCount}</StyledViews>
        </RatingViewsContainer>
        {props.details && (
          <DetailedMovieInfo>
            <DetailedBlock>
              <GreyTitle order={5}>Duration</GreyTitle>
              <GreyTitle order={5}>Premiere</GreyTitle>
              <GreyTitle order={5}>Budget</GreyTitle>
              <GreyTitle order={5}>Gross worldwide</GreyTitle>
              <GreyTitle order={5}>Genres</GreyTitle>
            </DetailedBlock>
            <DetailedBlock>
              <BlackTitle order={5}>{props.details.duration}m</BlackTitle>
              <BlackTitle order={5}>
                {convertDate(props.details.premiere)}
              </BlackTitle>
              <BlackTitle order={5}>${props.details.budget}</BlackTitle>
              <BlackTitle order={5}>${props.details.gross}</BlackTitle>
              <BlackTitle order={5}>${genresInfo}</BlackTitle>
            </DetailedBlock>
          </DetailedMovieInfo>
        )}
      </MovieDetails>
      <RatingBox>
        <ActionIcon variant="transparent" aria-label="rating" onClick={open}>
          <RatingIcon
            color={rating ? colors["purple-500"] : colors["grey-300"]}
          />
        </ActionIcon>
        {rating && <Title order={4}>{rating}</Title>}
      </RatingBox>
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        title="Your rating"
        centered
      >
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
