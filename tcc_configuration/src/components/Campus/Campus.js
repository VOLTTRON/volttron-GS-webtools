import React, { useContext } from "react";
import MasterDriverContext from '../../context/masterDriverContext';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import { FormControl } from '../common/_styledFormControl';
import { ModedFormHeader } from '../common/utility';
import Agent from '../Agent/Agent';

const Campus = props => {
    const { configuration, setConfiguration, buildings, campuses } = useContext(MasterDriverContext);

    const timezones = ["EST", "CST", "MST", "PST", "UTC"];

    const handleChange = (e, param) => {
        let config = configuration
        config[param] = e.target.value
        setConfiguration(config)
    }

    return (
        <>
            {ModedFormHeader("Campus Configuration", "medium")}
            <FormControl>
                <InputLabel id="campusLabel">Campus</InputLabel>
                <Select
                    labelId="campusLabel"
                    id="campusSelect"
                    value={configuration["campus"]}
                    onChange={(e) => handleChange(e, "campus")}
                >
                    {Object.keys(campuses).map(c => {
                        return (
                            <MenuItem value={campuses[c]}>{campuses[c]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="buildingLabel">Building</InputLabel>
                <Select
                    labelId="buildingLabel"
                    id="buildingSelect"
                    value={configuration["building"]}
                    onChange={(e) => handleChange(e, "building")}
                >
                    {Object.keys(buildings).map(b => {
                        return (
                            <MenuItem value={buildings[b]}>{buildings[b]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="timezoneLabel">Time Zone</InputLabel>
                <Select
                    labelId="timezoneLabel"
                    id="timezoneSelect"
                    value={configuration["input_data_timezone"]}
                    onChange={(e) => handleChange(e, "input_data_timezone")}
                >
                    {Object.keys(timezones).map(t => {
                        return (
                            <MenuItem value={timezones[t]}>{timezones[t]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Agent />
        </>
    );
};

export default Campus;