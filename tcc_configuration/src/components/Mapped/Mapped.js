import React, { useContext } from "react";
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import { FormControl } from '../common/_styledFormControl';
import modelTypes from '../../constants/jsonTemplates/mapped.json';
import { default as MasterDriverContext } from "../../context/masterDriverContext";

const Mapped = props => {
    const { configuration } = useContext(MasterDriverContext);
    const { mapped, setMapped } = props;
    const type = configuration["device"]

    return (
        <>
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
        </>
    );
};

export default Mapped;