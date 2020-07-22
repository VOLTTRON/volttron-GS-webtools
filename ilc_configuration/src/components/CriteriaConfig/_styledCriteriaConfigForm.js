import styled from 'styled-components'
import { FormControl as formControl } from '@material-ui/core';
import { default as treeView } from '@material-ui/lab/TreeView';
import { default as treeItem } from '@material-ui/lab/TreeItem';

export const FormControl = styled(formControl)`
    margin: .5rem;
    width: 99%;
`

export const TreeView = styled(treeView)`
    width: auto;
    font-size: 0.875rem;
    justify-contents: left;
    border-radius: 1rem;
    padding-right: 2rem;
    margin-top: .5rem;
`

export const TreeItem = styled(treeItem)`
    .MuiTreeItem-label{
        width: auto;
        margin-top: .1rem;
        margin-bottom: .1rem;
        font-size: 1.1rem;
    }
`