import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { NumberInput, Title } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [minValue, setMinValue] = useState<string | number>("");
  const [maxValue, setMaxValue] = useState<string | number>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedMinRate = searchParams.get("min_rate");
  const selectedMaxRate = searchParams.get("max_rate");

  useEffect(() => {
    if (selectedMinRate) {
      setMinValue(selectedMinRate);
    }
    if (selectedMaxRate) {
      setMaxValue(selectedMaxRate);
    }
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (minValue) {
      newSearchParams.set("min_rate", minValue.toString());
    } else {
      newSearchParams.delete("min_rate");
    }
    if (maxValue) {
      newSearchParams.set("max_rate", maxValue.toString());
    } else {
      newSearchParams.delete("max_rate");
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [minValue, maxValue, searchParams]);

  return (
    <RatigsContainer>
      <StyledTitle order={4}>Ratings</StyledTitle>
      <InputsContainer>
        <StyledNumberInput
          variant="unstyled"
          placeholder="From"
          min={0}
          max={10}
          value={minValue}
          allowNegative={false}
          decimalScale={1}
          onChange={setMinValue}
          styles={{
            control: {
              color: colors["grey-500"],
            },
          }}
        />
        <StyledNumberInput
          value={maxValue}
          onChange={setMaxValue}
          variant="unstyled"
          placeholder="To"
          min={+minValue}
          max={10}
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
