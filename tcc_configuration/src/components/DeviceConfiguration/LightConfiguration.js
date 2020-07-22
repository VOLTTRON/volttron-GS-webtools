import React, { useState, useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import { InputLabel, MenuItem, TextField, Select, Input } from '@material-ui/core';
import { cloneObj, ModedFormHeader } from '../common/utility';
import { default as MasterDriverContext } from "../../context/masterDriverContext"


export default function LightConfiguration(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);
    const [modelParams, setModelParams] = useState(configuration["model_parameters"]);

    const handleChange = (e, param) => {
        let parameters = cloneObj(modelParams)
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        parameters[param] = val
        if (param === "model_type" && val === "simple" && parameters["default_lighting_schedule"]) {
            delete parameters["default_lighting_schedule"]
        }
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
                    config["model_parameters"]["default_lighting_schedule"] = result["default_lighting_schedule"]
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
                    let sched = []
                    for(let x = 1; x < 25; x++) {
                        let row = result[x].split(',')
                        sched.push(Number(row[0]))
                    }
                    let config = configuration
                    config["model_parameters"]["default_lighting_schedule"] = sched
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
                    <MenuItem value={"simple_profile"}>Simple Profile</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <TextField
                    id={"ratedPowerText"}
                    key={"ratedPowerText"}
                    label="Rated Power"
                    defaultValue={modelParams["rated_power"]}
                    type="number"
                    inputProps={{"step":"0.01"}}
                    onChange={e => handleChange(e, "rated_power")}
                />
            </FormControl>
            { modelParams["model_type"] === "simple_profile"
                ?
                    <FormControl>
                        {ModedFormHeader("Light Hourly Parameters File Upload", "small")}
                        <Input
                            id="parameterUploadInput"
                            type="file"
                            inputProps={{"accept":".json, .csv"}}
                            color="primary"
                            onChange={handleFileUpload}
                        />
                    </FormControl>
                :   ""
            }
        </>
    );
}
