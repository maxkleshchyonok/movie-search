import { useEffect, useState } from "react";
import {
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import DropdownIcon from "../dropdown-icon/dropdown-icon.comp";
import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { StyledActiveLink, StyledLink } from "../sorting/sorting.comp";

type Props = {
  optionsArray: string[];
};

const StyledCombobox = styled(Combobox)`
  width: 28%;
`;

const MAX_DISPLAYED_VALUES = 2;

export default function GenresFilter({ optionsArray }: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [value, setValue] = useState<string[]>([]);
  const [dropdownShow, setDropdownShow] = useState<boolean>(false);

  const searchParams = useSearchParams();

  let selectedGenres = searchParams.get("genres");
  const selectedRelease = searchParams.get("release");
  const selectedMinRate = searchParams.get("min_rate");
  const selectedMaxRate = searchParams.get("max_rate");
  const selectedSort = searchParams.get("sort_by");
  const selectedPage = searchParams.get("page");
  let queryString = "";

  if (selectedRelease) {
    queryString += `release=${selectedRelease}`;
  }
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

  const queryGenresValues = selectedGenres?.split(/(?=[A-Z])/);

  useEffect(() => {
    if (queryGenresValues) {
      setValue(queryGenresValues);
    }
  }, []);

  if (!selectedGenres) {
    selectedGenres = "";
  }

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value
    .slice(
      0,
      MAX_DISPLAYED_VALUES === value.length
        ? MAX_DISPLAYED_VALUES
        : MAX_DISPLAYED_VALUES - 1
    )
    .map((item) => (
      <Pill
        key={item}
        withRemoveButton
        onRemove={() => handleValueRemove(item)}
        styles={{
          root: { backgroundColor: "transparent" },
          remove: { display: "none" },
        }}
      >
        {item}
      </Pill>
    ));

  const options = optionsArray.map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        {selectedGenres.includes(item) ? (
          <StyledActiveLink
            href={
              value.length !== 1
                ? `?genres=${
                    selectedGenres.replace(item, "") + `&${queryString}`
                  }`
                : `?${queryString}`
            }
          >
            {item}
          </StyledActiveLink>
        ) : (
          <StyledLink href={`?genres=${selectedGenres + item}&${queryString}`}>
            {item}
          </StyledLink>
        )}
      </Group>
    </Combobox.Option>
  ));

  const handleDropdownCLick = () => {
    combobox.toggleDropdown();
    setDropdownShow(!dropdownShow);
  };

  return (
    <StyledCombobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
      styles={{
        dropdown: {
          borderRadius: "8px",
        },
        option: {
          ":hover": {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          rightSection={<DropdownIcon status={dropdownShow} />}
          pointer
          onClick={handleDropdownCLick}
          label={"Genres"}
          radius="md"
          size="md"
          styles={{
            label: { fontSize: "17px", marginBottom: "2%", fontWeight: "700" },
          }}
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder>{"Select genre"}</Input.Placeholder>
            )}
            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>
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
