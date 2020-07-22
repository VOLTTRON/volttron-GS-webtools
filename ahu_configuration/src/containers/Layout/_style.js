import styled from "styled-components";
import { Typography} from "@material-ui/core";


export const StyledDivWrapper = styled.div`
  flex-grow: 1;
`;

export const StyledTypographyTitle = styled(Typography)`
  font-size: 1.5em;
  font-family: Roboto-Regular;
  margin: auto;
`;

export const StyledDivLogoWrapper = styled.div`
  margin-right: 1rem;
  text-align: center;
`;

export const StyledDivContent = styled.div`
height: calc(100vh - 64px);
overflow: auto;
`;