import styled from "styled-components";
import { Button } from "@material-ui/core";

export const StyledDiv = styled.div`
  display: inline-block;
  pointer-events: ${props => props.disabled ? "none" : "auto"};
  padding-top: 80px;
`;

export const StyledButton = styled(Button)`
  && {
    padding: 1.5rem 5.8rem;
    font-size: 1.5rem;
    line-height: 0;
    text-transform: none;
    border-radius: 0;
  }
`;

export const StyledDivReUpload = styled.div`
  display: flex;
`;

export const StyledPReUpload = styled.p`
  padding-right: 50px;
  font-size: 1.3rem;
  font-family: "Roboto-Light";
`;

export const StyledLabelReUpload = styled.label`
  padding-top: 0.5rem;
`;

export const StyledButtonReUpload = styled(Button)`
  && {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    line-height: 0;
    text-transform: none;
    border-radius: 0;
    border: 2px solid #0c9a6f;
    background-color: white;
    & span {
      color: #0c9a6f;
    }
  }
`;