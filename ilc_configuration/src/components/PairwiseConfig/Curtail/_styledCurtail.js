import styled from 'styled-components'
import { Button as button, Typography as typography, Drawer as drawer, Slider as slider } from '@material-ui/core';
import treeView from '@material-ui/lab/TreeView';
import treeItem from '@material-ui/lab/TreeItem';

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

export const Slider = styled(slider)`
    background-color: #b1bfaf;
    border-radius: 1rem;

    .MuiSlider-track {
        color: transparent;
    }

    .MuiSlider-rail {
        background: linear-gradient(to right, rgb(255, 0, 0) 40%, gray 40%, gray 55%, rgb(0, 0, 255) 55%);
        opacity: 1 !important;
    }

    .MuiSlider-mark {
        opacity: 0 !important;
    }
`
