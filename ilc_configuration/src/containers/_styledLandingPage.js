import styled from 'styled-components'
import { Input as input, Button as button, Typography } from '@material-ui/core';

export const Button = styled(button)`
    color: white;
    border: solid;
    border-width: 1px;
    margin-top: 15rem;
    background-color: #34593b;
    padding: 1rem;
    border-radius: 1rem;
    :hover {
        background-color: #8fcf9b;
        color: black;
        border: solid;
        border-width: 1px;
      }
`

export const Input = styled(input)`
`