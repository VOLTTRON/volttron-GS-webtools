import styled from 'styled-components'
import { Tooltip as tooltip, FormControl as formControl, FormControlLabel as formControlLabel } from '@material-ui/core';
import { default as treeView } from '@material-ui/lab/TreeView';
import { default as treeItem } from '@material-ui/lab/TreeItem';
import { default as checkBox } from '@material-ui/core/CheckBox';
import { Box } from "@material-ui/core";

export const Tooltip = styled(tooltip)`
    font-size: 1rem;
`

export const TreeView = styled(treeView)`
    width: auto;
    font-size: 0.875rem;
    justify-contents: left;
    background: #838e841c;
    border-radius: 1rem;
    padding: 1rem;
    padding-right: 2rem;
    margin-top: .5rem;
`

export const TreeItem = styled(treeItem)`
    .MuiTreeItem-label{
        width: auto;
        margin-top: .25rem;
        margin-bottom: .25rem
    }
    color: ${(props) => (props.darkMode ? "white" : "black")};
`

export const FormControl = styled(formControl)`
    margin: .5rem;
    width: 99%;
`

export const FormControlLabel = styled(formControlLabel)`
`

export const CheckBox = styled(checkBox)`
    color: #34593b;
    .MuiIconButton-label{
        color: #34593b;
    };
`

export const StyledBox = styled(Box)`
    width: auto;
`
