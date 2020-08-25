import React, { useState, useContext} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import { InputLabel, FormControl, Select, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {default as history} from '../../../history';
import pairwiseTemplate from '../../../constants/jsonTemplates/pairwiseCurtail.json'
import mapperTemplate from '../../../constants/jsonTemplates/mapper.json'
import {SmallLabel} from '../../common/_styledLabel';
import {FloatInput} from '../../common/_styledInput'
import {SmallHeader} from '../../common/_styledHeader'
import ClusterPriority from './ClusterPriority'
import { clone } from '../../../utils/clone'
import { darkModeContext } from "../../../context/darkModeContext";
import {_CRITERIA, _CONTROL, _PAIRWISE, DEVICE_CRITERIA, DEVICE_CONTROL, PAIRWISE_CRITERIA} from "../../../constants/strings"

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function AddCluster(props) {
    const { darkMode } = useContext(darkModeContext);
    const { configuration, setConfiguration } = useContext(MasterDriverContext);
    let { clusterFocus, setClusterFocus } = useContext(ClusterContext);
    const [state, setState] = useState({
        cluster_name: `cluster_${configuration["config"]["cluster"].length + 1}`,
        cluster_types: ["RTU", "AHU", "LIGHT"],
        cluster_type: "RTU",
        cluster_priority: 1
    })
    const classes = useStyles();
    const handleChange = (event) => {
        const name = event.target.name
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const addCluster = () => {
        const {cluster_name, cluster_type, cluster_priority} = state;
        // check total cluster priority == 1
        let totalClusterPriority = 0
        let newConfiguration = clone(configuration);
        newConfiguration["config"]["cluster"].forEach(cluster => {
            totalClusterPriority += cluster["cluster_priority"]
        })
        totalClusterPriority += parseFloat(cluster_priority)
        if (totalClusterPriority !== 1){
            totalClusterPriority = Math.floor(100*totalClusterPriority)/100
            alert(`Cluster priority total is ${totalClusterPriority}. Sum of cluster priorities must be 1`)
            return;
        }
        localStorage.setItem("ilc-configuration-status", JSON.stringify({"clusterFocus": cluster_name}))
        setClusterFocus(cluster_name)
        let newCluster = {
            "cluster_name": cluster_name,
            "cluster_type": cluster_type,
            "cluster_priority": parseFloat(cluster_priority),
            [DEVICE_CONTROL]: `config://${cluster_name}${_CONTROL}`,
            [DEVICE_CRITERIA]: `config://${cluster_name}${_CRITERIA}`,
            [PAIRWISE_CRITERIA]: `config://${cluster_name}${_PAIRWISE}`
        }
        for(let index in newConfiguration["config"]["cluster"]){
            if (newConfiguration["config"]["cluster"][index]["cluster_name"] == cluster_name){
                alert("Cluster name in use, enter a new name")
                return
            }
        }
        newConfiguration["config"]["cluster"].push(newCluster);
        newConfiguration[`${cluster_name}${_PAIRWISE}`] = {}
        newConfiguration[`${cluster_name}${_PAIRWISE}`]["curtail"] = JSON.parse(JSON.stringify(pairwiseTemplate))
        newConfiguration[`${cluster_name}${_CONTROL}`] = {};
        let mapper = clone(mapperTemplate)
        newConfiguration[`${cluster_name}${_CRITERIA}`] = {mapper: mapper};
        newConfiguration["criteria"][cluster_name] = [{
            id: 1,
            text: "zonetemperature_setpoint"
        },{
            id: 2,
            text: "stage"
        },{
            id: 3,
            text: "history_zonetemperature"
        },{
            id: 4,
            text: "rated_power"
        },{
            id: 5,
            text: "room_type"
        }]

        setConfiguration(newConfiguration)
        history.push(`/pairwise/${cluster_name}`)
    }


    const makeClusterPriorityComparisons = () => {
        let clusterPriorities = []
        if (configuration["config"]["cluster"].length){
            clusterPriorities.push(<SmallHeader darkMode={darkMode}>Existing Cluster Priorities</SmallHeader>)
            configuration["config"]["cluster"].forEach((cluster, index) => {
                clusterPriorities.push(
                    <ClusterPriority cluster={cluster} index={index}/>
                )
            })
        }
        return clusterPriorities
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <TextField
                    id="clusterNameId"
                    name="cluster_name"
                    label="Cluster Name"
                    defaultValue= {state.cluster_name}
                    onChange={handleChange}/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="clusterType">Cluster Type</InputLabel>
                <Select
                    native
                    value={state.cluster_type}
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
            <Button onClick={addCluster}>Save New Cluster</Button>
            {makeClusterPriorityComparisons()}
        </div>
    );
}