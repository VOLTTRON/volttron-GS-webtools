import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, Brightness6, Brightness7 } from '@material-ui/icons'
import { AppBar } from './_styledAppBar'
import { default as history } from '../../history';
import MasterDriverContext from '../../context/masterDriverContext';
import { CurrentPageContext } from "../../context/currentPageContext";
import ConfigurationTemplate from '../../constants/jsonTemplates/configuration.json'
import OutputFormatTemplate from '../../constants/jsonTemplates/format.json'
import {clone} from '../../utils/clone';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));


export default function NavigationBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {configuration, setConfiguration, darkMode, setDarkMode} = useContext(MasterDriverContext);
  const currentPageContext = useContext(CurrentPageContext);
  const [ currentPage, setCurrentPage ] = currentPageContext.currentPage;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveConfiguration = async () => {
    const fileName = configuration["agent_name"] + ".store"
    let format = {}
    format[fileName] = OutputFormatTemplate
    format[fileName]["data"] = configuration
    const json = JSON.stringify(format);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
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
        localStorage.setItem("tcc-config-master-driver-config", reader.result)
        localStorage.setItem("tcc-configuration-store", JSON.stringify(ConfigurationTemplate))
        localStorage.setItem("tcc-configuration-status", JSON.stringify({"darkMode": darkMode, "currentPage": currentPage}))
        setCurrentPage("campus");
        history.push("/campus");
        window.location.reload();

    };
    reader.onerror = function() {
        console.log(reader.error);
    };

  };

  const handleJSONImportClick = () => {
    const input = document.createElement('input');
    input.type= "file";
    input.onchange = (e) => {
      let reader = new FileReader();
      const file = e.target.files[0];
      reader.readAsText(file);
      reader.onload = () => {
        // todo: validate incoming reader result
        const jsonObject = JSON.parse(reader.result)
        let formattedJsonObject = {}
        debugger;
        // get key for config object
        let configName = Object.keys(jsonObject)[0]
        for (const [key, value] of Object.entries(jsonObject[configName]['data'])) {
          formattedJsonObject[key] = clone(jsonObject[configName]['data'][key]);
        }

        setConfiguration(formattedJsonObject);
        history.push("/main")
        window.location.reload();
      }
    }
    document.body.appendChild(input)
    input.click();
    document.body.removeChild(input)
    setAnchorEl(null);
  }

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
            <MenuItem onClick={handleJSONImportClick}>Import JSON file</MenuItem>
          </Menu>
          <Typography variant="h5">
            TCC Configuration Tool
          </Typography>
          <IconButton
            style={{position: "absolute", right: "30px"}}
            onClick={handleDarkMode}
            color="inherit"
          >
            {darkMode ? <Brightness7/> : <Brightness6/>}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
