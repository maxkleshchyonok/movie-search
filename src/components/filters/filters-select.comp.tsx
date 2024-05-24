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
//   title: string;
//   placeholder: string;
//   optionsArray: string[];
// };

// const StyledCombobox = styled(Combobox)`
//   width: 20%;
// `;

// const StyledPillsInput = styled(PillsInput)`
//   background: ${colors.white};
//   border: 1px solid ${colors["grey-300"]};
//   border-radius: 8px;
// `;

// const StyledInputPlaceholder = styled(Input.Placeholder)`
//   margin-left: 2%;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: black;
// `;

// const MAX_DISPLAYED_VALUES = 2;

// export default function FiltersSelect({
//   title,
//   placeholder,
//   optionsArray,
// }: Props) {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//     onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
//   });

//   const [value, setValue] = useState<string[]>([]);
//   const [dropdownShow, setDropdownShow] = useState<boolean>(false);

//   const searchParams = useSearchParams();
//   let selectedGenres = searchParams.get("genres");
//   let selectedYears = searchParams.get("years");

//   const queryGenresValues = selectedGenres?.split(/(?=[A-Z])/);
//   const queryYearsValues = selectedYears;

//   useEffect(() => {
//     if (title === "Genres" && queryGenresValues) {
//       setValue(queryGenresValues);
//     } else if (title === "Release year" && queryYearsValues) {
//     }
//   }, []);

//   if (selectedGenres === null) {
//     selectedGenres = "";
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

//   let options;

//   if (title === "Genres") {
//     options = optionsArray.map((item) => (
//       <Combobox.Option value={item} key={item} active={value.includes(item)}>
//         <Group gap="sm">
//           {selectedGenres.includes(item) ? (
//             <StyledLink href={`?genres=${selectedGenres.replace(item, "")}`}>
//               {item}
//             </StyledLink>
//           ) : (
//             <StyledLink href={`?genres=${selectedGenres + item}`}>
//               {item}
//             </StyledLink>
//           )}
//         </Group>
//       </Combobox.Option>
//     ));
//   } else if (title === "Release year") {
//     options = optionsArray.map((item) => (
//       <Combobox.Option value={item} key={item} active={value.includes(item)}>
//         <Group gap="sm">
//           {selectedGenres.includes(item) ? (
//             <StyledLink href={`?genres=${selectedYears.replace(item, "")}`}>
//               {item}
//             </StyledLink>
//           ) : (
//             <StyledLink href={`?years=${selectedYears + item}`}>
//               {item}
//             </StyledLink>
//           )}
//         </Group>
//       </Combobox.Option>
//     ));
//   }

//   const handleDropdownCLick = () => {
//     combobox.toggleDropdown();
//     setDropdownShow(!dropdownShow);
//   };

//   console.log(value);

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
//           label={title}
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
//               <StyledInputPlaceholder>{placeholder}</StyledInputPlaceholder>
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
