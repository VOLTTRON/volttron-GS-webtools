import React, { useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import {FormControlLabel, TextField, Checkbox } from '@material-ui/core';
import { cloneObj } from '../common/utility';

import { default as MasterDriverContext } from "../../context/masterDriverContext"


export default function AgentLight(props) {
    const {configuration, setConfiguration, darkMode} = useContext(MasterDriverContext);

    const handleChange = (e, parameter) => {
        let config = cloneObj(configuration)
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        config[parameter] = val
        setConfiguration(config)
    }

    const handleCheckChange = (e, parameter) => {
        let config = cloneObj(configuration)
        config[parameter] = e.target.checked
        setConfiguration(config)
    }

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={configuration["actuation_enabled_onstart"]}
                        onChange={e => handleCheckChange(e, "actuation_enabled_onstart")}
                        color="primary"
                    />
                }
                class={darkMode ? "darkLabel" : ""}
                label="Enable Actuation On Start"
            />
            <FormControl>
                <TextField
                    id={"controlIntervalText"}
                    key={"controlIntervalText"}
                    label="Control Interval"
                    defaultValue={configuration["control_interval"]}
                    type="number"
                    onChange={e => handleChange(e, "control_interval")}
                />
            </FormControl>
            <FormControl>
                <TextField
                    id={"marketNameText"}
                    key={"marketNameText"}
                    label="Market Name"
                    defaultValue={configuration["market_name"]}
                    type="string"
                    onChange={e => handleChange(e, "market_name")}
                />
            </FormControl>
        </>
    );
}
