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
