import styled from 'styled-components'
import { Input as input, Button as button, Typography as typography, Drawer as drawer } from '@material-ui/core';
import { default as treeView } from '@material-ui/lab/TreeView';
import { default as treeItem } from '@material-ui/lab/TreeItem';

export const Button = styled(button)`
    justify-content: left;
    text-transform: inherit;
    font-size: 1.2rem;

    animation: ${(props) =>
        props.animate ? "shadow-pulse 2s infinite;" : "none"};
    && {
        background-color: ${(props) => (props.selected ? (props.darkMode ? "gray" : "#f1f1f1" ) : (props.darkMode ? "#424242" : "white") )};
    }

    @keyframes shadow-pulse {
        0% {
            box-shadow: 0 0 0px rgba(0, 0, 0, 0.2) inset;
            border-radius: 25px;
            border-style: solid;
        }
        50% {
            border-radius: 25px;
            border-style: solid;
            box-shadow: 0 0 2px rgb(12, 154, 111) inset;
        }
        100% {
            border-radius: 25px;
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

    animation: ${(props) =>
        props.animate ? "shadow-pulse 2s infinite;" : "none"};
    && {
        background-color: ${(props) => (props.darkMode ? "#424242" : "white")};
    }

    @keyframes shadow-pulse {
        0% {
            box-shadow: 0 0 0px rgba(0, 0, 0, 0.2) inset;
            border-radius: 25px;
            border-style: solid;
        }
        50% {
            border-radius: 25px;
            border-style: solid;
            box-shadow: 0 0 2px rgb(12, 154, 111) inset;
        }
        100% {
            border-radius: 25px;
            border-style: solid;
            box-shadow: 0 0 0px rgba(0, 0, 0, 0.2) inset;
        }
    }
`
