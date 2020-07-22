import React, { useState, useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import { TextField, Checkbox, Grid, FormControlLabel, InputLabel, Select, MenuItem } from '@material-ui/core';
import { cloneObj, ModedFormHeader } from '../common/utility';

import { default as MasterDriverContext } from "../../context/masterDriverContext"

export default function AHUConfiguration(props) {
    const {configuration, setConfiguration, darkMode} = useContext(MasterDriverContext);
    const [modelParams, setModelParams] = useState(configuration["model_parameters"]);

    const handleChange = (e, param, key) => {
        let parameters = cloneObj(modelParams[key])
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        parameters[param] = val
        let p = cloneObj(modelParams)
        p[key] = parameters
        setModelParams(p)
        let config = cloneObj(configuration)
        config["model_parameters"][key] = parameters
        setConfiguration(config)
    }

    const handleCheckChange = (e, param) => {
        let parameters = cloneObj(modelParams["equipment_configuration"])
        parameters[param] = e.target.checked
        let p = cloneObj(modelParams)
        p["equipment_configuration"] = parameters
        setModelParams(p)
        let config = cloneObj(configuration)
        config["model_parameters"]["equipment_configuration"] = parameters
        setConfiguration(config)
    }

    const handleModelTypeChange = (e, param) => {
        let parameters = cloneObj(modelParams)
        parameters[param] = e.target.value
        setModelParams(parameters)
        let config = cloneObj(configuration)
        config["model_parameters"] = parameters
        setConfiguration(config)
    }

    const EquipmentConfig = () => {
        return (
            <>
                {ModedFormHeader("Equipment Configuration ", "small")}
                <Grid container>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={modelParams["equipment_configuration"]["has_economizer"]}
                                    onChange={e => handleCheckChange(e, "has_economizer")}
                                    color="primary"
                                    />
                                }
                            class={darkMode ? "darkLabel" : ""}
                            label="Has an economizer"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={modelParams["equipment_configuration"]["building_chiller"]}
                                    onChange={e => handleCheckChange(e, "building_chiller")}
                                    color="primary"
                                />
                            }
                            class={darkMode ? "darkLabel" : ""}
                            label="Building Chiller"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={modelParams["equipment_configuration"]["variable_volume"]}
                                    onChange={e => handleCheckChange(e, "variable_volume")}
                                    color="primary"
                                />
                            }
                            class={darkMode ? "darkLabel" : ""}
                            label="Variable Volume"
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"economizerLimitText"}
                                key={"economizerLimitText"}
                                label="Economizer Limit"
                                defaultValue={modelParams["equipment_configuration"]["economizer_limit"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "economizer_limit", "equipment_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"supplyAirText"}
                                key={"supplyAirText"}
                                label="Supply Air Set Point"
                                defaultValue={modelParams["equipment_configuration"]["supply_air_setpoint"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "supply_air_setpoint", "equipment_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"nominalZoneText"}
                                key={"nominalZoneText"}
                                label="Nominal Zone Set Point"
                                defaultValue={modelParams["equipment_configuration"]["nominal_zone_setpoint"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "nominal_zone_setpoint", "equipment_configuration")}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </>
        )
    }

    const ModelConfig = () => {
        return (
            <>
                {ModedFormHeader("Model Configuration ", "small")}
                <Grid container>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"cpAirText"}
                                key={"cpAirText"}
                                label="cpAir"
                                defaultValue={modelParams["model_configuration"]["cpAir"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "cpAir", "model_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"copText"}
                                key={"copText"}
                                label="COP"
                                defaultValue={modelParams["model_configuration"]["COP"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "COP", "model_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"mDotAirText"}
                                key={"mDotAirText"}
                                label="mDotAir"
                                defaultValue={modelParams["model_configuration"]["mDotAir"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "mDotAir", "model_configuration")}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}/>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"c0Text"}
                                key={"c0Text"}
                                label="c0"
                                defaultValue={modelParams["model_configuration"]["c0"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "c0", "model_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"c1Text"}
                                key={"c1Text"}
                                label="c1"
                                defaultValue={modelParams["model_configuration"]["c1"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "c1", "model_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
                <Grid container>
                    <Grid item xs={2}/>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"c2Text"}
                                key={"c2Text"}
                                label="c2"
                                defaultValue={modelParams["model_configuration"]["c2"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "c2", "model_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                id={"c3Text"}
                                key={"c3Text"}
                                label="c3"
                                defaultValue={modelParams["model_configuration"]["c3"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, "c3", "model_configuration")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
            </>
        )
    }


    return (
        <>
            <FormControl>
                <InputLabel id={"modelTypeLabel"}>Model Type</InputLabel>
                <Select
                    labelId={"modelTypeLabel"}
                    id={"modelTypeSelect"}
                    value={modelParams["model_type"]}
                    onChange={(e) => handleModelTypeChange(e, "model_type")}
                >
                    <MenuItem value="simple">Simple</MenuItem>
                    <MenuItem value="firstorderzone">First Order Zone</MenuItem>
                </Select>
            </FormControl>
            {EquipmentConfig()}
            {ModelConfig()}
        </>
    );
}
