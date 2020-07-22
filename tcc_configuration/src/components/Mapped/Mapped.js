import React from "react";
import { Grid, Select, InputLabel, MenuItem } from '@material-ui/core';
import { FormControl } from '../common/_styledFormControl';
import modelTypes from '../../constants/jsonTemplates/mapped.json';

const Mapped = props => {
    const { type, setType, mapped, setMapped } = props;

    return (
        <>
            <Grid container>
                <Grid item xs={4}>
                    <FormControl>
                        <InputLabel id={"mappedTypeSelectLabel_".concat(props.index)}>Type</InputLabel>
                        <Select
                            labelId={"mappedTypeSelectLabel_".concat(props.index)}
                            id={"mappedTypeSelect_".concat(props.index)}
                            value={type}
                            type="string"
                            onChange={(e) => setType(e.target.value, props.index)}
                        >
                            <MenuItem value={"ahu"}>AHU</MenuItem>
                            <MenuItem value={"light"}>Light</MenuItem>
                            <MenuItem value={"vav"}>VAV</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FormControl>
                        <InputLabel id={"mappedSelectLabel_".concat(props.index)}>Mapped</InputLabel>
                        <Select
                            labelId={"mappedSelectLabel_".concat(props.index)}
                            id={"mappedSelect_".concat(props.index)}
                            value={mapped}
                            type="string"
                            onChange={(e) => setMapped(e.target.value, props.index)}
                        >
                        {Object.keys(modelTypes[type]).map(t => {
                            return (
                                <MenuItem value={t}>{modelTypes[type][t]}</MenuItem>
                            )
                        })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
};

export default Mapped;