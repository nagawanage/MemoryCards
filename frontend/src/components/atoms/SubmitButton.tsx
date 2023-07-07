import React, { memo, ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import { Button, ButtonProps } from "@mui/material";

type Props = {
  color: ButtonProps["color"];
  text: string;
  onClick: () => void;
  // onClick: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SubmitButton = ({
  color = "inherit",
  text,
  onClick,
}: Props): JSX.Element => {
  // const props={ color: "inherit", text: "" };
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color={color} onClick={onClick}>
        {text}
      </Button>
    </Stack>
  );
};

export default memo(SubmitButton);
