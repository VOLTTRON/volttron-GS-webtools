import styled from 'styled-components'
import { Button as button, IconButton as iconButton } from '@material-ui/core';

export const PrimaryButton = styled(button)`
    color: white;
    border: solid;
    border-width: 1px;
    background-color: #142850;
    :hover {
        background-color: black;
    }
`

export const SecondaryButton = styled(button)`
    color: white;
    border: solid;
    border-width: 1px;
    background-color: #00909e;
    :hover {
        background-color: black;
    }
`

export const RemoveButton = styled(button)`
    color: white;
    border: solid;
    border-width: 1px;
    background-color: #F71735;
    :hover {
        color: #F71735;
        background-color: black;
    }
`

export const IconButton = styled(iconButton)`
    padding: .4rem;
    position: absolute;
    right: 10px;
    top: 0px;
`