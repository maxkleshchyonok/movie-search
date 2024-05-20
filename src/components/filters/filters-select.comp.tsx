import { useState } from "react";
import {
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  ScrollArea,
  Title,
  useCombobox,
} from "@mantine/core";
import DropdownIcon from "../dropdown-icon/dropdown-icon.comp";
import colors from "@/helpers/index";
import styled from "@emotion/styled";

type Props = {
  title: string;
  placeholder: string;
  optionsArray: string[];
};

const StyledCombobox = styled(Combobox)`
  width: 20%;
`;

const StyledPillsInput = styled(PillsInput)`
  background: ${colors.white};
  border: 1px solid ${colors["grey-300"]};
  border-radius: 8px;
`;

const StyledInputPlaceholder = styled(Input.Placeholder)`
  margin-left: 2%;
`;
export default function FiltersSelect({
  title,
  placeholder,
  optionsArray,
}: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [value, setValue] = useState<string[]>([]);
  const [dropdownShow, setDropdownShow] = useState<boolean>(false);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = optionsArray.map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        <span>{item}</span>
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
          borderRadius: "8px",
          ":hover": {
            backgroundColor: colors["purple-500"],
            color: colors.white,
          },
        },
      }}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          rightSection={<DropdownIcon status={dropdownShow} />}
          pointer
          onClick={handleDropdownCLick}
          label={title}
          radius="md"
        >
          <Pill.Group>
            {values.length ? (
              values
            ) : (
              <StyledInputPlaceholder>{placeholder}</StyledInputPlaceholder>
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
