import styled from 'styled-components';
import {
    Box,
    FormControl,
    MenuItem,
  } from "@material-ui/core";

export const StyledFormControl = styled(FormControl)`
  min-width: 120px;
  max-width: 200px;
  background-color: #d8d8d8;
`;

export const StyledBoxWrapper = styled(Box)`
  background-color: #d8d8d8;
  width: 100%;
`;

export const StyledBox = styled(Box)`
  background-color: #d8d8d8;
`;

export const StyledMenuItem = styled(MenuItem)`
  pointer-events: none;
`;