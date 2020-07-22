import React, { useState, useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import { InputLabel, MenuItem, Select, Input } from '@material-ui/core';
import { cloneObj, ModedFormHeader } from '../common/utility';
import { default as MasterDriverContext } from "../../context/masterDriverContext"

export default function VAVConfiguration(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);
    const [modelParams, setModelParams] = useState(configuration["model_parameters"]);

    const handleChange = (e, param) => {
        let parameters = cloneObj(modelParams)
        parameters[param] = e.target.value
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
            try{
                reader.onload = () => {
                    let result = JSON.parse(reader.result)
                    let config = configuration
                    config["model_parameters"]["a1"] = result["a1"]
                    config["model_parameters"]["a2"] = result["a2"]
                    config["model_parameters"]["a3"] = result["a3"]
                    config["model_parameters"]["a4"] = result["a4"]
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
                    let a1 = []
                    let a2 = []
                    let a3 = []
                    let a4 = []
                    for(let x = 1; x < 25; x++) {
                        let row = result[x].split(',')
                        a1.push(Number(row[0]))
                        a2.push(Number(row[1]))
                        a3.push(Number(row[2]))
                        a4.push(Number(row[3]))
                    }
                    let config = configuration
                    config["model_parameters"]["a1"] = a1
                    config["model_parameters"]["a2"] = a2
                    config["model_parameters"]["a3"] = a3
                    config["model_parameters"]["a4"] = a4
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
            <FormControl>
                <InputLabel id={"terminalBoxTypeSelectLabel"}>Terminal Box Type</InputLabel>
                <Select
                    labelId={"terminalBoxTypeSelectLabel"}
                    id={"terminalBoxTypeSelect"}
                    defaultValue={modelParams["terminal_box_type"]}
                    type="string"
                    onChange={(e) => handleChange(e, "terminal_box_type")}
                >
                    <MenuItem value={"CAV"}>CAV</MenuItem>
                    <MenuItem value={"VAV"}>VAV</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                {ModedFormHeader("VAV Hourly Parameters File Upload", "small")}
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