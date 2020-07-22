import styled from 'styled-components'
import { AppBar as appBar, Toolbar, IconButton, Button, Typography, FormControl as formControl } from '@material-ui/core';
import { default as treeView } from '@material-ui/lab/TreeView';
import { default as treeItem } from '@material-ui/lab/TreeItem';

export const FormWrapper = styled.div`
    margin-top: 0rem;
    margin-left: 0rem;
    height: calc(100vh - 100px);
    overflow-y: auto;
    overflow-x: hidden;
`

export const TreeView = styled(treeView)`
    width: auto;
    font-size: 0.875rem;
    justify-contents: left;
    color: black;
    border-radius: 1rem;
    border: solid;
    border-width: .1rem;
    border-radius: 1rem;
    border-color: gray;
    padding-right: 2rem;
    padding: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    background: #838e841c;
`

export const TreeItem = styled(treeItem)`
    .MuiTreeItem-label{
        width: auto;
        margin-top: .25rem;
        margin-bottom: .25rem;
        font-size: 1.2rem;
    }
    color: ${(props) => (props.darkMode ? "white" : "black")};
`

export const FormControl = styled(formControl)`
    margin: .5rem;
    width: 99%;
`