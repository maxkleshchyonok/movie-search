import { useEffect, useState } from "react";
import {
  Combobox,
  Input,
  InputBase,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import DropdownIcon from "../dropdown-icon/dropdown-icon.comp";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";
import { StyledActiveLink, StyledLink } from "../sorting/sorting.comp";

type Props = {
  optionsArray: string[];
};

const StyledCombobox = styled(Combobox)`
  width: 20%;
`;

const MAX_DISPLAYED_VALUES = 2;

export default function YearFilter({ optionsArray }: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [value, setValue] = useState<string | null>(null);
  const [dropdownShow, setDropdownShow] = useState<boolean>(false);

  const searchParams = useSearchParams();

  let selectedGenres = searchParams.get("genres");
  let selectedRelease = searchParams.get("release");
  const selectedMinRate = searchParams.get("min_rate");
  const selectedMaxRate = searchParams.get("max_rate");
  const selectedSort = searchParams.get("sort_by");
  const selectedPage = searchParams.get("page");
  let genresQuery = "?";
  let queryString = "";

  if (selectedSort) {
    queryString += `&sort_by=${selectedSort}`;
  }
  if (selectedMinRate) {
    queryString += `&min_rate=${selectedMinRate}`;
  }
  if (selectedMaxRate) {
    queryString += `&max_rate=${selectedMaxRate}`;
  }
  if (selectedPage) {
    queryString += `&page=${selectedPage}`;
  }

  if (selectedGenres) {
    genresQuery += `genres=${selectedGenres}`;
  }

  useEffect(() => {
    if (selectedRelease) {
      setValue(selectedRelease);
    }
  }, []);

  const options = optionsArray.map((item) => (
    <Combobox.Option value={item} key={item}>
      {selectedRelease && item === selectedRelease ? (
        <StyledActiveLink href={`${genresQuery}${queryString}`}>
          {item}
        </StyledActiveLink>
      ) : (
        <StyledLink href={`${genresQuery}&release=${item}${queryString}`}>
          {item}
        </StyledLink>
      )}
    </Combobox.Option>
  ));

  return (
    <StyledCombobox
      store={combobox}
      onOptionSubmit={(val) => {
        if (val === value) {
          setValue(null);
        } else {
          setValue(val);
        }
        combobox.closeDropdown();
      }}
      withinPortal={false}
      styles={{
        dropdown: {
          borderRadius: "8px",
        },
        option: {
          borderRadius: "8px",
          ":hover": {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          label="Release year"
          rightSection={<DropdownIcon status={dropdownShow} />}
          radius="md"
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="always" mah={200}>
            {options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </StyledCombobox>
  );
}
