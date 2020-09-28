import React, { useState, useContext, useEffect, Fragment} from 'react';
import { TextField } from '@material-ui/core'
import { FormControl } from '../_styledCriteriaConfigForm';
import MasterDriverContext from '../../../context/masterDriverContext';
import { darkModeContext } from "../../../context/darkModeContext";
import ClusterContext from '../../../context/clusterContext';
import {FloatInput} from '../../common/_styledInput'
import {SmallLabel} from '../../common/_styledLabel'
import {_CRITERIA} from '../../../constants/strings'
import { clone } from '../../../utils/clone'

export default function Mapper(props) {
    let {devices, configuration, setConfiguration} = useContext(MasterDriverContext);
    const { darkMode } = useContext(darkModeContext);
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

    const handleFloatChange = (event) => {
        let {device, setting, criteria } = props;
        const name = event.target.name
        const floatValue = parseFloat(event.target.value)
        const newConfiguration= clone(configuration)
        newConfiguration[`${clusterFocus}${_CRITERIA}`][device][device][setting][criteria][name] = floatValue
        setConfiguration(newConfiguration)
    }

    return (
            <Fragment>
                <FormControl >
                    <SmallLabel darkMode={darkMode}>Value</SmallLabel>
                    <FloatInput
                        id="value"
                        name="value"
                        label="Value"
                        type="number"
                        defaultValue= {configuration[`${clusterFocus}${_CRITERIA}`][props.device][props.device][props.setting][props.criteria]["value"]}
                        step= '0.01'
                        onChange={handleFloatChange}
                        darkMode={darkMode}
                    />
                </FormControl>
            </Fragment>
    );
}