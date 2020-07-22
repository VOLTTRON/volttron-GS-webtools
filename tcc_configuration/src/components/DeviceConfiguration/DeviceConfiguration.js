import React, { useState, useContext} from 'react';
import { FormControl, FormWrapper } from '../common/_styledFormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AHUConfiguration from './AHUConfiguration';
import LightConfiguration from './LightConfiguration';
import RTUConfiguration from './RTUConfiguration';
import VAVConfiguration from './VAVConfiguration';
import { ModedFormHeader } from '../common/utility';
import { default as MasterDriverContext } from "../../context/masterDriverContext";
import { cloneObj } from '../common/utility';
import AHUTemplate from '../../constants/jsonTemplates/deviceAHU.json';
import LightTemplate from '../../constants/jsonTemplates/deviceLight.json';
import RTUTemplate from '../../constants/jsonTemplates/deviceRTU.json';
import VAVTemplate from '../../constants/jsonTemplates/deviceVAV.json';

export default function DeviceConfiguration(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);

    const [toggle, setToggle] = useState({
        ahu: false,
        light: false,
        rtu: false,
        vav: false
    })

    const initType = () => {
        let showing = null
        if ("equipment_configuration" in configuration["model_parameters"]) {
            showing = "ahu";
        } else if ("rated_power" in configuration["model_parameters"]) {
            if ("c" in configuration["model_parameters"]) {
                showing = "rtu";
            } else {
                showing = "light";
            }
        } else if ("terminal_box_type" in configuration["model_parameters"]) {
            showing = "vav";
        }

        if (showing !== null) {
            let togs = toggle
            togs[showing] = true
            setToggle(togs)
        }
        return showing;
    }

    const [type, setType] = useState(initType);

    const handleDeviceChange = (e) => {
        setType(e.target.value)
        let togs = toggle
        for (let tog in togs) {
            togs[tog] = false
        }
        togs[e.target.value] = true;
        let config = configuration
        if (e.target.value === 'ahu') {
            if (!config["model_parameters"]["equipment_configuration"]) {
                config["model_parameters"] = cloneObj(AHUTemplate);
                setConfiguration(config)
            }
        } else if (e.target.value === 'light') {
            if (!config["model_parameters"]["rated_power"] || config["model_parameters"]["c"]) {
                config["model_parameters"] = cloneObj(LightTemplate);
                setConfiguration(config)
            }
        }else if (e.target.value === 'rtu') {
            if (!config["model_parameters"]["c"]) {
                config["model_parameters"] = cloneObj(RTUTemplate);
                setConfiguration(config)
            }
        } else if (e.target.value === 'vav') {
            if (!config["model_parameters"]["terminal_box_type"]) {
                config["model_parameters"] = cloneObj(VAVTemplate);
                setConfiguration(config)
            }
        }

        setToggle(togs)
    }

    return (
        <FormWrapper>
            {ModedFormHeader("Device Configuration", "medium")}
            <FormControl>
                <InputLabel id={"deviceLabel"}>Device</InputLabel>
                <Select
                    labelId={"deviceLabel"}
                    id={"deviceSelect"}
                    value={type}
                    onChange={e => handleDeviceChange(e)}
                >
                    <MenuItem value={"ahu"}>AHU</MenuItem>
                    <MenuItem value={"light"}>LIGHT</MenuItem>
                    <MenuItem value={"rtu"}>RTU</MenuItem>
                    <MenuItem value={"vav"}>VAV</MenuItem>
                </Select>
            </FormControl>
            {toggle["ahu"] ? <AHUConfiguration /> : ""}
            {toggle["light"] ? <LightConfiguration /> : ""}
            {toggle["rtu"] ? <RTUConfiguration /> : ""}
            {toggle["vav"] ? <VAVConfiguration /> : ""}
        </FormWrapper>
    );
}
