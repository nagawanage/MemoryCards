import React, { memo } from "react";

import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import IconButton from "@mui//material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

type Props = {
  // id: string;
  // name: string;
  type?: string;
  value: string | number;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  // helperText?: string;
  // margin?: any;
  size?: "small" | "medium" | undefined;
  // textAlign?: string;
  inputProps?: any;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const InputText = (props: Props) => {
  const {
    // id = "",
    // name = "",
    type = "text",
    value = "",
    placeholder = "",
    label = "",
    fullWidth = true,
    size = "medium",
    inputProps = {},
    onChange,
    onClick,
  } = props;
  return (
    <Box
      component="form"
      // sx={{
      //   "& > :not(style)": { m: 1, width: "35ch" },
      // }}
      noValidate
      autoComplete="off"
    >
      <OutlinedInput
        // id={id}
        // name={name}
        type={type}
        value={value}
        label={label}
        placeholder={placeholder}
        fullWidth={fullWidth}
        size={size}
        inputProps={inputProps}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              sx={{ visibility: value ? "visible" : "hidden" }}
              aria-label=""
              edge="end"
              onClick={onClick}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default memo(InputText);
