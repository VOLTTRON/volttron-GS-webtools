
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
    const [addDist, setAddDist] = useState(false);
    const [newDistName, setNewDistName] = useState("");
    const [newDistValue, setNewDistValue] = useState("");

    const deleteDistName = (mapKeyName, distName) => {
        let newConfiguration = clone(configuration);
        delete newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][mapKeyName][distName]
        setConfiguration(newConfiguration)
    }

    const deleteMapKey = (mapKeyName) => {
        let newConfiguration = clone(configuration);
        delete newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][mapKeyName]
        setConfiguration(newConfiguration)
    }

    const toggleDistName = () => {
        setAddDist(!addDist)
    }

    const addDistName = (mapKeyName) => {
        let newConfiguration = clone(configuration);
        newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][mapKeyName][newDistName] = newDistValue ;
        toggleDistName();
        setConfiguration(newConfiguration);
    }

    const createMapKey = () => {
        let mapper = configuration[`${clusterFocus}${_CRITERIA}`][MAPPER];
        let mapKeys = [];
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
                    <Label darkMode={darkMode} style={{marginTop : "1rem"}}>Dist Names</Label>
                    <ul style={ulStyle}>
                    {Object.keys(mapKeyObj).map((distName, index) => {
                        return(
                            <li key={index}>
                                <Chip
                                    label={`${distName} : ${mapKeyObj[distName]}`}
                                    onDelete={() => deleteDistName(mapKeyName, distName)}
                                />
                            </li>
                        )
                    })}
                    </ul>
                    <FormControl>
                        <TextField
                            id="distNameInput"
                            name="dist_name"
                            label="Dist Name"
                            onChange={(event) => setNewDistName(event.target.value)}
                            style={{display: addDist ? null : "none"}}/>
                        <TextField
                            id="distValueInput"
                            name="dist_value"
                            label="Dist Value"
                            onChange={(event) => setNewDistValue(event.target.value)}
                        style={{display: addDist ? null : "none"}}/>
                    </FormControl>
                    <PrimaryButton style={{display: addDist ? "none" : null}} onClick={toggleDistName}>Add Dist Name</PrimaryButton>
                    <PrimaryButton style={{display: addDist ? null : "none"}} onClick={e => addDistName(mapKeyName)}>Save New Dist</PrimaryButton>
                    <PrimaryButton style={{display: addDist ? null : "none"}} onClick={toggleDistName}>Cancel</PrimaryButton>
                </TreeItem>
            </TreeView>
        )
    }
    return( createMapKey() );
}