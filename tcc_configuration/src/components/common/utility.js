import React, { useContext } from "react";
import MasterDriverContext from "../../context/masterDriverContext";
import { FormHeader } from "../common/_styledFormControl";
import modelTypes from '../../constants/jsonTemplates/mapped.json';


export const cloneObj = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const ModedFormHeader = (headerText, headerType) => {
    const { darkMode } = useContext(MasterDriverContext);
    let style = {}
    if (darkMode) {style = {color: "white"}}

    if (headerType === "medium") {
            return <FormHeader style={style}><h2>{headerText}</h2></FormHeader>
    } else if (headerType === "small") {
            return <FormHeader style={style}><h3>{headerText}</h3></FormHeader>
    }
}

export const initTypes = (config) => {
    let types = []
    config.forEach((element, i) => {
        const mappedVal = element["mapped"]
        if(mappedVal in modelTypes["ahu"]) {
            types[i] = "ahu"
        } else if(mappedVal in modelTypes["light"]) {
            types[i] = "light"
        } else if(mappedVal in modelTypes["vav"]) {
            types[i] = "vav"
        } else {
            types[i] = ""
        }
    })
    return types
}

export const initMapped = (config) => {
    let map = []
    config.forEach((element, i) => {
        map[i] = element["mapped"]
    })
    return map
}

export const findDeviceIndex = (deviceName, devices) => {
    let devIndex = -1
    for (let dev in devices) {
        if(devices[dev]["device_name"] === deviceName) {
            devIndex = dev;
        }
    }
    return devIndex
}