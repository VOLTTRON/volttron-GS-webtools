import styled from 'styled-components'
import { default as treeView } from '@material-ui/lab/TreeView';
import { default as treeItem } from '@material-ui/lab/TreeItem';

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
