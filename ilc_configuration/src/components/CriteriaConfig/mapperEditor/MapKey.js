
import React, {useContext, useState} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import { darkModeContext } from "../../../context/darkModeContext";
import { Chip } from '../../common/_styledChip';
import {TreeView, TreeItem} from '../../common/_styledTree';
import { FormControl } from '../../common/_styledFormControl';
import {_CRITERIA, MAPPER} from '../../../constants/strings';
import { TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { PrimaryButton, LowkeyDeleteButton } from '../../common/_styledButton'
import { Label } from '../../common/_styledLabel'
import { clone } from '../../../utils/clone';

export default function MapKey (props){
    const { configuration, setConfiguration} = useContext(MasterDriverContext);
    const {clusterFocus} = useContext(ClusterContext)
    const { darkMode } = useContext(darkModeContext);
    const [addDict, setAddDict] = useState(false);
    const [newDictName, setNewDictName] = useState("");
    const [newDictValue, setNewDictValue] = useState("");

    const deleteDictName = (mapKeyName, dictName) => {
        let newConfiguration = clone(configuration);
        delete newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][mapKeyName][dictName]
        setConfiguration(newConfiguration)
    }

    const deleteMapKey = (mapKeyName) => {
        let newConfiguration = clone(configuration);
        delete newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][mapKeyName]
        setConfiguration(newConfiguration)
    }

    const toggleDictName = () => {
        setAddDict(!addDict)
    }

    const addDictName = (mapKeyName) => {
        let newConfiguration = clone(configuration);
        const floatVal = parseFloat(newDictValue);
        if(!isNaN(floatVal)){
            newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][mapKeyName][newDictName] = floatVal;
        } else {
            newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][mapKeyName][newDictName] = newDictValue ;
        }
        toggleDictName();
        setConfiguration(newConfiguration);
    }

    const createMapKey = () => {
        const ulStyle = {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: '0.5rem',
            margin: 0,
          }
        const {mapKeyName, mapKeyObj} = props;
        return(
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}>
                <TreeItem 
                    nodeId={mapKeyName}
                    label={`${mapKeyName}`}
                    darkMode={darkMode}>
                         <LowkeyDeleteButton style={{marginTop: ".5rem", display: "block"}} onClick={() => deleteMapKey(mapKeyName)}>Remove Map Key</LowkeyDeleteButton>
                    <Label darkMode={darkMode} style={{marginTop : "1rem"}}>Dict Names</Label>
                    <ul style={ulStyle}>
                    {Object.keys(mapKeyObj).map((dictName, index) => {
                        return(
                            <li key={index}>
                                <Chip
                                    label={`${dictName} : ${mapKeyObj[dictName]}`}
                                    onDelete={() => deleteDictName(mapKeyName, dictName)}
                                />
                            </li>
                        )
                    })}
                    </ul>
                    <FormControl>
                        <TextField
                            id="dictNameInput"
                            name="dict_name"
                            label="Dict Name"
                            onChange={(event) => setNewDictName(event.target.value)}
                            style={{display: addDict ? null : "none"}}/>
                        <TextField
                            id="dictValueInput"
                            name="dict_value"
                            label="Dict Value"
                            onChange={(event) => setNewDictValue(event.target.value)}
                        style={{display: addDict ? null : "none"}}/>
                    </FormControl>
                    <PrimaryButton style={{display: addDict ? "none" : null}} onClick={toggleDictName}>Add Dict Name</PrimaryButton>
                    <PrimaryButton style={{display: addDict ? null : "none"}} onClick={e => addDictName(mapKeyName)}>Save New Dict</PrimaryButton>
                    <PrimaryButton style={{display: addDict ? null : "none"}} onClick={toggleDictName}>Cancel</PrimaryButton>
                </TreeItem>
            </TreeView>
        )
    }
    return( createMapKey() );
}