import React, { useState, useContext} from 'react';
import { FormControl, FormWrapper } from '../common/_styledFormControl';
import { InputLabel,  MenuItem, TextField, Select, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import AgentAHU from './AgentAHU';
import AgentLight from './AgentLight';
import AgentRTU from './AgentRTU';
import AgentVAV from './AgentVAV';
import AHUTemplate from '../../constants/jsonTemplates/deviceAHU.json';
import LightTemplate from '../../constants/jsonTemplates/deviceLight.json';
import RTUTemplate from '../../constants/jsonTemplates/deviceRTU.json';
import VAVTemplate from '../../constants/jsonTemplates/deviceVAV.json';
import { cloneObj, ModedFormHeader } from '../common/utility';
import { default as MasterDriverContext } from "../../context/masterDriverContext"

export default function Agent(props) {
    const {configuration, setConfiguration, darkMode} = useContext(MasterDriverContext);

    const [toggle, setToggle] = useState({
        ahu: false,
        light: false,
        rtu: false,
        vav: false
    })

    const initType = () => {
        let showing = configuration["device"]

        if (showing !== "") {
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
        config = changeKeys(e.target.value, config)
        setConfiguration(config)
        setToggle(togs)
    }

    const handleSubdeviceChange = (e) => {
        let config = configuration
        config["subdevice"] = e.target.value
        setConfiguration(config)
    }

    const handleCheckChange = (e, parameter) => {
        let config = cloneObj(configuration)
        if (parameter === "static_price_flag") {
            if (e.target.checked) {
                config["static_price_min"] = 0
                config["static_price_max"] = 0
            } else {
                delete config["static_price_min"]
                delete config["static_price_max"]
            }
        }
        config[parameter] = e.target.checked
        setConfiguration(config)
    }

    // Function to remove and add keys from configuration based on type
    const changeKeys = (type, config) => {
        config["device"] = type
        // AHU is completely different, so detect that first
        if (type === "ahu") {
            if ("actuation_method" in config) {
                delete config["actuation_method"]
            }
            if ("control_interval" in config) {
                delete config["control_interval"]
            }
            if ("market_name" in config) {
                delete config["market_name"]
            }
            if ("actuation_enabled_onstart" in config) {
                delete config["actuation_enabled_onstart"]
            }
            if ("tns" in config) {
                delete config["tns"]
            }
            config["supplier_market_name"] = ""
            config["consumer_market_name"] = ""

            if (!config["model_parameters"]["equipment_configuration"]) {
                config["model_parameters"] = cloneObj(AHUTemplate);
            }
        } else {
            // All other types share these keys existence
            if ("supplier_market_name" in config) {
                delete config["supplier_market_name"]
            }
            if ("consumer_market_name" in config) {
                delete config["consumer_market_name"]
            }
            config["actuation_enabled_onstart"] = false
            config["actuation_method"] = ""

            // RTUs differentiate with no market_name/actuation_method and have tns key
            if (type === "rtu") {
                if ("market_name" in config) {
                    delete config["market_name"]
                }
                if ("actuation_method" in config) {
                    delete config["actuation_method"]
                }
                config["tns"] = false
                if (!config["model_parameters"]["c"]) {
                    config["model_parameters"] = cloneObj(RTUTemplate);
                }
            } else {
                // AHUs and VAVs have market_name, remove tns if it exists
                if ("tns" in config) {
                    delete config["tns"]
                }
                config["market_name"] = ""
                if (type === "vav") {
                    if (!config["model_parameters"]["terminal_box_type"]) {
                        config["model_parameters"] = cloneObj(VAVTemplate);
                    }
                } else if (type === "light") {
                    if (!config["model_parameters"]["rated_power"] || config["model_parameters"]["c"]) {
                        config["model_parameters"] = cloneObj(LightTemplate);
                    }
                }
            }
        }
        return config
    }

    const handleNameChange = (e) => {
        let config = cloneObj(configuration)
        config["agent_name"] = e.target.value
        setConfiguration(config)
    }

    const handleChange = (e, parameter) => {
        let config = cloneObj(configuration)
        let val = e.target.value
        if(!isNaN(val)){
            val = Number(val)
        }
        config[parameter] = val
        setConfiguration(config)
    }

    const staticPriceFields = () => {
        return (
            <Grid container>
                <Grid xs={6}>
                    <FormControl>
                        <TextField
                            id={"staticPriceMinText"}
                            key={"staticPriceMinText"}
                            label="Static Price Min"
                            defaultValue={configuration["static_price_min"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "static_price_min")}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <FormControl>
                        <TextField
                            id={"staticPriceMaxText"}
                            key={"staticPriceMaxText"}
                            label="Static Price Max"
                            defaultValue={configuration["static_price_max"]}
                            type="number"
                            inputProps={{"step":"0.01"}}
                            onChange={e => handleChange(e, "static_price_max")}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    return (
        <FormWrapper>
            {ModedFormHeader("Agent Configuration", "medium")}
            <FormControl>
                <TextField
                    id={"agentNameText"}
                    key={"agentNameText"}
                    label="Agent Name"
                    defaultValue={configuration["agent_name"]}
                    type="string"
                    onChange={e => handleNameChange(e)}
                />
            </FormControl>
            <FormControl>
                <InputLabel id={"deviceLabel"}>Device</InputLabel>
                <Select
                    labelId="deviceLabel"
                    id="deviceSelect"
                    value={type}
                    onChange={e => handleDeviceChange(e)}
                >
                    <MenuItem value="">&nbsp;</MenuItem>
                    <MenuItem value="ahu">AHU</MenuItem>
                    <MenuItem value="light">LIGHT</MenuItem>
                    <MenuItem value="rtu">RTU</MenuItem>
                    <MenuItem value="vav">VAV</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id={"subdeviceLabel"}>Subdevice</InputLabel>
                <Select
                    labelId="subdeviceLabel"
                    id="subdeviceSelect"
                    value={configuration["subdevice"]}
                    onChange={e => handleSubdeviceChange(e)}
                >
                    <MenuItem value="">&nbsp;</MenuItem>
                    <MenuItem value="ahu">AHU</MenuItem>
                    <MenuItem value="light">LIGHT</MenuItem>
                    <MenuItem value="rtu">RTU</MenuItem>
                    <MenuItem value="vav">VAV</MenuItem>
                </Select>
            </FormControl>
            <Grid container>
                <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={configuration["demand_limiting"]}
                                    onChange={e => handleCheckChange(e, "demand_limiting")}
                                    color="primary"
                                />
                            }
                            class={darkMode ? "darkLabel" : ""}
                            label="Demand Limiting"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={configuration["static_price_flag"]}
                                    onChange={e => handleCheckChange(e, "static_price_flag")}
                                    color="primary"
                                />
                            }
                            class={darkMode ? "darkLabel" : ""}
                            label="Static Price Flag"
                        />
                </Grid>
            </Grid>
            {configuration["static_price_flag"] ? staticPriceFields() : ""}
            {toggle["ahu"] ? <AgentAHU /> : ""}
            {toggle["light"] ? <AgentLight /> : ""}
            {toggle["rtu"] ? <AgentRTU /> : ""}
            {toggle["vav"] ? <AgentVAV /> : ""}
        </FormWrapper>
    );
}
