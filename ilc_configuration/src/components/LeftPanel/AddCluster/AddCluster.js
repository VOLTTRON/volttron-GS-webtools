import React, { useState, useContext} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import { InputLabel, FormControl, Select, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {default as history} from '../../../history';
import pairwiseAHUTemplate from '../../../constants/jsonTemplates/pairwiseAHUDefaults.json'
import pairwiseLightingTemplate from '../../../constants/jsonTemplates/pairwiseLightingDefaults.json'
import pairwiseRTUTemplate from '../../../constants/jsonTemplates/pairwiseRTUDefaults.json'
import pairwiseOtherTemplate from '../../../constants/jsonTemplates/pairwiseOtherDefaults.json'
import mapperTemplate from '../../../constants/jsonTemplates/mappers.json'
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

  const AHU_VAV = "AHU VAV"

export default function AddCluster(props) {
    const { darkMode } = useContext(darkModeContext);
    const { configuration, setConfiguration } = useContext(MasterDriverContext);
    let { clusterFocus, setClusterFocus } = useContext(ClusterContext);
    const [state, setState] = useState({
        cluster_name: `cluster_${configuration["config"]["clusters"].length + 1}`,
        cluster_types: [AHU_VAV, "LIGHT", "RTU"],
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

    const setCurtailAndCriteriaBasedOnType = (type, config, name) => {
        let criteria = null;
        let curtail = null;
        if(type === AHU_VAV) {
            curtail = parseCurtail(pairwiseAHUTemplate);
            criteria = parseCriteria(pairwiseAHUTemplate);
        } else if (type === "LIGHT") {
            curtail = parseCurtail(pairwiseLightingTemplate);
            criteria = parseCriteria(pairwiseLightingTemplate);
        } else if (type === "RTU") {
            curtail = parseCurtail(pairwiseRTUTemplate);
            criteria = parseCriteria(pairwiseRTUTemplate);
        } else if (type === "OTHER") {
            curtail = parseCurtail(pairwiseOtherTemplate);
            criteria = [];
        }
        config[`${name}${_PAIRWISE}`]["curtail"] = curtail;
        config["criteria"][name] = criteria;

        return config;
    }

    const parseCriteria = (criteria) => {
        let json = JSON.parse(JSON.stringify(criteria));
        var sorted = [];
        for (var def in json) {
            sorted.push({'text': def, 'id': Object.keys(json[def]).length});
        }
        sorted.sort(function(a, b) {return b['id'] - a['id']});

        return sorted;
    }

    const parseCurtail = (curtail) => {
        var sortedArray = [];
        var sortedObject = {};
        for (var def in curtail) {
            sortedArray.push({
                'name': def,
                'id': Object.keys(curtail[def]).length,
                'data': curtail[def]
            });
        }
        sortedArray.sort(function(a, b) {return b['id'] - a['id']});
        for (var x = 0; x < sortedArray.length; x++) {
            sortedObject[sortedArray[x]['name']] = sortedArray[x]['data'];
        }

        return sortedObject;
    }

    const addCluster = () => {
        const {cluster_name, cluster_type, cluster_priority} = state;
        // check total cluster priority == 1
        let totalClusterPriority = 0
        let newConfiguration = clone(configuration);
        newConfiguration["config"]["clusters"].forEach(cluster => {
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
        for(let index in newConfiguration["config"]["clusters"]){
            if (newConfiguration["config"]["clusters"][index]["cluster_name"] == cluster_name){
                alert("Cluster name in use, enter a new name")
                return
            }
        }
        newConfiguration["config"]["clusters"].push(newCluster);
        newConfiguration[`${cluster_name}${_PAIRWISE}`] = {}

        // set curtail and criteria based on cluster type
        newConfiguration = setCurtailAndCriteriaBasedOnType(cluster_type, newConfiguration, cluster_name);

        newConfiguration[`${cluster_name}${_CONTROL}`] = {};
        let mappers = clone(mapperTemplate)
        newConfiguration[`${cluster_name}${_CRITERIA}`] = {mappers: mappers};

        setConfiguration(newConfiguration)
        history.push(`/pairwise/${cluster_name}`)
    }


    const makeClusterPriorityComparisons = () => {
        let clusterPriorities = []
        if (configuration["config"]["clusters"].length){
            clusterPriorities.push(<SmallHeader darkMode={darkMode}>Existing Cluster Priorities</SmallHeader>)
            configuration["config"]["clusters"].forEach((cluster, index) => {
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
                    {state.cluster_types.map(type => {return <option value={type}>{type}</option>})}
                    <option aria-label="OTHER" value="OTHER">OTHER</option>
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