
import React, {useContext, useState} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import { darkModeContext } from "../../../context/darkModeContext";
import {TreeView, TreeItem} from '../../common/_styledTree';
import {FormControl} from '../../common/_styledFormControl';
import {_CRITERIA, MAPPER} from '../../../constants/strings';
import { TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import { PrimaryButton } from '../../common/_styledButton'
import { clone } from '../../../utils/clone';
import MapKey from './MapKey';

export default function MapperEditor (props){
    const { configuration, setConfiguration} = useContext(MasterDriverContext);
    const {clusterFocus} = useContext(ClusterContext)
    const { darkMode } = useContext(darkModeContext);
    const [addMap, setAddMap] = useState(false);
    const [newMapKey, setNewMapKey] = useState("");

    const toggleMapKey = () => {
        setAddMap(!addMap)
    }

    const addMapKey = () => {
        let newConfiguration = clone(configuration);
        if (newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][newMapKey]){
            alert("Map Key name in use");
            return;
        }
        newConfiguration[`${clusterFocus}${_CRITERIA}`][MAPPER][newMapKey] = {};
        toggleMapKey();
        setConfiguration(newConfiguration);
    }

    const createMapKeys = () => {
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
        for (const [mapKeyName, mapKeyObj] of Object.entries(mapper)){
            mapKeys.push(<MapKey mapKeyObj = {mapKeyObj} mapKeyName={mapKeyName}/>)
        }
        return mapKeys;
    }

    return(

        <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}>
            <TreeItem
                nodeId={`map_key`}
                label={"Mapper Editor"}
                darkMode={darkMode}>
                {createMapKeys()}
                <FormControl>
                    <TextField
                        id="mapKeyInput"
                        name="map_key"
                        label="Map Key"
                        onChange={(event) => setNewMapKey(event.target.value)}
                        style={{display: addMap ? null : "none"}}/>
                </FormControl>
                <PrimaryButton style={{marginTop: "1rem", display: addMap ? "none" : null }} onClick={toggleMapKey}>Add Map Key</PrimaryButton>
                <PrimaryButton style={{marginTop: "1rem", display: addMap ? null : "none" }} onClick={addMapKey}>Save Map Key</PrimaryButton>
                <PrimaryButton style={{marginTop: "1rem", display: addMap ? null : "none" }} onClick={toggleMapKey}>Cancel</PrimaryButton>
            </TreeItem>
        </TreeView>
    );
}