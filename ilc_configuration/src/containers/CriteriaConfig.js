import React, {useContext, useState} from 'react';
import { FormWrapper, FormControl, TreeView, TreeItem } from './_styledCriteriaConfig'
import { SmallHeader, TinyHeader } from '../components/common/_styledHeader'
import { PrimaryButton, LowkeyDeleteButton } from '../components/common/_styledButton'
import DevicesForm from '../components/CriteriaConfig/CriteriaConfigForm'
import MasterDriverContext from '../context/masterDriverContext';
import ClusterContext from '../context/clusterContext'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { InputLabel, NativeSelect } from '@material-ui/core'
import { clone } from '../utils/clone'
import defaultMapper from '../constants/jsonTemplates/mapper.json'
import { darkModeContext } from "../context/darkModeContext";
import MapperEditor from '../components/CriteriaConfig/mapperEditor/MapperEditor'
import {_CONTROL, _CRITERIA} from '../constants/strings'

export default function CriteriaConfig(props) {
    let {configuration, setConfiguration, devices} = useContext(MasterDriverContext);
    let {clusterFocus} = useContext(ClusterContext)
    const { darkMode } = useContext(darkModeContext);
    const [state, setState] = useState({
        addCriteriaDevice: false,
        criteriaDeviceElement: null,
        newDeviceName: ""
    })

    const toggleAugment = deviceName => e => {
        let newConfiguration = clone(configuration)
        if (newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"]){
            delete newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"];
        } else {
            newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"] =
            clone(newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["curtail"])
        }
        setConfiguration(newConfiguration)
    }

    const removeDevice = (deviceName) => {
        let newConfiguration = clone(configuration);
        delete newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName]
        delete newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName]
        setConfiguration(newConfiguration);
    }

    const buildCriteriaConfigs = () => {

        let criteriaConfigs =
        Object.keys(configuration[`${clusterFocus}${_CRITERIA}`]).map(deviceName => {
            if(deviceName === "mapper"){
                return
            }
            const viewAugment = configuration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"] ? true : false
            const deviceTopic = configuration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["curtail"]["device_topic"]
            return (
                <>
                    <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}>
                        <TreeItem
                            nodeId={`${deviceName}criteria`}
                            label={deviceTopic}
                            darkMode={darkMode}
                        >
                            <LowkeyDeleteButton 
                            style={{marginTop: ".5rem", display: "block"}} 
                            onClick={() => removeDevice(deviceName)}>
                            Remove Device
                            </LowkeyDeleteButton>
                            <DevicesForm name={deviceName} setting={"curtail"}/>
                            { viewAugment ?
                            <DevicesForm name={deviceName} setting={"augment"}/> : null}
                            <PrimaryButton
                                onClick={toggleAugment(deviceName)}
                            >
                                {(configuration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName] &&
                                configuration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"]) ?
                                "Remove Augment" : "Add Augment"}
                            </PrimaryButton>
                        </TreeItem>
                    </TreeView>
                </>
            )
        })
        if (!criteriaConfigs.length){
            criteriaConfigs = <DevicesForm name=""/>
        }
        return(
            criteriaConfigs
        )
    }

    const toggleAddCriteriaDevice = (event) => {
        setState({
            addCriteriaDevice: !state.addCriteriaDevice
        })
    }

    const handleAddDevice = (event) => {
        let newConfiguration = clone(configuration);
        let deviceName = event.target.value
        // look for duplicate
        if (configuration[`${clusterFocus}${_CRITERIA}`][deviceName]){
            alert("Device crtieria has already been chosen.")
            return;
        }
        const campus = configuration["config"]["campus"]
        const building = configuration["config"]["building"]
        newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName] = {}
        newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName] = {}
        newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["curtail"] = {
                device_topic: `${campus}/${building}/${deviceName}`
        }
        newConfiguration[`${clusterFocus}${_CRITERIA}`]["mapper"] = clone(defaultMapper)
        // set control config
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName] = {}
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName] = {
                device_topic: `${campus}/${building}/${deviceName}`,
                device_status: {
                    curtail: {
                        operation: "",
                        operation_args: [ ]
                    }
                },
                curtail_settings:{
                    point: "",
                    control_method: "",
                    load: 0
                },
        }
        setConfiguration(newConfiguration);
        setState({addCriteriaDevice: false, newDeviceName: ""})
    }

    return (
            <FormWrapper>
                <SmallHeader darkMode={darkMode}>
                    {`Criteria Configuration - ${clusterFocus}`}
                </SmallHeader>
                <MapperEditor/>
                <TinyHeader darkMode={darkMode}>Device Topics</TinyHeader>
                {buildCriteriaConfigs()}
                <FormControl >
                    <InputLabel
                        htmlFor="device"
                        style={state.addCriteriaDevice ? {} : {display: 'none'}}>
                        Choose Device
                    </InputLabel>
                    <NativeSelect
                        value={state.newDeviceName}
                        onChange={handleAddDevice}
                        inputProps={{
                            name: state.newDeviceName,
                            id: state.newDeviceName
                        }}
                        style={state.addCriteriaDevice ? {} : {display: 'none'}}
                    >
                        <option aria-label="None" value="" />
                        {devices.map(device => {return <option value={device["device_name"]}>{device["device_name"]}</option>})}
                    </NativeSelect>
                </FormControl>
                <PrimaryButton
                onClick={toggleAddCriteriaDevice}
                style={{display: Object.keys(configuration[`${clusterFocus}${_CRITERIA}`]).length ? null : "none"}}>
                    Add Device
                </PrimaryButton>
            </FormWrapper>

    );
}