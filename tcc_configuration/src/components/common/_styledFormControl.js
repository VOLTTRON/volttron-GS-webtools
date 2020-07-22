import styled from 'styled-components'
import { FormControl as formControl, FormControlLabel as formControlLabel } from '@material-ui/core';


export const FormControl = styled(formControl)`
    margin: .5rem;
    width: 95%;
`

export const FormControlLabel = styled(formControlLabel)`
    .MuiFormControlLabel-label {
        font-size: small;
    }
`

export const FormWrapper = styled.div`
    height: calc(100vh - 100px);
    overflow-y: auto;
    overflow-x: hidden;
`

export const FormHeader = styled.div`
    text-align: left;
`

export const HorizontalRule = styled.hr`
    width: 98%;
`