import React, { useContext} from 'react';
import { Drawer } from '@material-ui/core';
import { Button } from '../../containers/_styledLeftPanel';
import { makeStyles } from '@material-ui/core/styles';
import {default as history} from '../../history';
import { default as MasterDriverContext } from "../../context/masterDriverContext"
import { CurrentPageContext } from "../../context/currentPageContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: '5rem',
    },
}));

export default function LeftPanel(props) {
    const classes = useStyles();
    const { darkMode } = useContext(MasterDriverContext);
    const currentPageContext = useContext(CurrentPageContext);
    const [currentPage, setCurrentPage] = currentPageContext.currentPage;

    function navigateTo (route) {
        setCurrentPage(route);
        history.push(`/${route}`)
    }

    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant={"permanent"}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">
                <Button
                    onClick = {() => {return navigateTo("agent")}}
                    selected={currentPage === "agent" ? true : false}
                    darkMode={darkMode}
                    animate={currentPage === "agent" ? true : false}
                >
                    Agent Configuration
                </Button>
                <Button
                    onClick = {() => {return navigateTo("device")}}
                    selected={currentPage === "device" ? true : false}
                    darkMode={darkMode}
                    animate={currentPage === "device" ? true : false}
                >
                    Device Configuration
                </Button>
                <Button
                    onClick = {() => {return navigateTo("inputs")}}
                    selected={currentPage === "inputs" ? true : false}
                    darkMode={darkMode}
                    animate={currentPage === "inputs" ? true : false}
                >
                    Inputs
                </Button>
                <Button
                    onClick = {() => {return navigateTo("outputs")}}
                    selected={currentPage === "outputs" ? true : false}
                    darkMode={darkMode}
                    animate={currentPage === "outputs" ? true : false}
                >
                    Outputs
                </Button>
                <Button
                    onClick = {() => {return navigateTo("schedule")}}
                    selected={currentPage === "schedule" ? true : false}
                    darkMode={darkMode}
                    animate={currentPage === "schedule" ? true : false}
                >
                    Schedule
                </Button>
            </Drawer>
        </div>
    );
}
