import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { AppBar } from './_styledAppBar'
import { default as MenuIcon } from '@material-ui/icons/Menu'
import {default as history} from '../../history';
import MasterDriverContext from '../../context/masterDriverContext';
import configurationTemplate from '../../constants/jsonTemplates/configuration.json'
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { darkModeContext } from "../../context/darkModeContext";
import formatConfiguration  from "../../utils/formatConfiguration"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function NavigationBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {configuration, rerender, setRerender} = useContext(MasterDriverContext);
  const { darkMode, setDarkMode } = useContext(darkModeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveConfiguration = async () => {
    const fileName = "file";
    const json = formatConfiguration(configuration);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAnchorEl(null);
  }

  const handleMasterDriverClick = () => {
    const input = document.createElement('input');
    input.type= "file";
    input.onchange = handleMasterDriverUpload
    document.body.appendChild(input)
    input.click();
    document.body.removeChild(input)
    setAnchorEl(null);
  }

  const handleMasterDriverUpload = event => {
    let reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsText(file);
    reader.onload = () => {
        localStorage.setItem("ilc-config-master-driver-config", reader.result)
        localStorage.setItem("ilc-configuration-store", JSON.stringify(configurationTemplate))
        localStorage.setItem("ilc-configuration-status", JSON.stringify({"clusterFocus": "", "darkMode": "", "currentPage": ""}))
        history.push("/main")
        window.location.reload();

    };
    reader.onerror = function() {
        console.log(reader.error);
    };

  };

  const handleDarkMode = () => {
    let mode = !darkMode;
    setDarkMode(mode);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick = {handleClick}/>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSaveConfiguration}>Save Configuration</MenuItem>
            <MenuItem onClick={handleMasterDriverClick}>Import New Master Driver Configuration Store</MenuItem>
          </Menu>
          <Typography variant="h5">
            ILC Configuration Tool
          </Typography>
          <IconButton
            style={{position: "absolute", right: "30px"}}
            onClick={handleDarkMode}
            color="inherit"
          >
            {darkMode ? <Brightness7Icon/> : <Brightness6Icon/>}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
