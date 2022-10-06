import React, { useState, useContext} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import { FormControl, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {SmallLabel} from '../../common/_styledLabel'
import {FloatInput} from '../../common/_styledInput'
import { darkModeContext } from "../../../context/darkModeContext";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function ClusterPriority (props) {
    const { darkMode } = useContext(darkModeContext);
    let { configuration, setConfiguration } = useContext(MasterDriverContext);
    let { clusterFocus, setClusterFocus} = useContext(ClusterContext);
    const [state, setState] = useState({
        cluster_name: props.cluster['cluster_name'],
        cluster_priority: props.cluster['cluster_priority']
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

    const updatePriority = () => {
        let newConfiguration = clone(configuration);
        newConfiguration["config"]["clusters"][props.index]["cluster_priority"] = parseFloat(state.cluster_priority)
        setConfiguration(newConfiguration)

    }

    return(
        <>
        <FormControl className={classes.formControl}>
            <SmallLabel darkMode={darkMode}>{`Cluster Priority (${props.cluster["cluster_name"]})`}</SmallLabel>
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
        <Button onClick={updatePriority}>Save New Priority</Button>
        </>
    )
}

