import styled from 'styled-components'
import { Input as input, Button as button, IconButton as iconButton} from '@material-ui/core';

export const PrimaryButton = styled(button)`
    color: ${(props) => (props.color ? props.color : "white")};
    border: solid;
    border-width: 1px;
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "#34593b")};
    :hover {
        background-color: black;
    }
    :disabled {
        color: white;
        background-color: gray;
    }
    display: ${(props) => (props.display ? props.display : null)};
    margin-top: ${(props) => (props.marginTop ? props.marginTop : "inherit")}
`

export const SecondaryButton = styled(button)`
    color: white;
    border: solid;
    border-width: 1px;
    background-color: #394a6d;
    :hover {
        background-color: black;
    }
`

export const LowkeyDeleteButton = styled(button)`
    border: none;
    background-color: none;
    color: red;
    padding: 3px;
    padding-left: 0px;
`

export const IconButton = styled(iconButton)`
    padding: .4rem;
    position: absolute;
    right: 10px;
    top: 0px;
`

