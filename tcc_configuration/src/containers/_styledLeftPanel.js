import styled from 'styled-components'
import { Button as button } from '@material-ui/core';
import { default as treeView } from '@material-ui/lab/TreeView';
import { default as treeItem } from '@material-ui/lab/TreeItem';

export const Button = styled(button)`
    justify-content: left;
    text-transform: inherit;
    font-size: 1.2rem;

    animation: ${(props) =>
        props.animate ? "shadow-pulse 5s infinite;" : "none"};
    && {
        background-color: ${(props) => (props.selected ? (props.darkMode ? "gray" : "#f1f1f1" ) : (props.darkMode ? "#424242" : "white") )};
    }

    @keyframes shadow-pulse {
        0% {
            box-shadow: 0 0 0px rgba(0, 0, 0, 0.2) inset;
            border-style: solid;
        }
        50% {
            border-style: solid;
            box-shadow: ${(props) => (props.darkMode ? "0 0 3px #23478d inset" : "0 0 3px rgb(20, 40, 80) inset")};
        }
        100% {
            border-style: solid;
            box-shadow: 0 0 0px rgba(0, 0, 0, 0.2) inset;
        }
    }
`

export const TreeView = styled(treeView)`
    width: auto;
    font-size: 0.875rem;
    justify-contents: left;
`

export const TreeItem = styled(treeItem)`
    .MuiTreeItem-label{
        width: auto;
        font-size: 1.2rem;
        margin-top: .25rem;
        margin-bottom: .25rem
    }
`
