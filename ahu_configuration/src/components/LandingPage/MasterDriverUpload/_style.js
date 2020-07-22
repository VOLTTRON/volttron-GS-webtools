import styled from "styled-components";
import { Button } from "@material-ui/core";

export const StyledDiv = styled.div`
  display: inline-block;
  padding-top: 15px;
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
  padding-top: .5rem;
`;

export const StyledButton = styled(Button)`
  && {
    padding: 1.5rem 4.5rem;
    font-size: 1.5rem;
    line-height: 0;
    text-transform: none;
    border-radius: 0;
  }
`;

export const StyledButtonReUpload = styled(Button)`
  && {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    line-height: 0;
    text-transform: none;
    border-radius: 0;
    border: 2px solid #0C9A6F;
    background-color: white;
    & span {
      color: #0C9A6F;
    }
  }
`;