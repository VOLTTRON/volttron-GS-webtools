import React, {useContext, useState} from 'react';
import { FormWrapper, FormControl, TreeView, TreeItem } from './_styledCriteriaConfig'
import { SmallHeader, TinyHeader } from '../components/common/_styledHeader'
import { PrimaryButton } from '../components/common/_styledButton'
import ControlConfigForm from '../components/ControlConfig/ControlConfigForm'
import MasterDriverContext from '../context/masterDriverContext';
import ClusterContext from '../context/clusterContext'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { InputLabel, NativeSelect } from '@material-ui/core'
import { _CONTROL } from '../constants/strings'
import { clone } from '../utils/clone'
import { darkModeContext } from "../context/darkModeContext";
import {_CRITERIA} from '../constants/strings'

export default function ControlConfig(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);
    const {clusterFocus} = useContext(ClusterContext)
    const { darkMode } = useContext(darkModeContext);

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

    const buildControlConfigs = () => {

        let controlConfigs =
        Object.keys(configuration[`${clusterFocus}${_CRITERIA}`]).map(deviceName => {
            if(deviceName === "mapper"){
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
                {buildControlConfigs()}
            </FormWrapper>

    );
}