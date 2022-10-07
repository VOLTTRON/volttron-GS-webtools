import React, { useState, useContext} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import { InputLabel, FormControl, Select, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {SmallLabel} from '../../common/_styledLabel';
import {FloatInput} from '../../common/_styledInput';
import { darkModeContext } from "../../../context/darkModeContext";
import {_PAIRWISE, _CONTROL, _CRITERIA, PAIRWISE_CRITERIA, DEVICE_CONTROL, DEVICE_CRITERIA, CONFIG} from '../../../constants/strings'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function ClusterSettings(props) {
    const { darkMode } = useContext(darkModeContext);
    let { configuration, setConfiguration } = useContext(MasterDriverContext);
    const [state, setState] = useState({
        cluster_name: props.cluster['cluster_name'],
        oldClusterName: props.cluster['cluster_name'],
        cluster_types: ["RTU", "AHU VAV", "LIGHT"],
        cluster_type: props.cluster['cluster_type'],
        cluster_priority: props.cluster['cluster_priority'],
        oldClusterPriority: props.cluster['cluster_priority']
    })

    const classes = useStyles();

    const clone = (obj) => JSON.parse(JSON.stringify(obj));

    const handleChange = (event) => {
        const name = event.target.name
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const saveCluster = () => {
        // remove old cluster
        const oldClusterName = state.oldClusterName;
        const newClusterName = state.cluster_name
        const newClusterType = state.cluster_type
        const newClusterPriority = parseFloat(state.cluster_priority)
        const oldClusterPriority = parseFloat(state.oldClusterPriority)
        let newConfiguration = clone(configuration)
        let error = false;

        // let totalClusterPriority = 0
        // configuration["config"]["clusters"].forEach(cluster => {
        //     totalClusterPriority += cluster["cluster_priority"]
        // })
        // totalClusterPriority += newClusterPriority;
        // totalClusterPriority -= oldClusterPriority;

        // if (totalClusterPriority !== 1){
        //     totalClusterPriority = Math.floor(100*totalClusterPriority)/100
        //     alert(`Cluster priority total is ${totalClusterPriority}. Sum of cluster priorities must be 1`)
        //     return;
        // }

        newConfiguration["config"]["clusters"].forEach((cluster, index) => {
            if(cluster["cluster_name"] === oldClusterName){

                if (oldClusterName !== newClusterName){
                    if (Object.keys(newConfiguration["criteria"]).includes(newClusterName)){
                        alert("Error: Cluster name in use")
                        error = true;
                        return;
                    }
                    // change cluster name in main config
                    newConfiguration[CONFIG]["clusters"][index][DEVICE_CONTROL] =
                    `config://${newClusterName}${_CONTROL}`
                    newConfiguration[CONFIG]["clusters"][index][DEVICE_CRITERIA] =
                    `config://${newClusterName}${_CRITERIA}`
                    newConfiguration[CONFIG]["clusters"][index][PAIRWISE_CRITERIA] =
                    `config://${newClusterName}${_PAIRWISE}`
                    newConfiguration[CONFIG]["clusters"][index]["cluster_name"] = newClusterName;
                    if (newConfiguration["criteria"]){
                        newConfiguration["criteria"][newClusterName] =
                        Array.from(newConfiguration["criteria"][oldClusterName])
                        delete(newConfiguration["criteria"][oldClusterName])
                    }
                    newConfiguration[`${newClusterName}${_PAIRWISE}`] =
                    clone(newConfiguration[`${oldClusterName}${_PAIRWISE}`])
                    delete(newConfiguration[`${oldClusterName}${_PAIRWISE}`])
                    newConfiguration[`${newClusterName}${_CONTROL}`] =
                    clone(newConfiguration[`${oldClusterName}${_CONTROL}`])
                    delete(newConfiguration[`${oldClusterName}${_CONTROL}`])
                    newConfiguration[`${newClusterName}${_CRITERIA}`] =
                    clone(newConfiguration[`${oldClusterName}${_CRITERIA}`])
                    delete(newConfiguration[`${oldClusterName}${_CRITERIA}`])


                }
                newConfiguration["config"]["clusters"][index]["cluster_type"] = newClusterType;
                newConfiguration["config"]["clusters"][index]["cluster_priority"] = newClusterPriority;
                return;
            }
        })
        if (error){
            return;
        }
        setState({...state,
            oldClusterName: newClusterName,
            cluster_name: newClusterName,
            cluster_type: newClusterType,
            cluster_priority: newClusterPriority,
            oldClusterPriority: newClusterPriority})


        setConfiguration(newConfiguration)
    }

    return(
        <>
            <FormControl className={classes.formControl}>
                <TextField
                    id="clusterNameId"
                    name="cluster_name"
                    label="Cluster Name"
                    value= {state.cluster_name}
                    onChange={handleChange}/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="clusterType">Cluster Type</InputLabel>
                <Select
                    native
                    value= {state.cluster_type}
                    onChange={handleChange}
                    inputProps={{
                        name: 'cluster_type',
                        id: 'clusterTypeInput'
                    }}
                >
                    <option aria-label="None" value="" />
                    {state.cluster_types.map(type => {return <option value={type}>{type}</option>})}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <SmallLabel darkMode={darkMode}>Cluster Priority</SmallLabel>
                <FloatInput
                    id="clusterPriorityInput"
                    name="cluster_priority"
                    label="Cluster Priority"
                    type="number"
                    value= {state.cluster_priority}
                    step= '0.01'
                    min='0'
                    max='1'
                    onChange={handleChange}
                    darkMode={darkMode}
                />
            </FormControl>
            <Button onClick={saveCluster}>Save Cluster</Button>
        </>
    )
}