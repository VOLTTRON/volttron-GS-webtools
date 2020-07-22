import styled from 'styled-components';
import { Box } from "@material-ui/core";


export const StyledBoxWrapper = styled(Box)`
    background-color: ${(props) =>
        (props.darkMode ? "#303030" : "#FFFFFF")
    };
    width: 100%;
    text-align: left;
    height: calc(100vh - 100px);
    overflow-x: hidden;
`;

export const StyledDiv = styled.div`
    background-color: white;
    border-radius: 25px;
    border-style: solid;
    border-width: 2px;
    border-color: #9e9e9e;
    padding: 8px;
`;

export const StyledBox = styled(Box)`
    background-color: white;
    word-wrap: break-word;
`;
