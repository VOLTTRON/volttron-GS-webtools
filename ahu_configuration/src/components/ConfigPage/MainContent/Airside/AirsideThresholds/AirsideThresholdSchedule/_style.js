import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export const StyledTypographyDOW = styled(Typography)`
  padding-top: 21px;
  color: #0c9a6f;
  display: flex;
  font-size: 12px;
`;

export const StyledTypography = styled(Typography)`
  display: flex;
  font-size: 12px;
`;

export const StyledArrowRightAltIcon = styled(ArrowRightAltIcon)`
  padding-top: 21px;
`;

export const StyledButtonOnOff = styled(Button)`
  background-color: ${(props) =>
    (props.open === "00:00") & (props.close === "00:00")
      ? "#0c9a6f"
      : "#FFFFFF"};
  color: ${(props) =>
    (props.open === "00:00") & (props.close === "00:00")
      ? "#FFFFFF"
      : "#0c9a6f"};
  margin-top: 11px;
  margin-left: 5px;
  border-radius: 0px;
`;
