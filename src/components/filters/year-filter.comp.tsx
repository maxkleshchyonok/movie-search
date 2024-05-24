// import { useEffect, useState } from "react";
// import {
//   Combobox,
//   Group,
//   Input,
//   Pill,
//   PillsInput,
//   ScrollArea,
//   useCombobox,
// } from "@mantine/core";
// import DropdownIcon from "../dropdown-icon/dropdown-icon.comp";
// import colors from "@/helpers/index";
// import styled from "@emotion/styled";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// type Props = {
//   optionsArray: string[];
// };

// const StyledCombobox = styled(Combobox)`
//   width: 20%;
// `;

// const StyledInputPlaceholder = styled(Input.Placeholder)`
//   margin-left: 2%;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: black;
// `;

// const MAX_DISPLAYED_VALUES = 2;

// export default function YearFilter({ optionsArray }: Props) {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//     onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
//   });

//   const [value, setValue] = useState<string[]>([]);
//   const [dropdownShow, setDropdownShow] = useState<boolean>(false);

//   const searchParams = useSearchParams();
//   let selectedYears = searchParams.get("release");
//   const selectedGenre = searchParams.get("genres");

//   let queryReleaseValues = selectedYears?.split("year");

//   useEffect(() => {
//     if (queryReleaseValues) {
//       queryReleaseValues = queryReleaseValues.filter((el) => el);
//       setValue(queryReleaseValues);
//     }
//   }, []);

//   if (!selectedYears) {
//     selectedYears = "";
//   }

//   const handleValueSelect = (val: string) =>
//     setValue((current) =>
//       current.includes(val)
//         ? current.filter((v) => v !== val)
//         : [...current, val]
//     );

//   const handleValueRemove = (val: string) =>
//     setValue((current) => current.filter((v) => v !== val));

//   const values = value
//     .slice(
//       0,
//       MAX_DISPLAYED_VALUES === value.length
//         ? MAX_DISPLAYED_VALUES
//         : MAX_DISPLAYED_VALUES - 1
//     )
//     .map((item) => (
//       <Pill
//         key={item}
//         withRemoveButton
//         onRemove={() => handleValueRemove(item)}
//       >
//         {item}
//       </Pill>
//     ));

//   const options = optionsArray.map((item) => (
//     <Combobox.Option value={item} key={item} active={value.includes(item)}>
//       <Group gap="sm">
//         {selectedYears.includes(item) ? (
//           <StyledLink
//             href={
//               selectedYears
//                 ? `?genres=${selectedGenre}&release=${selectedYears.replace(
//                     `year${item}`,
//                     ""
//                   )}`
//                 : `?${selectedGenre}`
//             }
//           >
//             {item}
//           </StyledLink>
//         ) : (
//           <StyledLink
//             href={`?genres=${selectedGenre}&release=${
//               selectedYears + "year" + item
//             }`}
//           >
//             {item}
//           </StyledLink>
//         )}
//       </Group>
//     </Combobox.Option>
//   ));

//   const handleDropdownCLick = () => {
//     combobox.toggleDropdown();
//     setDropdownShow(!dropdownShow);
//   };

//   return (
//     <StyledCombobox
//       store={combobox}
//       onOptionSubmit={handleValueSelect}
//       withinPortal={false}
//       styles={{
//         dropdown: {
//           borderRadius: "8px",
//         },
//         option: {
//           borderRadius: "8px",
//           ":hover": {
//             backgroundColor: colors["purple-500"],
//             color: colors.white,
//           },
//         },
//       }}
//     >
//       <Combobox.DropdownTarget>
//         <PillsInput
//           rightSection={<DropdownIcon status={dropdownShow} />}
//           pointer
//           onClick={handleDropdownCLick}
//           label={"Release year"}
//           radius="md"
//         >
//           <Pill.Group>
//             {value.length > 0 ? (
//               <>
//                 {values}
//                 {value.length > MAX_DISPLAYED_VALUES && (
//                   <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
//                 )}
//               </>
//             ) : (
//               <StyledInputPlaceholder>
//                 {"Select release year"}
//               </StyledInputPlaceholder>
//             )}
//             <Combobox.EventsTarget>
//               <PillsInput.Field
//                 type="hidden"
//                 onBlur={() => combobox.closeDropdown()}
//                 onKeyDown={(event) => {
//                   if (event.key === "Backspace") {
//                     event.preventDefault();
//                     handleValueRemove(value[value.length - 1]);
//                   }
//                 }}
//               />
//             </Combobox.EventsTarget>
//           </Pill.Group>
//         </PillsInput>
//       </Combobox.DropdownTarget>
//       <Combobox.Dropdown>
//         <Combobox.Options>
//           <ScrollArea.Autosize type="always" mah={200}>
//             {options}
//           </ScrollArea.Autosize>
//         </Combobox.Options>
//       </Combobox.Dropdown>
//     </StyledCombobox>
//   );
// }

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

// const StyledInputPlaceholder = styled(Input.Placeholder)`
//   margin-left: 2%;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: black;
// `;

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
  let genresQuery = "";
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
    genresQuery = `?genres=${selectedGenres}`;
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
