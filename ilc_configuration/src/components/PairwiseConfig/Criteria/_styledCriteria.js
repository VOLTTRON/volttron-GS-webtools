import styled from 'styled-components'
import { Input as input, Button as button, Typography as typography, Drawer as drawer } from '@material-ui/core';
import { default as treeView } from '@material-ui/lab/TreeView';
import { default as treeItem } from '@material-ui/lab/TreeItem';

export const Button = styled(button)`
    justify-content: left;
    text-transform: inherit;
    font-size: 1.2rem;
`

export const TreeView = styled(treeView)`
    width: auto;
    font-size: 0.875rem;
    justify-contents: left;
`

export const TreeItem = styled(treeItem)`
    margin-right: 10px;
    .MuiTreeItem-label{
        width: auto;
        font-size: 1.2rem;
        margin-top: .25rem;
        margin-bottom: .25rem
    }
    color: ${(props) => (props.darkMode ? "white" : "black")};
`
