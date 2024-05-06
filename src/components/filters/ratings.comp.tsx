import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { NumberInput, Title } from "@mantine/core";

const RatigsContainer = styled("div")`
  display: block;
  width: 25%;
`;

const InputsContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  font-size: 16px;
  font-weight: 700;
`;

const StyledNumberInput = styled(NumberInput)`
  background: ${colors.white};
  border: 1px solid ${colors["grey-300"]};
  border-radius: 8px;
  width: 48%;
  padding-left: 2%;
  color: ${colors["grey-500"]};
`;

function RatingsFilter() {
  return (
    <RatigsContainer>
      <StyledTitle order={4}>Ratings</StyledTitle>
      <InputsContainer>
        <StyledNumberInput
          variant="unstyled"
          placeholder="From"
          min={0}
          max={5}
          decimalScale={1}
          styles={{
            control: {
              color: colors["grey-500"],
            },
          }}
        />
        <StyledNumberInput
          variant="unstyled"
          placeholder="To"
          min={0}
          max={5}
          decimalScale={1}
          styles={{
            control: {
              color: colors["grey-500"],
            },
          }}
        />
      </InputsContainer>
    </RatigsContainer>
  );
}

export default RatingsFilter;
