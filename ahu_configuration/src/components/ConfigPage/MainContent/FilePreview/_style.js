import styled from "styled-components";
import { Box } from "@material-ui/core";

export const StyledBoxWrapper = styled(Box)`
  background-color: white;
  width: 100%;
  height: 100%;
  border: 0 solid #979797;
  border-width: 1px;
`;

export const StyledDivPointMapping = styled.div`
  background-color: white;
  border-radius: 25px;
  border-style: solid;
  border-width: "1px";
  box-shadow: ${(props) =>
    props.currentPage === "Point Mapping"
      ? "0 0 10px #0C9A6F;"
      : "0 0 0px #0C9A6F;"};
  border-color: ${(props) =>
    props.currentPage === "Point Mapping" ? "#0C9A6F" : "grey"};
`;

export const StyledDivArguments = styled.div`
  background-color: white;
  border-radius: 25px;
  border-style: solid;
  margin-top: 2px;
  margin-bottom: 2px;
  box-shadow: ${(props) =>
    props.currentPage === "Settings"
      ? "0 0 10px #0C9A6F;"
      : "0 0 0px #0C9A6F;"};
  border-width: "1px";
  border-color: ${(props) =>
    props.currentPage === "Settings" ? "#0C9A6F" : "grey"};
`;

export const StyledDivThresholds = styled.div`
  background-color: white;
  border-radius: 25px;
  border-style: solid;
  border-width: "1px";
  box-shadow: ${(props) =>
    props.currentPage === "Thresholds"
      ? "0 0 10px #0C9A6F;"
      : "0 0 0px #0C9A6F;"};
  border-color: ${(props) =>
    props.currentPage === "Thresholds" ? "#0C9A6F" : "grey"};
`;

export const StyledDivStatic = styled.div`
  background-color: white;
  border-radius: 25px;
  border-style: solid;
  border-width: "1px";
  margin-top: 2px;
  margin-bottom: 2px;
  box-shadow: ${(props) =>
    props.currentPage === "Static Pressure"
      ? "0 0 10px #0C9A6F;"
      : "0 0 0px #0C9A6F;"};
  border-color: ${(props) =>
    props.currentPage === "Static Pressure" ? "#0C9A6F" : "grey"};
`;

export const StyledDivAIRC = styled.div`
  background-color: white;
  border-radius: 25px;
  border-style: solid;
  border-width: "1px";
  box-shadow: ${(props) =>
    props.currentPage === "SAT AIRCx"
      ? "0 0 10px #0C9A6F;"
      : "0 0 0px #0C9A6F;"};
  border-color: ${(props) =>
    props.currentPage === "SAT AIRCx" ? "#0C9A6F" : "grey"};
`;

export const StyledDivSchedule = styled.div`
  background-color: white;
  border-radius: 25px;
  border-style: solid;
  border-width: "1px";
  margin-top: 2px;
  margin-bottom: 2px;
  box-shadow: ${(props) =>
    props.currentPage === "Schedule/Reset AIRCx"
      ? "0 0 10px #0C9A6F;"
      : "0 0 0px #0C9A6F;"};
  border-color: ${(props) =>
    props.currentPage === "Schedule/Reset AIRCx" ? "#0C9A6F" : "grey"};
`;

export const StyledBox = styled(Box)`
  background-color: white;
`;
