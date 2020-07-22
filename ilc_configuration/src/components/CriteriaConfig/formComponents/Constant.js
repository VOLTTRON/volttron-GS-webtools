import React, { useState, useContext, useEffect, Fragment} from 'react';
import { TextField } from '@material-ui/core'
import { FormControl } from '../_styledCriteriaConfigForm';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext';
import {FloatInputGray as FloatInput} from '../../common/_styledInput'
import {SmallLabel} from '../../common/_styledLabel'
import {_CRITERIA} from '../../../constants/strings'

export default function Mapper(props) {
    let {devices, configuration, setConfiguration} = useContext(MasterDriverContext);
    let {clusterFocus} = useContext(ClusterContext);
    const [state, setState] = useState({
        stateClusterFocus: clusterFocus
    })

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

    const handleChange = (event) => {
        const name = event.target.name
        updateConfiguration(name, parseFloat(event.target.value))
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const updateConfiguration = (name, value) => {
        let newConfiguration = clone(configuration);
        let {device, setting, criteria } = props;
        newConfiguration[`${clusterFocus}${_CRITERIA}`][device][device][setting][criteria][name] = value
        setConfiguration(newConfiguration)
    }

    const {value} = configuration[`${clusterFocus}${_CRITERIA}`][props.device][props.device][props.setting][props.criteria]

    return (
            <Fragment>
                <FormControl >
                    <SmallLabel>Value</SmallLabel>
                    <FloatInput
                        id={`value`}
                        name="value"
                        label="Value"
                        type="number"
                        value= {value ? value : ""}
                        step= '0.01'
                        onChange={handleChange}/>
                </FormControl>
            </Fragment>
    );
}