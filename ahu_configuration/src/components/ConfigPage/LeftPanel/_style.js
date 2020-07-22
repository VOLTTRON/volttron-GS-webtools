import styled from "styled-components";
import { Box, ListItem, Collapse, Button } from "@material-ui/core";

export const StyledP = styled.p`
  font-size: 24px;
  color: #ffffff;
`;

export const StyledBoxWrapper = styled(Box)`
  background-color: #2d2d2d;
  height: 100%;
`;

export const StyledDivConfig = styled.div`
  background-color: #0c9a6f;
  padding: 1px;
`;

export const StyledButtonSave = styled(Button)`
  top: 87%;
  width: 100%;
  border-radius: 0px;
`;

export const StyledCollapse = styled(Collapse)`
  padding-left: 25px;
`;

export const StyledListItem = styled(ListItem)`
  color: ${(props) => (props.selected ? "#0c9a6f" : "white")};
  animation: ${(props) =>
    props.animate ? "shadow-pulse 2s infinite;" : "none"};
  && {
    background-color: ${(props) => (props.selected ? "black" : "#2d2d2d")};
  }

  @keyframes shadow-pulse {
    0% {
      box-shadow: 0 0 0px rgba(0, 0, 0, 0.2) inset;
      border-radius: 25px;
      border-style: solid;
    }
    50% {
      border-radius: 25px;
      border-style: solid;
      box-shadow: 0 0 2px rgb(12, 154, 111) inset;
    }
    100% {
      border-radius: 25px;
      border-style: solid;
      box-shadow: 0 0 0px rgba(0, 0, 0, 0.2) inset;
    }
  }
`;
