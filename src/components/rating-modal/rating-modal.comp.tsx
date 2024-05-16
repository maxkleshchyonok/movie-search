import { Button, Divider, Title, Rating } from "@mantine/core";
import { useState } from "react";
import styled from "@emotion/styled";
import colors from "@/helpers/index";

type CallbackFunction = (rate: number) => void;

type Props = {
  id: string;
  title: string;
  rating: string;
  callback: CallbackFunction;
};

const ButtonsContainer = styled("div")`
  display: flex;
`;

function RatingModal(props: Props) {
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [ratingValue, setRatingValue] = useState(+props.rating);

  const handleNewRate = (value: number) => {
    setRatingValue(value);
    setIsSaveDisabled(false);
  };

  const changeRating = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(props.id, ratingValue.toString());
      props.callback(ratingValue);
      setIsSaveDisabled(true);
    }
  };

  const removeRating = () => {
    setRatingValue(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem(props.id);
      props.callback(0);
    }
  };

  return (
    <>
      <Divider />
      <Title order={2}>{props.title}</Title>
      <Rating
        value={ratingValue}
        size="lg"
        count={10}
        fractions={1}
        onChange={handleNewRate}
      />
      <ButtonsContainer>
        <Button
          variant="filled"
          color={colors["purple-500"]}
          onClick={changeRating}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
        <Button
          variant="transparent"
          color={colors["purple-500"]}
          onClick={removeRating}
        >
          Remove rating
        </Button>
      </ButtonsContainer>
    </>
  );
}

export default RatingModal;
