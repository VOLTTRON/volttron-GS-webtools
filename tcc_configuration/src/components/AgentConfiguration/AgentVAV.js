import React, { useContext } from 'react';
import { FormControl } from '../common/_styledFormControl';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import AgentLight from './AgentLight';
import { cloneObj } from '../common/utility';

import { default as MasterDriverContext } from "../../context/masterDriverContext"


export default function AgentVAV(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);

    const handleChange = (e, parameter) => {
        let config = cloneObj(configuration)
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        config[parameter] = val
        setConfiguration(config)
    }

    const ActuationMethod = () => {
        return (
            <FormControl>
                <InputLabel id={"actuationMethodLabel"}>Actuation Method</InputLabel>
                <Select
                    labelId={"actuationMethodLabel"}
                    id={"actuationMethodSelect"}
                    value={configuration["actuation_method"]}
                    onChange={e => handleChange(e, "actuation_method")}
                >
                    <MenuItem value={"periodic"}>{"Periodic"}</MenuItem>
                    <MenuItem value={"market_clear"}>{"Market Clear"}</MenuItem>
                </Select>
            </FormControl>
        )
    }

    return (
        <>
            <AgentLight />
            <ActuationMethod />
        </>
    );
}
