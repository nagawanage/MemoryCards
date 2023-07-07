import { styled, css } from "@mui/material/styles";

const Label = styled("label")(({ theme }) => ({
  ...theme.typography.h5,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default Label;
