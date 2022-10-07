import React, {useContext, useState} from 'react';
import { FormWrapper, FormControl, TreeView, TreeItem } from './_styledCriteriaConfig'
import { SmallHeader, TinyHeader } from '../components/common/_styledHeader'
import { PrimaryButton } from '../components/common/_styledButton'
import ControlConfigForm from '../components/ControlConfig/ControlConfigForm'
import MasterDriverContext from '../context/masterDriverContext';
import ClusterContext from '../context/clusterContext'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { InputLabel, Select } from '@material-ui/core'
import { _CONTROL } from '../constants/strings'
import { clone } from '../utils/clone'
import { darkModeContext } from "../context/darkModeContext";
import NotificationContext from "../context/notificationContext"
import {_CRITERIA} from '../constants/strings'
import 'react-notifications/lib/notifications.css'

export default function ControlConfig(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);
    const {clusterFocus} = useContext(ClusterContext)
    const { darkMode } = useContext(darkModeContext);
    const { setNotification } = useContext(NotificationContext);
    const devices = Object.keys(configuration[`${clusterFocus}${_CONTROL}`]);
    const [state, setState] = useState({
        copyFrom: devices.length ? devices[0] : null,
        copyTo: devices.length > 1 ? devices[1] : null 
    });

    const handleChange = (event) => {
        const name = event.target.name
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const toggleAugment = deviceName => e => {
        let newConfiguration = clone(configuration)
        if (newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_status"]["augment"]){
            delete newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_status"]["augment"];
            delete newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["augment_setting"];
        } else {
            newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_status"]["augment"] =
            clone(newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_status"]["curtail"])
            newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["augment_setting"] =
            clone(newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["curtail_setting"])
        }
        setConfiguration(newConfiguration)
    }

    const copyValues = () => {
        const {copyFrom, copyTo} = state;
        if(!copyTo){
            setNotification("warning", "Enter \"Copy To\" value", null, 2000)
            return;
        }
        let newConfiguration = clone(configuration)
        if(copyTo === "all"){
            for(const [key, value] of Object.entries(newConfiguration[`${clusterFocus}${_CONTROL}`])){
                if(key === copyFrom){
                    continue;
                }
                value[key]["device_status"] = clone(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["device_status"])
                value[key]["curtail_setting"] = clone(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["curtail_setting"])
                if(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["augment_setting"]){
                    value[key]["augment_setting"] = clone(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["augment_setting"])
                }
            }
        } else {
            newConfiguration[`${clusterFocus}${_CONTROL}`][copyTo][copyTo]["device_status"] = 
            clone(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["device_status"])
            newConfiguration[`${clusterFocus}${_CONTROL}`][copyTo][copyTo]["curtail_setting"] = 
            clone(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["curtail_setting"])
            if(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["augment_setting"]){
                newConfiguration[`${clusterFocus}${_CONTROL}`][copyTo][copyTo]["augment_setting"] = 
                clone(newConfiguration[`${clusterFocus}${_CONTROL}`][copyFrom][copyFrom]["augment_setting"])
            }
        }
        setConfiguration(newConfiguration)
        // TODO: figure out how to appropriately update copyTo components
        setNotification("success", "Copying values...")
        window.setTimeout(function (){window.location.reload()}, 2000)

    }

    const copyCenter = () => {
        const {copyFrom, copyTo} = state;
        return(
            devices.length > 1 ? 
            <>
            <TreeView 
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}>
                <TreeItem
                nodeId={"copyCenter"}
                key={"copyCenter"}
                label={"Copy Center"}
                darkMode={darkMode}
                >
                    <FormControl >
                        <InputLabel htmlFor="campus">Copy Values From</InputLabel>
                        <Select
                            native
                            value={copyFrom ? copyFrom : devices[0]}
                            onChange={handleChange}
                            inputProps={{
                                name: 'copyFrom',
                                id: 'copyFrom'
                            }}
                        >
                            {Object.keys(configuration[`${clusterFocus}${_CONTROL}`]).map((deviceName, index) => {return <option key={index} value={deviceName}>{deviceName}</option>})}
                        </Select>
                    </FormControl>
                    <FormControl >
                        <InputLabel htmlFor="campus">Copy Values To</InputLabel>
                        <Select
                            native
                            value={copyTo ? copyTo : devices[1]}
                            onChange={handleChange}
                            inputProps={{
                                name: 'copyTo',
                                id: 'copyTo'
                            }}
                        >
                            <option aria-label="None" value="" />
                            {devices.length > 2 ? <option value={"all"}>{"All"}</option> : null}
                            {Object.keys(configuration[`${clusterFocus}${_CONTROL}`]).map((deviceName, index) => { 
                                if(copyFrom === deviceName){
                                    return(null)
                                }
                                return  <option key={index} value={deviceName}>{deviceName}</option>})}
                        </Select>
                    </FormControl>
                    <PrimaryButton
                        onClick={copyValues}
                    >
                        Copy
                    </PrimaryButton>
                </TreeItem>
            </TreeView>
            </> : null
        )
    }

    const buildControlConfigs = () => {

        let controlConfigs =
        Object.keys(configuration[`${clusterFocus}${_CRITERIA}`]).map(deviceName => {
            if(deviceName === "mappers"){
                return;
            }
            const viewAugment = configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_status"]["augment"] ? true : false
            const deviceTopic = configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_topic"]
            return (
                <>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}>
                        <TreeItem
                            nodeId={`${deviceName}control`}
                            label={deviceTopic}
                            darkMode={darkMode}
                        >
                            <ControlConfigForm deviceName={deviceName} setting={"curtail"}/>
                            {viewAugment ? <ControlConfigForm deviceName={deviceName} setting={"augment"}/> : null}
                            <PrimaryButton
                                onClick={toggleAugment(deviceName)}
                            >
                                {(configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_status"]["augment"]) ?
                                "Remove Augment" : "Add Augment"}
                            </PrimaryButton>
                        </TreeItem>
                    </TreeView>
                </>
            )
        })
        return(
            controlConfigs.length ? controlConfigs : <TinyHeader>{` --- Add a device to the Criteria Configuration ---`}</TinyHeader>
        )
    }

    return (
            <FormWrapper>
                <SmallHeader darkMode={darkMode}>
                    {`Control Configuration - ${clusterFocus}`}
                </SmallHeader>
                {copyCenter()}
                <TinyHeader darkMode={darkMode}>
                    {`Configurations`}
                </TinyHeader>
                {buildControlConfigs()}
            </FormWrapper>
    );
}