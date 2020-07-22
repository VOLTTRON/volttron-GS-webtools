import React, { useState, useContext, useEffect } from 'react';
import { InputLabel, NativeSelect, TextField } from '@material-ui/core'
import { FormControl } from '../_styledCriteriaConfigForm';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import {_CRITERIA} from '../../../constants/strings'

export default function Mapper(props) {
    let {devices, configuration, setConfiguration} = useContext(MasterDriverContext);
    let {clusterFocus} = useContext(ClusterContext);
    const [state, setState] = useState({
        stateClusterFocus: clusterFocus
    })
    let {device, setting, criteria } = props;

    useEffect(() => {
        if(clusterFocus !== state.stateClusterFocus){
            setState({
                ...state,
                stateClusterFocus: clusterFocus
            })
        }
    }, [configuration, clusterFocus, props.device, props.setting, props.criteria,
        state])
    
    const clone = (obj) => JSON.parse(JSON.stringify(obj));

    const mapperObj = configuration[`${clusterFocus}${_CRITERIA}`]["mapper"];

    const handleChange = (event) => {
        const name = event.target.name
        updateConfiguration(name, event.target.value)
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const updateConfiguration = (name, value) => {
        let newConfiguration = clone(configuration);
        newConfiguration[`${clusterFocus}${_CRITERIA}`][device][device][setting][criteria][name] = value
        setConfiguration(newConfiguration)
    }

    const createMapKeys = () => {
        const mapKeys = Object.keys(mapperObj).map(mapKey => {
            return(
                <option value={mapKey}>{mapKey}</option>
            )
        })
        return mapKeys;
    }

    const createDistNames = (mapKey) => {
        const distNames = Object.keys(mapperObj[mapKey]).map(distName => {
            return(
                <option value={distName}>{distName}</option>
            )
        })
        return distNames;
    }

    const {map_key, dist_name} = configuration[`${clusterFocus}${_CRITERIA}`][device][device][setting][criteria]
    return (
            <>
                <FormControl >
                    <InputLabel >Map Key</InputLabel>
                    <NativeSelect
                        value={map_key ? map_key : ""} 
                        onChange={handleChange}
                        inputProps={{
                            name: "map_key",
                        }}
                    >
                        <option value=""></option>
                        {createMapKeys()}
                    </NativeSelect>
                </FormControl>
                {map_key ? 
                <>
                <FormControl>
                    <InputLabel >Dist. Name</InputLabel>
                    <NativeSelect
                        value={dist_name ? dist_name : ""} 
                        onChange={handleChange}
                        inputProps={{
                            name: "dist_name",
                        }}
                    >
                        <option value=""></option>
                        {createDistNames(map_key)}
                    </NativeSelect> 
                </FormControl>
                </> : null
                }
            </>
    );
}