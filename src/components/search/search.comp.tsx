import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import SearchIcon from "@/components/search/search-icon/search-icon.comp";
import styled from "@emotion/styled";
import SearchButton from "@/components/search/search-button/search-button.comp";

const StyledTextInput = styled(TextInput)`
  width: 42%;
`;

function SearchMovie() {
  const [value, setValue] = useState("");

  const handleSearchClick = () => {
    console.log("clicked");
  };
  return (
    <StyledTextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      placeholder="Search movie title"
      leftSection={<SearchIcon />}
      rightSection={<SearchButton callback={handleSearchClick} />}
      rightSectionWidth={100}
      styles={{ input: { padding: "5% 0 5% 7%" } }}
      radius="md"
    />
  );
}

export default SearchMovie;