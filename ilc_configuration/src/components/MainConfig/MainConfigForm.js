import React, { useState, useContext} from 'react';
import { InputLabel, FormHelperText, Select, TextField, NativeSelect, Paper, withTheme } from '@material-ui/core'
import { FormControl, TreeView, TreeItem, FormControlLabel, CheckBox, StyledBox } from './_styledMainConfigForm';
import { Tooltip } from './_styledMainConfigForm'
import MasterDriverContext from '../../context/masterDriverContext';
import configMapping from '../../constants/jsonTemplates/configurationMapping.json'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DemandFormula from '../common/Calculator'
import {FloatInput} from '../common/_styledInput';
import {SmallLabel} from '../common/_styledLabel';
import {clone} from '../../utils/clone'
import { darkModeContext } from "../../context/darkModeContext";
import {_CRITERIA, _PAIRWISE} from "../../constants/strings"

export default function MainConfigForm(props) {
    const {parsedMDC, campuses, buildings, devices, configuration, setConfiguration} = useContext(MasterDriverContext);
    const { darkMode } = useContext(darkModeContext);
    const [state, setState] = useState({
        campus: configuration["config"]["campus"],
        building: configuration["config"]["building"],
        device_name: configuration["config"]["power_meter"]["device_name"],
        point: configuration["config"]["power_meter"]["point"],
        points: [],
        agentId: configuration["config"]["agent_id"],
        demandLimit: configuration["config"]["demand_limit"],
        controlTime: configuration["config"]["control_time"],
        curtailmentConfirm: configuration["config"]["curtailment_confirm"],
        curtailmentBreak: configuration["config"]["curtailment_break"],
        averageBuildingPowerWindow: configuration["config"]["average_building_power_window"],
        stagger_release: true,
        stagger_off_time: false
    })

    const handleChange = (event, newConfiguration = clone(configuration)) => {
        const name = event.target.name
        updateConfiguration(name, event.target.value, newConfiguration)
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const handleFloatChange = (event, newConfiguration = clone(configuration)) => {
        const name = event.target.name
        const floatValue = parseFloat(event.target.value)
        updateConfiguration(name, floatValue, newConfiguration)
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const handleCampusChange = (event) => {
        const campus = event.target.value
        let powerMeterDT = clone(configuration["config"]["power_meter"])
        let powerMeterDTTokens = powerMeterDT["device_topic"].split("/")
        let newPowerMeterDT = ""
        newPowerMeterDT =` ${campus}/${powerMeterDTTokens[1]}/${powerMeterDTTokens[2]}`
        let newConfiguration = clone(configuration);
        newConfiguration["config"]["power_meter"]["device_topic"] = newPowerMeterDT;
        // update criteria device topics
        Object.keys(newConfiguration).forEach(configName => {
            if (configName.includes(_CRITERIA) && !configName.includes(_PAIRWISE)){
                for (let [parentDeviceKey, parentDevice] of Object.entries(newConfiguration[configName])) {
                    if(parentDeviceKey == "mapper"){
                        continue;
                    }
                    for (let [deviceName, deviceCriteria] of Object.entries(parentDevice)) {
                        for ( let [settingKey, setting] of Object.entries(deviceCriteria)){
                            if(settingKey == "mapper"){
                                continue;
                            }
                            let dtTokens = setting["device_topic"].split("/")
                            let newDeviceTopic = ` ${campus}/${dtTokens[1]}/${dtTokens[2]}`
                            newConfiguration[configName][deviceName][deviceName][settingKey]["device_topic"] = newDeviceTopic
                            const controlConfigName = configName.replace("criteria", "control")
                            newConfiguration[controlConfigName][deviceName][deviceName]["device_topic"] = newDeviceTopic
                        }
                    }
                }
            }
        })
        setConfiguration(newConfiguration)
        handleChange(event, newConfiguration)
    }

    const handleBuildingChange = (event) => {
        const building = event.target.value
        let powerMeterDT = clone(configuration["config"]["power_meter"])
        let powerMeterDTTokens = powerMeterDT["device_topic"].split("/")
        let newPowerMeterDT = ""
        newPowerMeterDT =` ${powerMeterDTTokens[0]}/${building}/${powerMeterDTTokens[2]}`
        let newConfiguration = clone(configuration);
        newConfiguration["config"]["power_meter"]["device_topic"] = newPowerMeterDT;
        // update criteria device topics
        Object.keys(newConfiguration).forEach(configName => {
            if (configName.includes(_CRITERIA) && !configName.includes(_PAIRWISE)){
                for (let [parentDeviceKey, parentDevice] of Object.entries(newConfiguration[configName])) {
                    if(parentDeviceKey === "mapper"){
                        continue;
                    }
                    for (let [deviceName, deviceCriteria] of Object.entries(parentDevice)) {
                        for ( let [settingKey, setting] of Object.entries(deviceCriteria)){
                            if(settingKey === "mapper"){
                                continue;
                            }
                            let dtTokens = setting["device_topic"].split("/")
                            let newDeviceTopic = ` ${dtTokens[0]}/${building}/${dtTokens[2]}`
                            newConfiguration[configName][deviceName][deviceName][settingKey]["device_topic"] = newDeviceTopic
                            const controlConfigName = configName.replace("criteria", "control")
                            newConfiguration[controlConfigName][deviceName][deviceName]["device_topic"] = newDeviceTopic
                        }
                    }
                }
            }
        })
        setConfiguration(newConfiguration)
        handleChange(event, newConfiguration)
    }

    const handleCheckBoxChange = (event) => {
        const name = event.target.name
        updateConfiguration(name, !state[name])
        setState({
            ...state,
            [name]: !state[name]
        })
    }

    const handleDeviceChange = (event) => {
        let deviceTopic = configuration["config"]["power_meter"]["device_topic"]
        const deviceTopicTokens = deviceTopic.split("/")
        let newDeviceTopic = `${deviceTopicTokens[0]}/${deviceTopicTokens[1]}/${event.target.value}`
        const name = event.target.name
        // get points from device
        let points = getPoints(event.target.value)
        let newConfiguration = clone(configuration)
        updateConfiguration("device_topic", newDeviceTopic, newConfiguration)
        updateConfiguration(name, event.target.value, newConfiguration)
        updateConfiguration("point", '', newConfiguration)
        setState({
            ...state,
            [name]: event.target.value,
            points: points,
            point: ''
        })
    }

    const updateConfiguration = (name, value, newConfiguration = clone(configuration)) => {
        const savePath = configMapping[name]
        if(savePath.length === 2){
            newConfiguration[savePath[0]][savePath[1]] = value
        } else if (savePath.length === 3){
            newConfiguration[savePath[0]][savePath[1]][savePath[2]] = value
        }
        setConfiguration(newConfiguration)
    }

    const getPoints = (device_name) => {
        let points = [];
        for(let deviceIndex in devices){
            if(devices[deviceIndex]["device_name"] === device_name){
                points = devices[deviceIndex]["points"]
            }
        }
        return points;
    }

    let points = getPoints(state.device_name);

    return (
        <StyledBox>
            <FormControl >
                <InputLabel htmlFor="campus">Campus</InputLabel>
                <Select
                    native
                    value={state.campus}
                    onChange={handleCampusChange}
                    inputProps={{
                        name: 'campus',
                        id: 'campusInput'
                    }}
                >
                    <option aria-label="None" value="" />
                    {campuses.map(campus => {return <option value={campus}>{campus}</option>})}
                </Select>
            </FormControl>
            <FormControl >
                <InputLabel htmlFor="building">Building</InputLabel>
                <NativeSelect
                    value={state.building}
                    onChange={handleBuildingChange}
                    inputProps={{
                        name: 'building',
                        id: 'buildingInput'
                    }}
                >
                    <option aria-label="None" value="" />
                    {buildings.map(building => {return <option value={building}>{building}</option>})}
                </NativeSelect>
            </FormControl>
            <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}>
            <TreeItem nodeId="1" label="Power Meter" darkMode={darkMode}>
                    <FormControl >
                        <InputLabel htmlFor="device">Device</InputLabel>
                        <NativeSelect
                            value={state.device_name}
                            onChange={handleDeviceChange}
                            inputProps={{
                                name: 'device_name',
                                id: 'deviceNameInput'
                            }}
                        >
                                    <option aria-label="None" value="" />
                            {devices.map(device => {return <option value={device["device_name"]}>{device["device_name"]}</option>})}
                        </NativeSelect>
                    </FormControl>
                    <FormControl >
                        <InputLabel htmlFor="device">Point</InputLabel>
                        <NativeSelect
                            value={state.point}
                            onChange={handleChange}
                            inputProps={{
                                name: 'point',
                                id: 'pointInput'
                            }}
                        >
                                    <option aria-label="None" value="" />
                            {points.map(point => {return <option value={point}>{point}</option>})}
                        </NativeSelect>
                    </FormControl>
                    <DemandFormula points={points} savePath={["config", "power_meter", "demand_formula"]} mainConfiguration = {true}/>
            </TreeItem>
          </TreeView>
            <FormControl >
                <TextField
                    id="agentIdInput"
                    name="agent_id"
                    label="Agent Id"
                    defaultValue= {state.agentId}
                    onChange={handleChange}/>
            </FormControl>
            <FormControl >
                <Tooltip title="ILC will manage controllable loads to maintain building demand at this value">
                    <TextField
                        id="demandLimitInput"
                        name="demand_limit"
                        label="Demand Limit"
                        defaultValue= {state.demandLimit}
                        onChange={handleChange}/>
                </Tooltip>
            </FormControl>
            <FormControl >
                <SmallLabel darkMode={darkMode}>Control Time (minutes)</SmallLabel>
                <Tooltip title="After ILC control brings the building demand to the demand target, ILC will hold control of devices for this amount of time, then the ILC will begin to release devices.">
                    <FloatInput
                        id="controlTimeInput"
                        name="control_time"
                        label="Control Time (minutes)"
                        type="number"
                        defaultValue= {state.controlTime}
                        step= '0.01'
                        min='0'
                        onChange={handleFloatChange}
                        darkMode={darkMode}
                    />
                </Tooltip>
            </FormControl>
            <FormControl >
                <SmallLabel darkMode={darkMode}>Curtailment Confirm</SmallLabel>
                <FloatInput
                    id="curtailmentConfirmInput"
                    name="curtailment_confirm"
                    label="Curtailment Confirm"
                    type="number"
                    defaultValue= {state.curtailmentConfirm}
                    step= '0.01'
                    min='0'
                    onChange={handleFloatChange}
                    darkMode={darkMode}
                />
            </FormControl>
            <FormControl >
                <SmallLabel darkMode={darkMode}>Curtailment Break (minutes)</SmallLabel>
                <Tooltip title="ILC will release devices in a staggered manner over amount of time">
                    <FloatInput
                        id="curtailmentBreakInput"
                        name="curtailment_break"
                        label="Curtailment Break (minutes)"
                        type="number"
                        defaultValue= {state.curtailmentBreak}
                        step= '0.01'
                        min='0'
                        onChange={handleFloatChange}
                        darkMode={darkMode}
                    />
                </Tooltip>
            </FormControl>
            <FormControl >
                <SmallLabel darkMode={darkMode}>Average Building Power Window (minutes)</SmallLabel>
                <Tooltip title="The ILC will use a moving average over this amount of time as feedback to manage the building demand">
                    <FloatInput
                        id="averageBuildingPowerWindow"
                        name="average_building_power_window"
                        label="Average Building Power Window (minutes)"
                        type="number"
                        defaultValue= {state.averageBuildingPowerWindow}
                        step= '0.01'
                        min='0'
                        onChange={handleFloatChange}
                        darkMode={darkMode}
                    />
                </Tooltip>
            </FormControl>
            <FormControlLabel
                control = {<CheckBox checked={state.stagger_release} onChange={handleCheckBoxChange} name="stagger_release"/>}
                label = "Stagger Release"
                class={darkMode ? "darkLabel" : ""}
            />
            <FormControlLabel
                control = {<CheckBox checked={state.stagger_off_time} onChange={handleCheckBoxChange} name="stagger_off_time"/>}
                label = "Stagger Off Time"
                class={darkMode ? "darkLabel" : ""}
            />
        </StyledBox>
    );
}