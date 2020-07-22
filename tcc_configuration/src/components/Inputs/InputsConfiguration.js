import React, { useState, useContext } from "react";
import { PrimaryButton, RemoveButton } from '../common/_styledButton'
import { Grid, Select, InputLabel, MenuItem, TextField } from '@material-ui/core';
import MasterDriverContext from '../../context/masterDriverContext';
import { FormControl, FormWrapper } from '../common/_styledFormControl';
import { ModedFormHeader, cloneObj, initMapped, initTypes, findDeviceIndex } from '../common/utility';
import InputTemplate from '../../constants/jsonTemplates/input.json';
import Mapped from '../Mapped/Mapped';

const InputsConfiguration = props => {
    const { configuration, setConfiguration, devices } = useContext(MasterDriverContext);
    const [types, setTypes] = useState(initTypes(configuration["inputs"]));
    const [mapped, setMapped] = useState(initMapped(configuration["inputs"]));

    const handleMappedChange = (value, index) => {
        let config = configuration
        config["inputs"][index]["mapped"] = value;
        setConfiguration(config)
        let m = mapped
        m[index] = value
        setMapped(m)
    }

    const setMappedType = (value, index) => {
        let config = configuration
        config["inputs"][index]["mapped"] = "";
        setConfiguration(config)
        let t = types;
        t[index] = value;
        setTypes(t);
    }

    const initPointsList = () => {
        let pointList = []
        let inputIndex = 0

        for (var input in configuration["inputs"]) {
            if (configuration["inputs"][input]["topic"] !== "") {
                let devIndex = findDeviceIndex(configuration["inputs"][input]["topic"].split("/")[2], devices)
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
            let inputArray = configuration["inputs"];
            let config = configuration;
            inputArray[index]["topic"] = config["campus"] + "/" + config["building"] + "/" + e.target.value
            config["inputs"] = inputArray
            setConfiguration(config)
        }
    }

    const handleChange = (e, index, key) => {
        let config = configuration
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        config["inputs"][index][key] = val
        setConfiguration(config)
    }

    const addInput = (event) => {
        let config = configuration
        let input = cloneObj(InputTemplate);
        config["inputs"].push(input)
        setConfiguration(config)
        let t = cloneObj(types)
        t.push("")
        setTypes(t)
        let m = cloneObj(mapped)
        m.push("")
        setMapped(m)
    }

    const removeInput = (index) => {
        var response = window.confirm("Do you really want to remove this input?");
        if (response === true) {
            let config = configuration
            config["inputs"].splice(index, 1)
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

    const Inputs = () => {
        return (
            configuration["inputs"].map((i, index) => {
                return (
                    <>
                        <Grid container alignItems="center">
                            <Grid item xs={10}>
                                {ModedFormHeader("Input ".concat(index), "small")}
                            </Grid>
                            <Grid item xs={2}>
                                <RemoveButton id={"removeButton_".concat(index)} onClick={() => removeInput(index)}>Remove</RemoveButton>
                            </Grid>
                        </Grid>
                        <FormControl>
                            <InputLabel id={"topicLabel_".concat(index)}>Topic</InputLabel>
                            <Select
                                labelId={"topicLabel_".concat(index)}
                                id={"topicSelect_".concat(index)}
                                value={i["topic"].split("/")[2]}
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
                            <InputLabel id={"pointsLabel_".concat(index)}>Points</InputLabel>
                            <Select
                                labelId={"pointsLabel_".concat(index)}
                                id={"pointsSelect_".concat(index)}
                                value={i["point"]}
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
                        <FormControl>
                            <TextField
                                id={"initialValue_".concat(index)}
                                key={"initialValue_".concat(index)}
                                label="Initial Value"
                                value={i["initial_value"]}
                                type="number"
                                inputProps={{"step":"0.01"}}
                                onChange={e => handleChange(e, index, "initial_value")}
                            />
                        </FormControl>
                        <Mapped
                            source="inputs"
                            index={index}
                            id={Math.floor(Math.random() * Math.floor(10**8))}
                            setType={setMappedType} type={types[index]}
                            setMapped={handleMappedChange} mapped={mapped[index]}
                        />
                        <hr />
                    </>
                )
            })
        )
    }


    return (
        <FormWrapper>
            {ModedFormHeader("Inputs ", "medium")}
            {Inputs()}
            <PrimaryButton id="addInputButton" onClick={addInput}>Add Input</PrimaryButton>
        </FormWrapper>
    );
};

export default InputsConfiguration;