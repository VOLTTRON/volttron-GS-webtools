import React, {useContext, useState, Fragment} from 'react'
import { InputLabel, NativeSelect } from '@material-ui/core'
import MasterDriverContext from '../../context/masterDriverContext';
import ClusterContext from '../../context/clusterContext'
import { darkModeContext } from '../../context/darkModeContext'
import { FormControl, TreeView, TreeItem } from './_styledCriteriaConfigForm'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DemandFormula from '../common/Calculator'
import Status from './formComponents/Status'
import Mapper from './formComponents/Mapper'
import Constant from './formComponents/Constant'
import History from './formComponents/History'
import { VerySmallHeader } from '../common/_styledHeader'
import { _CRITERIA, _CONTROL } from '../../constants/strings'
import defaultMapper from '../../constants/jsonTemplates/mapper.json'

const operationTypes = [
    "formula", "status", "mapper", "constant", "history"
]

export default function DevicesForm (props) {
    const { devices, configuration, setConfiguration} = useContext(MasterDriverContext);
    const {clusterFocus} = useContext(ClusterContext);
    const {darkMode} = useContext(darkModeContext);
    const clone = (obj) => JSON.parse(JSON.stringify(obj));

    const handleDeviceChange = (event) => {

        const deviceName = event.target.value
        if (configuration[`${clusterFocus}${_CRITERIA}`][deviceName]){
            alert("Device crtieria has already been chosen.")
            return;
        }
        let newConfiguration = clone(configuration);
        const campus = configuration["config"]["campus"]
        const building = configuration["config"]["building"]

        if (Object.keys(newConfiguration[`${clusterFocus}${_CRITERIA}`]).length){
            const oldName = props.name;
            if(newConfiguration[`${clusterFocus}${_CRITERIA}`][oldName][oldName]){
                const criteriaContent = clone(configuration[`${clusterFocus}${_CRITERIA}`][oldName][oldName]);
                delete newConfiguration[`${clusterFocus}${_CRITERIA}`][oldName];
                newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName] = {}
                newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName] = criteriaContent;
                newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["curtail"]["device_topic"] = `${campus}/${building}/${deviceName}`
                if(newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"]){
                    newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"]["device_topic"] = `${campus}/${building}/${deviceName}`
                }
                const controlContent = clone(configuration[`${clusterFocus}${_CONTROL}`][oldName][oldName])
                delete newConfiguration[`${clusterFocus}${_CONTROL}`][oldName];
                newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName] = {};
                newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName] = controlContent;
                newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName]["device_topic"] = `${campus}/${building}/${deviceName}`
            }
        } else {
            const mapper = defaultMapper;
            newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName] = {}
            newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName] = 
                {   
                    curtail: {
                        device_topic: `${campus}/${building}/${deviceName}`
                    },
                }
            newConfiguration[`${clusterFocus}${_CRITERIA}`]["mapper"] = defaultMapper
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
                    curtail_setting:{
                        point: "",
                        control_method: "",
                        load:0
                    },    
            }
        }
        // delete old criteria config
        if(props.name !== ""){
            delete newConfiguration[`${clusterFocus}${_CRITERIA}`][props.name]
        }
        setConfiguration(newConfiguration)
        return
    }

    const handleOperationChange = (event, criteriaName) => {
        // update configuration
        const type = event.target.value
        let newConfiguration = clone(configuration);
        newConfiguration[`${clusterFocus}${_CRITERIA}`][props.name][props.name][props.setting][criteriaName] = 
        { "operation_type" : type}
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

    let points = getPoints(props.name);


    const buildCriteriaInputForms = (criteriaName) => {
        const {name, setting} = props;
        // default duplicate names for now
        const parentName = name;
        const settingConfig = configuration[`${clusterFocus}${_CRITERIA}`][name][name][setting]
        if(settingConfig[criteriaName]){
            switch(settingConfig[criteriaName]["operation_type"]) {
                case "formula":
                    return <DemandFormula points={points} savePath={[`${clusterFocus}${_CRITERIA}`, parentName, name, setting, criteriaName]} mainConfiguration = {false}/>
                case "status": 
                    return <Status device={name} setting={setting} criteria={criteriaName}/>
                case "mapper":
                    return <Mapper device={name} setting={setting} criteria={criteriaName}/>
                case "constant":
                    return <Constant device={name} setting={setting} criteria={criteriaName}/>
                case "history":
                    return <History device={name} setting={setting} criteria={criteriaName}/>
                default:
                    return
            }
        }
    }

    const buildCriteriaDropdowns = () => {
        const setting = configuration[`${clusterFocus}${_CRITERIA}`][props.name][props.name][props.setting]
        let criteriaArray = configuration["criteria"][clusterFocus].map( criteria => {
            return (
                <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}>
                    <TreeItem nodeId={`${criteria["id"]}${clusterFocus}`} label={criteria["text"]}>
                        <FormControl >
                            <InputLabel htmlFor="device">Choose Operation Type</InputLabel>
                            <NativeSelect
                                value={setting[criteria["text"]] ? setting[criteria["text"]]["operation_type"] : ""} 
                                onChange={(event) => { return handleOperationChange(event, criteria["text"])}}
                            >
                                <option aria-label="None" value="" />
                                {operationTypes.map(type => {return <option value={type}>{type}</option>})}
                            </NativeSelect>
                        </FormControl>
                        {buildCriteriaInputForms(criteria["text"])}
                    </TreeItem>
                </TreeView>
            )
        })
        return criteriaArray
    }

    return(
            <FormControl >
                {props.setting == "curtail" || !props.name ? 
                <>
                <InputLabel htmlFor="device">Device</InputLabel>
                <NativeSelect
                    value={props.name}
                    onChange={handleDeviceChange}
                    inputProps={{
                        name: props.name,
                        id: props.name
                    }}
                >
                    <option aria-label="None" value="" />
                    {devices.map(device => {return <option value={device["device_name"]}>{device["device_name"]}</option>})}
                </NativeSelect>
                </> : null }
                <VerySmallHeader darkMode={darkMode}>{props.setting}</VerySmallHeader>
                {props.name ? buildCriteriaDropdowns() : null}
            </FormControl>
    )

}