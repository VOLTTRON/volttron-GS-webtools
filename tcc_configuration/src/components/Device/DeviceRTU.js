import React, { useState, useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import { InputLabel, MenuItem, Select, Input, TextField, Grid } from '@material-ui/core';
import { cloneObj, ModedFormHeader } from '../common/utility';
import { default as MasterDriverContext } from "../../context/masterDriverContext"

export default function DeviceRTU(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);
    const [modelParams, setModelParams] = useState(configuration["model_parameters"]);

    const handleChange = (e, param) => {
        let parameters = cloneObj(modelParams)
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        parameters[param] = val
        setModelParams(parameters)
        let config = cloneObj(configuration)
        config["model_parameters"] = parameters
        setConfiguration(config)
    }

    const handleFileUpload = ( event ) => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);

        if (file["type"] === "application/json") {
            try {
                reader.onload = () => {
                    let result = JSON.parse(reader.result)
                    let config = configuration
                    config["model_parameters"]["c1"] = result["c1"]
                    config["model_parameters"]["c2"] = result["c2"]
                    config["model_parameters"]["c3"] = result["c3"]
                    if (config["model_parameters"]["model_type"] === "rtu.rtuzone") {
                        delete config["model_parameters"]["c4"]
                        config["model_parameters"]["c"] = result["c"]
                    } else {
                        delete config["model_parameters"]["c"]
                        config["model_parameters"]["c4"] = result["c4"]
                    }
                    setConfiguration(config)
                    alert("Parameters successfully loaded from JSON file!")
                };
                reader.onerror = function() {
                    console.log(reader.error);
                };
            } catch (e) {
                alert("File is not in proper JSON format!")
            }
        } else {
            try {
                reader.onload = () => {
                    let result = reader.result.split("\n")
                    let c1 = []
                    let c2 = []
                    let c3 = []
                    let c4 = []
                    let c = Number(result[1].split(',')[3])
                    for(let x = 1; x < 25; x++) {
                        let row = result[x].split(',')
                        c1.push(Number(row[0]))
                        c2.push(Number(row[1]))
                        c3.push(Number(row[2]))
                        c4.push(Number(row[3]))
                    }
                    let config = configuration
                    config["model_parameters"]["c1"] = c1
                    config["model_parameters"]["c2"] = c2
                    config["model_parameters"]["c3"] = c3
                    if (config["model_parameters"]["model_type"] === "rtu.rtuzone") {
                        config["model_parameters"]["c"] = c
                    } else {
                        config["model_parameters"]["c4"] = c4
                    }
                    setConfiguration(config)
                    alert("Parameters successfully loaded from CSV file!")
                };
                reader.onerror = function() {
                    console.log(reader.error);
                };
            } catch (e) {
                alert("File is not in proper CSV format!")
            }
        }
    }


    return (
        <>
            <FormControl>
                <InputLabel id={"modelTypeLabel"}>Model Type</InputLabel>
                <Select
                    labelId={"modelTypeLabel"}
                    id={"modelTypeSelect"}
                    value={modelParams["model_type"]}
                    onChange={(e) => handleChange(e, "model_type")}
                >
                    <MenuItem value={"rtu.firstorderzone"}>First Order Zone</MenuItem>
                    <MenuItem value={"rtu.rtuzone"}>RTU Zone</MenuItem>
                </Select>
            </FormControl>
            <Grid container>
                <Grid item xs={4}>
                    <TextField
                            id="onMinText"
                            key="onMinText"
                            label="On Min"
                            defaultValue={modelParams["on_min"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "on_min")}
                        />
                </Grid>
                <Grid item xs={4}>
                        <TextField
                            id="ratedPowerText"
                            key="ratedPowerText"
                            label="Rated Power"
                            defaultValue={modelParams["rated_power"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "rated_power")}
                        />
                </Grid>
                <Grid item xs={4}>
                        <TextField
                            id="deadbandOnText"
                            key="deadbandOnText"
                            label="Deadband On"
                            defaultValue={modelParams["temp_on_db"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "temp_on_db")}
                        />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    <TextField
                            id="offMinText"
                            key="offMinText"
                            label="Off Min"
                            defaultValue={modelParams["off_min"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "off_min")}
                        />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                            id="tempDBText"
                            key="tempDBText"
                            label="Temp Deadband"
                            defaultValue={modelParams["temp_db"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "temp_db")}
                        />
                </Grid>
                <Grid item xs={4}>
                        <TextField
                            id="deadbandOffText"
                            key="deadbandOffText"
                            label="Deadband Off"
                            defaultValue={modelParams["temp_off_db"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "temp_off_db")}
                        />
                </Grid>
            </Grid>
            <FormControl>
                {ModedFormHeader("RTU Hourly Parameters File Upload", "small")}
                <Input
                    id="parameterUploadInput"
                    type="file"
                    inputProps={{"accept":".json, .csv"}}
                    color="primary"
                    onChange={handleFileUpload}
                />
            </FormControl>
        </>
    );
}