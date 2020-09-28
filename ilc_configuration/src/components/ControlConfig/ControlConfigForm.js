import React, {useContext, useState} from 'react'
import MasterDriverContext from '../../context/masterDriverContext'
import ClusterContext from '../../context/clusterContext'
import { darkModeContext } from "../../context/darkModeContext";
import Calculator from '../common/Calculator'
import { InputLabel, NativeSelect, FormControlLabel, RadioGroup, Radio} from '@material-ui/core'
import { FormControl } from '../common/_styledFormControl'
import {TinyHeader} from '../common/_styledHeader'
import { SmallLabel } from '../common/_styledLabel'
import { FloatInput } from '../common/_styledInput'
import { _CONTROL } from '../../constants/strings'
import { clone } from '../../utils/clone'
import { OPERATION } from '../../constants/strings'
import { TreeView, TreeItem } from '../common/_styledTree'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function ControlConfigForm (props) {
    const { darkMode } = useContext(darkModeContext);
    const { devices, configuration, setConfiguration} = useContext(MasterDriverContext);
    const {clusterFocus} = useContext(ClusterContext);
    const {deviceName, setting} = props;
    const isLoadCalc = configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`][`load`][OPERATION]
    const [loadConfig, setLoadConfig] = useState(isLoadCalc ? "calculator" : "float");

    const handleChange = (event) => {
        let newConfiguration = clone(configuration)
        const name = event.target.name
        const value = event.target.value
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`][name] = value
        setConfiguration(newConfiguration)
    }

    const handleControlMethodChange = (event) => {
        let newConfiguration = clone(configuration)
        const point = newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["point"]
        const load = newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["load"]
        const name = event.target.name
        const controlMethod = event.target.value
        let traveller = newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["offset"]
        if (!traveller){
            traveller = newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["value"]
        }
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`] = {}
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["point"] = point;
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["load"] = load;
        if (traveller && (controlMethod === "value" || controlMethod === "offset")){
            newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`][controlMethod] = traveller;
        }
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`][name] = controlMethod
        if (controlMethod === "equation"){
            newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["equation"] = {}
            newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["equation"]["operation"] = ""
            newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["equation"]["operation_args"] = []

        }
        setConfiguration(newConfiguration)
    }

    const handleFloatChange = (event, newConfiguration = clone(configuration)) => {
        const name = event.target.name
        const floatValue = parseFloat(event.target.value)
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`][name] = floatValue
        setConfiguration(newConfiguration)
    }

    const getPoints = (deviceName) => {
        let points = [];
        for(let deviceIndex in devices){
            if(devices[deviceIndex]["device_name"] === deviceName){
                points = devices[deviceIndex]["points"]
            }
        }
        return points;
    }

    const points = getPoints(props.deviceName);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const createSettings = () => {
        return(
            <>
            <FormControl >
                <InputLabel htmlFor="device">Point</InputLabel>
                <NativeSelect
                    value={configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["point"]}
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
            </>
        )
    }

    const createControlMethodContent = () => {
        const controlMethod = configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["control_method"]
        switch(controlMethod){
            case "offset":
                return(
                    <>
                    <FormControl >
                        <SmallLabel darkMode={darkMode}>Offset</SmallLabel>
                        <FloatInput
                            id="controlTimeInput"
                            name="offset"
                            label="Offset"
                            type="number"
                            defaultValue={0}
                            value= {configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["offset"]}
                            step= '0.01'
                            onChange={handleFloatChange}
                            darkMode={darkMode}
                        />
                    </FormControl>
                    </>
                )
            case "value":
                return(
                    <>
                    <FormControl >
                        <SmallLabel darkMode={darkMode}>Value</SmallLabel>
                        <FloatInput
                            id="controlTimeInput"
                            name="value"
                            label="Value"
                            type="number"
                            defaultValue={0}
                            value= {configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["value"]}
                            step= '0.01'
                            onChange={handleFloatChange}
                            darkMode={darkMode}
                        />
                    </FormControl>
                    </>
                )
            case "equation":
                return(
                    <Calculator points={points} savePath={[`${clusterFocus}${_CONTROL}`, props.deviceName, props.deviceName, `${props.setting}_setting`, "equation"]} mainConfiguration = {false}/>
                )
        }
    }

    const loadToggle = () => {
        return(
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                    control = {<Radio 
                        checked = {loadConfig === "float"}
                        onChange = {() => setLoadConfig("float")}
                    />}
                    value = "float"
                    label = "Float"
                />
                <FormControlLabel
                    control = {
                        <Radio
                            checked = {loadConfig === "calculator"}
                            onChange = {() => setLoadConfig("calculator")}
                        />
                    }
                    value = "calculator"
                    label = "Calculator"
                />
            </RadioGroup>
        )
    }

    const createControlMethods = () => {
        const controlMethods = [
            "offset",
            "value",
            "equation"
        ]
        return(
            <>
            <FormControl >
                <InputLabel htmlFor="device">Control Method</InputLabel>
                <NativeSelect
                    value={configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["control_method"]}
                    onChange={handleControlMethodChange}
                    inputProps={{
                        name: 'control_method',
                        id: 'controlMethodInput'
                    }}
                >
                    <option aria-label="None" value="" />
                    {controlMethods.map(method => {return <option value={method}>{method}</option>})}
                </NativeSelect>
            </FormControl>
            {createControlMethodContent()}
            <FormControl >
                <TinyHeader darkMode={darkMode} style={{marginTop : "1rem"}}>Load</TinyHeader>
                {loadToggle()}
                {loadConfig === "float" ?
                    <FloatInput
                        id="controlTimeInput"
                        name="load"
                        label="Load"
                        type="number"
                        defaultValue= {configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][`${setting}_setting`]["load"]}
                        step= '0.01'
                        onChange={handleFloatChange}
                        darkMode={darkMode}
                    /> : 
                    <Calculator  points={points} savePath={[`${clusterFocus}${_CONTROL}`, props.deviceName, props.deviceName, `${setting}_setting`, `load`]}/>
                }
            </FormControl>
            </>
        )
    }

    return(
            <>
            <TinyHeader darkMode={darkMode}>{capitalizeFirstLetter(props.setting)}</TinyHeader>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem nodeId={`${setting}_device_status`} label={`${capitalizeFirstLetter(props.setting)} Device Status`} darkMode={darkMode}>
                    <Calculator points={points} savePath={[`${clusterFocus}${_CONTROL}`, props.deviceName, props.deviceName, "device_status", props.setting]} deviceStatus = {true}/>
                </TreeItem>
                <TreeItem darkMode={darkMode} nodeId={`${setting}_device_setting`} label={`${capitalizeFirstLetter(props.setting)} Settings`}>
                    {createSettings()}
                    {createControlMethods()}
                </TreeItem>
            </TreeView>
            </>
    )

}