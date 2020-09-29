import React, { useState, useContext} from 'react';
import { Grid, InputLabel, MenuItem, TextField, Select } from '@material-ui/core';
import { FormControl, FormWrapper } from '../common/_styledFormControl';
import { PrimaryButton, RemoveButton } from '../common/_styledButton'
import { default as MasterDriverContext } from "../../context/masterDriverContext";
import { ModedFormHeader, cloneObj, initMapped, initTypes, findDeviceIndex } from '../common/utility';
import OutputTemplate from '../../constants/jsonTemplates/output.json';
import Mapped from '../Mapped/Mapped';

export default function Outputs(props) {
    const {configuration, setConfiguration, devices} = useContext(MasterDriverContext);
    const [types, setTypes] = useState(initTypes(configuration["outputs"]));
    const [mapped, setMapped] = useState(initMapped(configuration["outputs"]));

    const handleMappedChange = (value, index) => {
        let config = configuration
        config["outputs"][index]["mapped"] = value;
        setConfiguration(config)
        let m = mapped
        m[index] = value
        setMapped(m)
    }

    const initPointsList = () => {
        let pointList = []
        let inputIndex = 0
        for (var output in configuration["outputs"]) {
            if (configuration["outputs"][output]["topic"] !== "") {
                let devIndex = findDeviceIndex(configuration["outputs"][output]["topic"].split("/")[3], devices)
                if (devIndex !== -1) {
                    pointList[inputIndex] = devices[devIndex]["points"]
                }
            }
            inputIndex++
        }
        return pointList
    }

    const [points, setPoints] = useState(initPointsList)

    const handleTopicChange = (e, index) => {
        if (configuration["campus"] === "" || configuration["building"] === "") {
            let message = ""
            if (configuration["campus"] === "") {
                message += "Campus value must be selected before Topics or Points can be selected!\nNavigate back to Campus Configuration and select a Campus.\n\n";
            }
            if (configuration["building"] === "") {
                message += "Building value must be selected before Topics or Points can be selected!\nNavigate back to Campus Configuration and select a Building.";
            }
            alert(message);
        } else {
            let p = points
            let devIndex = findDeviceIndex(e.target.value, devices)
            p[index] = devices[devIndex]["points"];
            setPoints(p);
            let outputArray = configuration["outputs"];
            let config = configuration;
            outputArray[index]["topic"] = `devices/${config["campus"]}/${config["building"]}/${e.target.value}/all`
            config["outputs"] = outputArray
            setConfiguration(config)
        }
    }

    const handleChange = (e, index, key, value=null) => {
        let config = configuration
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        if(value === null) {
            config["outputs"][index][key] = val
        } else {
            config["outputs"][index][key][value] = val
        }
        setConfiguration(config)
    }

    const addOutput = (event) => {
        let config = configuration
        let output = cloneObj(OutputTemplate)
        config["outputs"].push(output)
        setConfiguration(config)
        let t = cloneObj(types)
        t.push("")
        setTypes(t)
        let m = cloneObj(mapped)
        m.push("")
        setMapped(m)
    }

    const removeOutput = (index) => {
        var response = window.confirm("Do you really want to remove this input?");
        if (response === true) {
            let config = configuration
            config["outputs"].splice(index, 1)
            setConfiguration(config)
            if (points[index] !== undefined) {
                let pointList = points
                pointList.splice(index, 1)
                setPoints(pointList)
            }
            if (types[index] !== undefined) {
                let typeList = types
                typeList.splice(index, 1)
                setTypes(typeList)
            }
            if (mapped[index] !== undefined) {
                let mappedList = mapped
                mappedList.splice(index, 1)
                setMapped(mappedList)
            }
        }
    }


    const OutputsList = () => {
        return (
            configuration["outputs"].map((i, index) => {
                return (
                <>
                    <Grid container alignItems="center">
                        <Grid item xs={10}>
                            {ModedFormHeader("Output ".concat(index), "small")}
                        </Grid>
                        <Grid item xs={2}>
                            <RemoveButton id={"removeButton_".concat(index)} onClick={e => removeOutput(index)}>Remove</RemoveButton>
                        </Grid>
                    </Grid>
                    <FormControl>
                        <InputLabel id={"topicLabel_".concat(index)}>Topic</InputLabel>
                        <Select
                            labelId={"topicLabel_".concat(index)}
                            id={"topicSelect_".concat(index)}
                            value={configuration["outputs"][index]["topic"].split("/")[3]}
                            onChange={e => handleTopicChange(e, index)}
                        >
                            {devices.map(d => {
                                return (
                                    <MenuItem value={d["device_name"]}>{d["device_name"]}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id={"pointsLabel_".concat(index)}>Point</InputLabel>
                        <Select
                            labelId={"pointsLabel_".concat(index)}
                            id={"pointsSelect_".concat(index)}
                            value={configuration["outputs"][index]["point"]}
                            onChange={e => handleChange(e, index, "point")}
                        >
                            {points[index]
                                ? points[index].map(p => {
                                    return (
                                        <MenuItem value={p}>{p}</MenuItem>
                                    )
                                })
                                : <MenuItem disabled>Select a device before you can see points</MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <Mapped
                        source="outputs"
                        index={index}
                        setMapped={handleMappedChange} mapped={mapped[index]}
                    />
                    <Grid container>
                        <Grid item xs={4}>
                            <TextField
                                id={"flexRangeHigh_".concat(index)}
                                key={"flexRangeHigh_".concat(index)}
                                label="Flexibility Range (High)"
                                value={configuration["outputs"][index]["flexibility_range"][1]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, index, "flexibility_range", 1)}
                                style={{"textAlign": "center"}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id={"controlFlexHigh_".concat(index)}
                                key={"controlFlexHigh_".concat(index)}
                                label="Control Flexibility (High)"
                                value={configuration["outputs"][index]["control_flexibility"][1]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, index, "control_flexibility", 1)}
                                style={{"textAlign": "center"}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id={"offsetPoint_".concat(index)}
                                key={"offsetPoint_".concat(index)}
                                label="Off Set Point"
                                value={configuration["outputs"][index]["off_setpoint"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, index, "off_setpoint")}
                                style={{"textAlign": "center"}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <TextField
                                id={"flexRangeLow_".concat(index)}
                                key={"flexRangeLow_".concat(index)}
                                label="Flexibility Range (Low)"
                                value={configuration["outputs"][index]["flexibility_range"][0]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, index, "flexibility_range", 0)}
                                style={{"textAlign": "center"}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id={"controlFlexLow_".concat(index)}
                                key={"controlFlexLow_".concat(index)}
                                label="Control Flexibility (Low)"
                                value={configuration["outputs"][index]["control_flexibility"][0]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, index, "control_flexibility", 0)}
                                style={{"textAlign": "center"}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id={"fallback_".concat(index)}
                                key={"fallback_".concat(index)}
                                label="Fallback"
                                value={configuration["outputs"][index]["fallback"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, index, "fallback")}
                            />
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <FormControl>
                        <TextField
                            id={"actuator_".concat(index)}
                            key={"actuator_".concat(index)}
                            label="Actuator"
                            value={configuration["outputs"][index]["actuator"]}
                            type="string"
                            onChange={e => handleChange(e, index, "actuator")}
                            disabled // Remove this line to make this field editable
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id={"releaseLabel_".concat(index)}>Release</InputLabel>
                        <Select
                            labelId={"releaseLabel_".concat(index)}
                            id={"releaseSelect_".concat(index)}
                            value={configuration["outputs"][index]["release"]}
                            onChange={e => handleChange(e, index, "release")}
                        >
                            <MenuItem value={"none"}>{"None"}</MenuItem>
                            <MenuItem value={"default"}>{"Default"}</MenuItem>
                        </Select>
                    </FormControl>
                    <hr />
                </>
                )
            })
        )
    }

    return (
        <FormWrapper>
            {ModedFormHeader("Outputs", "medium")}
            {OutputsList()}
            <PrimaryButton id="addOutputButton" onClick={addOutput}>Add Output</PrimaryButton>
        </FormWrapper>
    );
}
