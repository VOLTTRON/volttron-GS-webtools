import React, { useState, useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import { InputLabel, MenuItem, Select, Input, TextField, Grid } from '@material-ui/core';
import { cloneObj, ModedFormHeader } from '../common/utility';
import { default as MasterDriverContext } from "../../context/masterDriverContext"

export default function RTUConfiguration(props) {
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
                    config["model_parameters"]["c"] = result["c"]
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
                    let c = Number(result[1].split(',')[3])
                    for(let x = 1; x < 25; x++) {
                        let row = result[x].split(',')
                        c1.push(Number(row[0]))
                        c2.push(Number(row[1]))
                        c3.push(Number(row[2]))
                    }
                    let config = configuration
                    config["model_parameters"]["c1"] = c1
                    config["model_parameters"]["c2"] = c2
                    config["model_parameters"]["c3"] = c3
                    config["model_parameters"]["c"] = c
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
                    <MenuItem value={"simple"}>Simple</MenuItem>
                    <MenuItem value={"firstorderzone"}>First Order Zone</MenuItem>
                </Select>
            </FormControl>
            <Grid container>
                <Grid item xs={2} />
                <Grid item xs={4}>
                    <FormControl>
                        <TextField
                            id="tempDBText"
                            key="tempDBText"
                            label="Temp DB"
                            defaultValue={modelParams["temp_db"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "temp_db")}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl>
                        <TextField
                            id="ratedPowerText"
                            key="ratedPowerText"
                            label="Rated Power"
                            defaultValue={modelParams["rated_power"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "rated_power")}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={2} />
            </Grid>
            <Grid container>
                <Grid item xs={2} />
                <Grid item xs={4}>
                    <FormControl>
                        <TextField
                            id="onMinText"
                            key="onMinText"
                            label="On Min"
                            defaultValue={modelParams["on_min"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "on_min")}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl>
                        <TextField
                            id="offMinText"
                            key="offMinText"
                            label="Off Min"
                            defaultValue={modelParams["off_min"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "off_min")}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={2} />
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