import styled from 'styled-components';
import AcceptedFiles from "../../components/LandingPage/AcceptedFiles/AcceptedFiles";

export const StyledAcceptedFiles = styled(AcceptedFiles)`
  margin: auto;
  display: block;
  overflow: auto;
`;

export const StyledOL = styled.ol`
  display: block;
  overflow: auto;
`;

export const StyledDiv = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
`;

export const StyledFileDv = styled.div`
  padding-left: 6rem;
`;

export const StyledLi = styled.li`
  font-size: 1.75rem;
`;
export const StyledSpan = styled.span`
  position: relative;
  left: 41px;
`;

export const StyledP = styled.p`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-size: 1.75rem;
  padding-left: 9rem;
  padding-top: -1rem;
`;