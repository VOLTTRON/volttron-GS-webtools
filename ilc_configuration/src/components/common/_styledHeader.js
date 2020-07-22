import styled from 'styled-components'
import { Typography} from '@material-ui/core';

export const SmallHeader = styled(Typography)`
    text-align: left;
    margin: 2rem 0 1rem 0;
    font-size: 1.5rem;
    color: ${(props) => (props.darkMode ? "white" : "black")};
`

export const VerySmallHeader = styled(Typography)`
    text-align: left;
    margin: 2rem 0 1rem 0;
    font-size: 1.4rem;
    color: ${(props) => (props.darkMode ? "white" : "black")};
`

export const TinyHeader = styled(Typography)`
    text-align: left;
    margin: 2rem 0 1rem 0;
    font-size: 1.2rem;
    color: ${(props) => (props.darkMode ? "white" : "black")};
`
