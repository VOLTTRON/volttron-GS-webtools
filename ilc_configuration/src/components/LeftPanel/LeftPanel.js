import React, { useState, useContext} from 'react';
import { Drawer } from '@material-ui/core';
import { Button, TreeView, TreeItem } from '../../containers/_styledLeftPanel';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {default as history} from '../../history';
import { default as MasterDriverContext } from "../../context/masterDriverContext"
import { default as ClusterContext } from "../../context/clusterContext"
import { CurrentPageContext } from "../../context/currentPageContext";
import { darkModeContext } from "../../context/darkModeContext";

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
    let {configuration, setConfiguration} = useContext(MasterDriverContext);
    let {clusterFocus, setClusterFocus} = useContext(ClusterContext);
    const {currentPage, setPage} = useContext(CurrentPageContext);
    const { darkMode } = useContext(darkModeContext);

    function navigateTo (route) {
        setPage(route);
        let elements = document.getElementsByClassName("Mui-selected");
        for(const el in elements){
          let element = elements[el]
          if(element.classList) {
            element.classList.remove("Mui-selected");
          }
        }
        history.push(`/${route}`)
    }

    const removeCluster = (e, clusterName) => {
      var response = window.confirm("Do you really want to delete cluster: " + clusterName + "?");
      if(response === true){
        let clusterToRemoveIndex = -1;
        let clusterConfig = configuration["config"]["cluster"]
        let config = configuration

        if(clusterFocus === clusterName){
          history.push(`/main`)
        }

        // Remove cluster from main configuration
        for (let x = 0; x < clusterConfig.length; x++ ) {
          if (clusterConfig[x]["cluster_name"] === clusterName) {
              clusterToRemoveIndex = x;
              break;
            }
        }
        clusterConfig.splice(clusterToRemoveIndex, 1)
        config["config"]["cluster"] = clusterConfig

        // Remove cluster from criteria
        let crit = config["criteria"]
        let critKeys = Object.keys(crit)
        for (let critKey in critKeys) {
          if(critKeys[critKey].indexOf(clusterName) !== -1) {
            delete crit[critKeys[critKey]]
          }
        }

        // Remove individual cluster objects (*_pairwise, *_control, *_criteria) from JSON
        let keys = Object.keys(config)
        for (let key in keys) {
          if (keys[key].indexOf(clusterName) !== -1) {
            delete config[keys[key]]
          }
        }

        // Update configuration
        setConfiguration(config)
      }
    }

    const navigateToCluster = (route, clusterName) => {
      setPage(route);
      setClusterFocus(clusterName)
      let status = JSON.parse(localStorage.getItem("ilc-configuration-status"))
      delete status["currentPage"]
      status["clusterFocus"] = clusterName
      localStorage.setItem("ilc-configuration-status", JSON.stringify(status))
      history.push(`/${route}/${clusterName}`)
  }

    const createClusterTree = () =>{
      let nodeId = -3;
      return (
        <div>
          <TreeView
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultExpanded={["1"]}>
            <TreeItem index="1" nodeId="1" label="Device Clusters" darkMode={darkMode}>
              {configuration["config"]["cluster"].map(cluster => {
                nodeId = nodeId + 4;
                return (
                  <TreeItem key={`${nodeId + 1}`} nodeId={`${nodeId + 1}`} label={cluster["cluster_name"]} darkMode={darkMode}>
                    <TreeItem nodeId={`${nodeId + 2}`} label="Pairwise Configuration" onClick={() => {return navigateToCluster("pairwise", cluster["cluster_name"])}} darkMode={darkMode}/>
                    <TreeItem nodeId={`${nodeId + 3}`} label="Criteria Configuration" onClick={() => {return navigateToCluster("criteria", cluster["cluster_name"])}} darkMode={darkMode}/>
                    <TreeItem  nodeId={`${nodeId + 4}`} label="Control Configuration" onClick={() => {return navigateToCluster("control", cluster["cluster_name"])}} darkMode={darkMode}/>
                    <Button style={{"color":"red"}} onClick={e => removeCluster(e, cluster["cluster_name"])} darkMode={darkMode}>Remove Cluster</Button>
                  </TreeItem>
                )
              })}
            </TreeItem>
          </TreeView>
        </div>
      )
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
                  onClick = {() => {return navigateTo("main")}}
                  selected={currentPage === "main" ? true : false}
                  darkMode={darkMode}
              >
                  Main Configuration
                </Button>
                {createClusterTree()}
                <Button
                  color="inherit"
                  onClick = {() => {return navigateTo("addcluster")}}
                  selected={currentPage === "addcluster" ? true : false}
                  darkMode={darkMode}
              >
                  + Add Cluster
                </Button>
                <Button
                  style={{marginLeft: "15px"}}
                  color="inherit"
                  onClick = {() => {return navigateTo("editclusters")}}
                  selected={currentPage === "editclusters" ? true : false}
                  darkMode={darkMode}
              >
                  Edit Clusters
                </Button>
            </Drawer>
        </div>
    );
}
