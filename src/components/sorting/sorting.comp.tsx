import styled from "@emotion/styled";
import { NativeSelect } from "@mantine/core";
import React, { useState } from "react";
import DropdownIcon from "@/components/dropdown-icon/dropdown-icon.comp";

const sortArray: string[] = [
  "Most Popular",
  "Least Popular",
  "Most Rated",
  "Least Rated",
  "Most Voted",
  "Least Voted",
];

const SortingContainer = styled("div")`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;

const StyledNativeSelect = styled(NativeSelect)`
  width: 25%;
`;

function SortingInput() {
  const [isDropdownShow, setIsDropdownShow] = useState<boolean>(false);

  const handleClick = () => {
    setIsDropdownShow(!isDropdownShow);
  };

  const handleClose = () => {
    setIsDropdownShow(false);
  };

  return (
    <SortingContainer>
      <StyledNativeSelect
        onClick={handleClick}
        onBlur={handleClose}
        radius="md"
        label="Sort by"
        rightSection={<DropdownIcon status={isDropdownShow} />}
        data={sortArray}
      />
    </SortingContainer>
  );
}

export default SortingInput;
