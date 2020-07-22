import React, { useState, useContext, useEffect} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext'
import { TreeView, TreeItem, Slider } from './_styledCurtail';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { marks } from '../../../constants/pairwiseMarks'
import Grid from '@material-ui/core/Grid';
import { darkModeContext } from "../../../context/darkModeContext";
import {_PAIRWISE} from '../../../constants/strings'


export default function Curtail(props) {
  const { darkMode } = useContext(darkModeContext);
  let {configuration, setConfiguration} = useContext(MasterDriverContext);
  let {criteria} = useContext(ClusterContext);
  let {clusterFocus} = useContext(ClusterContext);

  const updatePairwiseValues = (event, value, parentCriteriaName, criteriaName) => {
    if (value < 0){
      value = -(1/value);
    }
    configuration[`${clusterFocus}${_PAIRWISE}`][props.name][parentCriteriaName][criteriaName] = value;
    setConfiguration(configuration);
  }

  const createCriteriaSliders = (parentCriteriaName, criteriaObj) => {
    let sliders = []
    for ( let [key, value] of Object.entries(criteriaObj)){
        sliders.push(
            <div>
                <Grid container xs={12}>
                  <Grid item xs={2}>Less</Grid>
                  <Grid item xs={8}>{key}</Grid>
                  <Grid item xs={2}>More</Grid>
                </Grid>
                <Slider
                    value={value < 1 && value != 0 ? -1/value : value }
                    min={-10}
                    max={10}
                    step={null}
                    marks={marks}
                    scale={(x) => x < 0 ? (x*-1) : x}
                    aria-labelledby={clusterFocus}
                    valueLabelDisplay="auto"
                    color="primary"
                    onChange={(event, value) => updatePairwiseValues(event, value, parentCriteriaName, key)}
                />
            </div>
        )
    }
    return sliders
}

  const createCurtailDropdowns = () => {
    let index = 1
    let treeItems = []
    if (configuration[`${clusterFocus}${_PAIRWISE}`][props.name]) {
      for ( let [key, value] of Object.entries(configuration[`${clusterFocus}${_PAIRWISE}`][props.name])){
          treeItems.push(
              <TreeItem nodeId={`${clusterFocus}${index + 1}`} label={key} darkMode={darkMode}>
                  {createCriteriaSliders(key, value)}
              </TreeItem>
          )
          index ++;
      }
    }
    return treeItems
  }

  return (
    <TreeView
    defaultCollapseIcon={<ArrowDropDownIcon/>}
    defaultExpandIcon={<ArrowRightIcon/>}
    defaultExpanded={[clusterFocus]}>
      {configuration[`${clusterFocus}${_PAIRWISE}`][props.name] ?
        <TreeItem nodeId={clusterFocus} label={`${props.name} for ${clusterFocus}`} darkMode={darkMode}>
          {createCurtailDropdowns()}
        </TreeItem>
        : ""
      }
    </TreeView>
  );
}