import { useEffect, useState } from "react";
import {
  Combobox,
  Input,
  InputBase,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import DropdownIcon from "../dropdown-icon/dropdown-icon.comp";
import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SortingsToUrl: any = {
  "Most Popular": "popularity.desc",
  "Least Popular": "popularity.asc",
  "Most Rated": "vote_average.desc",
  "Least Rated": "vote_average.asc",
  "Most Voted": "vote_count.desc",
  "Least Voted": "vote_count.asc",
  "Title asc": "title.asc",
  "Title desc": "title.desc",
  "Revenue most": "revenue.desc",
  "Revenue least": "revenue.asc",
  "Release latest": "primary_release_date.desc",
  "Release oldest": "primary_release_date.asc",
};

const UrlToSortings: any = {
  "popularity.desc": "Most Popular",
  "popularity.asc": "Least Popular",
  "vote_average.desc": "Most Rated",
  "vote_average.asc": "Least Rated",
  "vote_count.desc": "Most Voted",
  "vote_count.asc": "Least Voted",
  "title.asc": "Title asc",
  "title.desc": "Title desc",
  "revenue.desc": "Revenue most",
  "revenue.asc": "Revenue least",
  "primary_release_date.desc": "Release latest",
  "primary_release_date.asc": "Release oldest",
};

type Props = {
  optionsArray: string[];
};

const StyledCombobox = styled(Combobox)`
  width: 23%;
  margin-left: 60%;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.black};
  padding: 4px 12px;
  border-radius: 8px;
  display: block;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${colors["purple-100"]};
    color: ${colors.black};
  }
`;

export const StyledActiveLink = styled(StyledLink)`
  color: ${colors.white};
  background: ${colors["purple-500"]};

  &:hover {
    color: ${colors.white};
    background: ${colors["purple-500"]};
  }
`;

export default function SortFilter({ optionsArray }: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [value, setValue] = useState<string | number | string[] | undefined>(
    "Most Popular"
  );
  const [dropdownShow, setDropdownShow] = useState<boolean>(false);

  const searchParams = useSearchParams();
  let selectedSort = searchParams.get("sort_by");
  let selectedGenre = searchParams.get("genres");
  let selectedRelease = searchParams.get("release");
  let selectedMinRate = searchParams.get("min_rate");
  let selectedMaxRate = searchParams.get("max_rate");
  let selectedPage = searchParams.get("page");

  let genresQuery = "?";
  let releaseQuery = "";
  let afterQuery = "";

  if (selectedMinRate) {
    afterQuery += `&min_rate=${selectedMinRate}`;
  }
  if (selectedMaxRate) {
    afterQuery += `&max_rate=${selectedMaxRate}`;
  }
  if (selectedPage) {
    afterQuery += `&page=${selectedPage}`;
  }
  if (selectedGenre) {
    genresQuery += `genres=${selectedGenre}`;
  }
  if (selectedRelease) {
    releaseQuery += `&release=${selectedRelease}`;
  }

  useEffect(() => {
    if (selectedSort) {
      setValue(UrlToSortings[selectedSort]);
    } else {
      setValue("Most Popular");
    }
  }, []);

  const options = optionsArray.map((item) => (
    <Combobox.Option value={item} key={item}>
      {value == item ? (
        <StyledActiveLink
          href={`${genresQuery}${releaseQuery}&sort_by=${SortingsToUrl[item]}${afterQuery}`}
        >
          {item}
        </StyledActiveLink>
      ) : (
        <StyledLink
          href={`${genresQuery}${releaseQuery}&sort_by=${SortingsToUrl[item]}${afterQuery}`}
        >
          {item}
        </StyledLink>
      )}
    </Combobox.Option>
  ));

  const handleDropdownCLick = () => {
    combobox.toggleDropdown();
    setDropdownShow(!dropdownShow);
  };

  return (
    <StyledCombobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
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
          size="md"
          value={value}
          component="button"
          type="button"
          pointer
          label="Sort by"
          rightSection={<DropdownIcon status={dropdownShow} />}
          radius="md"
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          styles={{
            label: {
              marginBottom: "2%",
              fontSize: "17px",
              fontWeight: "700",
            },
          }}
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
