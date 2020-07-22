import React, { useState, useContext} from 'react';
import { FormControl, FormWrapper } from '../common/_styledFormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import AgentAHU from './AgentAHU';
import AgentLight from './AgentLight';
import AgentRTU from './AgentRTU';
import AgentVAV from './AgentVAV';
import { cloneObj, ModedFormHeader } from '../common/utility';

import { default as MasterDriverContext } from "../../context/masterDriverContext"


export default function AgentConfiguration(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);

    const [toggle, setToggle] = useState({
        ahu: false,
        light: false,
        vav: false
    })

    const initType = () => {
        let showing = null
        if ("supplier_market_name" in configuration) {
            showing = "ahu";
        } else if ("tns" in configuration) {
            showing = "rtu";
        } else if ("actuation_method" in configuration) {
            showing = "vav";
        } else {
            showing = "light";
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
        config = changeKeys(e.target.value, config)
        setConfiguration(config)
        setToggle(togs)
    }

    // Function to remove and add keys from configuration based on type
    const changeKeys = (type, config) => {
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
        } else {
            // All other types share these keys existence
            if ("supplier_market_name" in config) {
                delete config["supplier_market_name"]
            }
            if ("consumer_market_name" in config) {
                delete config["consumer_market_name"]
            }
            config["control_interval"] = ""
            config["actuation_enabled_onstart"] = false

            // RTUs differentiate with no market_name/actuation_method and have tns key
            if (type === "rtu") {
                if ("market_name" in config) {
                    delete config["market_name"]
                }
                if ("actuation_method" in config) {
                    delete config["actuation_method"]
                }
                config["tns"] = false
            } else {
                // AHUs and VAVs have market_name, remove tns if it exists
                if ("tns" in config) {
                    delete config["tns"]
                }
                config["market_name"] = ""
                // VAVs have actuation_method key, AHUs do not
                if (type === "vav") {
                    config["actuation_method"] = ""
                } else if (type === "light") {
                    delete config["actuation_method"]
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
                    <MenuItem value="ahu">AHU</MenuItem>
                    <MenuItem value="light">LIGHT</MenuItem>
                    <MenuItem value="rtu">RTU</MenuItem>
                    <MenuItem value="vav">VAV</MenuItem>
                </Select>
            </FormControl>
            {toggle["ahu"] ? <AgentAHU /> : ""}
            {toggle["light"] ? <AgentLight /> : ""}
            {toggle["rtu"] ? <AgentRTU /> : ""}
            {toggle["vav"] ? <AgentVAV /> : ""}
        </FormWrapper>
    );
}
