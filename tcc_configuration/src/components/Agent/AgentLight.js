import React, { useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import { FormControlLabel, TextField, Checkbox, InputLabel, Select, MenuItem } from '@material-ui/core';
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
        if(parameter === "actuation_method") {
            if(val === "periodic") {
                config["control_interval"] = 0;
            } else if(val === "market_clear") {
                delete config["control_interval"]
            }
        }
        config[parameter] = val
        setConfiguration(config)
    }

    const handleCheckChange = (e, parameter) => {
        let config = cloneObj(configuration)
        config[parameter] = e.target.checked
        setConfiguration(config)
    }

    const controlInterval = () => {
        return (
            <FormControl>
                <TextField
                    id={"controlIntervalText"}
                    key={"controlIntervalText"}
                    label="Control Interval (seconds)"
                    defaultValue={configuration["control_interval"]}
                    type="number"
                    inputProps={{"step":"1.0"}}
                    onChange={e => handleChange(e, "control_interval")}
                />
            </FormControl>
        )
    }

    const ActuationMethod = () => {
        return (
            <>
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
            </>
        )
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
                    id={"marketNameText"}
                    key={"marketNameText"}
                    label="Market Name"
                    defaultValue={configuration["market_name"]}
                    type="string"
                    onChange={e => handleChange(e, "market_name")}
                />
            </FormControl>
            <ActuationMethod />
            {configuration["actuation_method"] === "periodic" ? controlInterval() : ""}
        </>
    );
}
