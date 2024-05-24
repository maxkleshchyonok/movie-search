import colors from "@/helpers/index";
import { Button } from "@mantine/core";

type CallbackFunction = (value: string) => void;

type Props = {
  value: string;
  callback: CallbackFunction;
};

function SearchButton(props: Props) {
  return (
    <Button
      variant="filled"
      color={colors["purple-500"]}
      sx={{ borderRadius: "8px", width: "90%", marginRight: "12%" }}
      onClick={() => {
        props.callback(props.value);
      }}
    >
      Search
    </Button>
  );
}

export default SearchButton;
