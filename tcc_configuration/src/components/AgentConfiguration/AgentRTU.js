
import React, { useContext } from 'react';
import { FormControl } from '../common/_styledFormControl';
import { FormControlLabel, Checkbox, TextField, Grid } from '@material-ui/core';
import { cloneObj } from '../common/utility';

import { default as MasterDriverContext } from "../../context/masterDriverContext"

export default function AgentRTU(props) {
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
            <Grid container>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={configuration["tns"]}
                                onChange={e => handleCheckChange(e, "tns")}
                                color="primary"
                            />
                        }
                        class={darkMode ? "darkLabel" : ""}
                        label="TNS"
                    />
                </Grid>
            </Grid>
            <FormControl>
                <TextField
                    id="controlIntervalText"
                    key="controlIntervalText"
                    label="Control Interval"
                    defaultValue={configuration["control_interval"]}
                    type="number"
                    inputProps={{"step":"1.0"}}
                    onChange={e => handleChange(e, "control_interval")}
                />
            </FormControl>

        </>
    );
}
