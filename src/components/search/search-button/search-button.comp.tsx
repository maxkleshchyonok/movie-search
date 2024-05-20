import colors from "@/helpers/index";
import { Button } from "@mantine/core";

type CallbackFunction = () => void;

type Props = {
  callback: CallbackFunction;
};

function SearchButton(props: Props) {
  return (
    <Button
      variant="filled"
      color={colors["purple-500"]}
      sx={{ borderRadius: "8px" }}
      onClick={props.callback}
    >
      Search
    </Button>
  );
}

export default SearchButton;
