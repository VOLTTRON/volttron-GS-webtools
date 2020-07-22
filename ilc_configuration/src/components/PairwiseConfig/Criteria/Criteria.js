import React, { useState, useContext} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext'
import Grid from '@material-ui/core/Grid';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend'
import { default as CriteriaListHelper } from './CriteriaListHelper'
import { TreeView, TreeItem } from './_styledCriteria';
import { PrimaryButton } from '../../common/_styledButton'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {FormControl} from '../../common/_styledFormControl'
import { TextField } from '@material-ui/core'
import { createPairwiseConfiguration } from '../../../utils/createPairwiseConfig'
import { darkModeContext } from "../../../context/darkModeContext";
import {_PAIRWISE} from '../../../constants/strings'

export default function Criteria(props) {
  const { darkMode } = useContext(darkModeContext);
  let {configuration, setConfiguration} = useContext(MasterDriverContext);
  let { clusterFocus } = useContext(ClusterContext);
  const [state, setState] = useState({
    addCriteriaName: false,
    criteriaName: ""
  })

  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  const addCriteria = () => {
    if (state.criteriaName === ""){
      alert("Enter a criteria name")
      return;
    }
    let newConfiguration = clone(configuration)
    // look to make sure name isn't a duplicate
    for (let index in newConfiguration["criteria"][clusterFocus]){
      if(newConfiguration["criteria"][clusterFocus][index]["text"] === state.criteriaName){
        alert(`Criteria name "${state.criteriaName}" already in use.`)
        return;
      }
    }
    // set id of criteria from the current time to prevent duplicate id's
    let date = new Date();
    const time = date.getTime();

    newConfiguration["criteria"][clusterFocus].push({
      id: JSON.stringify(time),
      text: state.criteriaName
    })
    newConfiguration[`${clusterFocus}${_PAIRWISE}`]["curtail"][state.criteriaName] = {}
    if (newConfiguration[`${clusterFocus}${_PAIRWISE}`]["augment"]){
      newConfiguration[`${clusterFocus}${_PAIRWISE}`]["augment"][state.criteriaName] = {}
    }
    newConfiguration = createPairwiseConfiguration(newConfiguration, clusterFocus);
    // update criteria configuration

    setConfiguration(newConfiguration)
    setState({...state, addCriteriaName: false, criteriaName: ""})
  }

  const toggleAddCriteriaText = () => {
    setState({...state, addCriteriaName: !state.addCriteriaName})
  }

  const handleCriteriaNameChange = (event) => {
    setState({...state, criteriaName: event.target.value})
  }

  return (
      <DndProvider backend={Backend}>
        <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon/>}
        defaultExpandIcon={<ArrowRightIcon/>}
        defaultExpanded={["1"]}>
          <TreeItem nodeId="1" label={`Criteria for ${clusterFocus}`} darkMode={darkMode}>
              <CriteriaListHelper/>
              <FormControl>
                <TextField
                    style={{display: `${state.addCriteriaName ? "inherit" : "none"}`}}
                    id="newCriteriaNameInput"
                    name="new_criteria_name"
                    label="New Criteria Name"
                    value={state.criteriaName}
                    onChange={handleCriteriaNameChange}/>
              </FormControl>
              <PrimaryButton
                onClick={state.addCriteriaName ? addCriteria : toggleAddCriteriaText}
                style={state.addCriteriaName ? {} : {marginTop : "-1rem"}}>
                {state.addCriteriaName ? "Confirm" : "+ Add Criteria"}
              </PrimaryButton>
              <PrimaryButton
                onClick={toggleAddCriteriaText}
                style={state.addCriteriaName ? {} : {display : "none"}}>
                Cancel
              </PrimaryButton>
          </TreeItem>
        </TreeView>
      </DndProvider>
  );
}