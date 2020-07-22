import styled from "styled-components";
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Icon, Button} from "@material-ui/core";

export const StyledExpansionPanel = styled(ExpansionPanel)`
  left: 41px;
  width: 80%;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
`;

export const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
    background: #0c9a6f;
    background-color: ${props => (props.disabled ? "#E0E0E0" : "#0c9a6f")};
    padding: 1.5rem 3rem;
    font-size: 1.5rem;
    line-height: 0;
    text-transform: none;
  }
  & span {
    color: black;
  }
  & .MuiExpansionPanelSummary-content {
    color: white;
  }
`;

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    background-color: white;
    display: contents;
    width: 90%;
  }
`;

export const StyledIcon = styled(Icon)`
  padding-top: 1rem;
`;

export const StyledButtonEconAir = styled(Button)`
  && {
    width: 100%;
    height: 3rem;
    background-color: white;
    display: block;
    text-align: left;
    & span {
      color: black;
    }
  }
`;