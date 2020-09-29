import React, { useState, useContext } from 'react';
import { FormWrapper } from '../common/_styledFormControl';
import DeviceAHU from './DeviceAHU';
import DeviceLight from './DeviceLight';
import DeviceRTU from './DeviceRTU';
import DeviceVAV from './DeviceVAV';
import { ModedFormHeader } from '../common/utility';
import { default as MasterDriverContext } from "../../context/masterDriverContext";

export default function Device(props) {
    const {configuration} = useContext(MasterDriverContext);

    const [toggle, setToggle] = useState({
        ahu: false,
        light: false,
        rtu: false,
        vav: false
    })

    const initType = () => {
        let showing = configuration["device"]

        if (showing !== null) {
            let togs = toggle
            togs[showing] = true
            setToggle(togs)
        }
        return showing;
    }

    const [type] = useState(initType);

    return (
        <FormWrapper>
            {ModedFormHeader(`Device Configuration - ${type.toUpperCase()}`, "medium")}
            {toggle["ahu"] ? <DeviceAHU /> : ""}
            {toggle["light"] ? <DeviceLight /> : ""}
            {toggle["rtu"] ? <DeviceRTU /> : ""}
            {toggle["vav"] ? <DeviceVAV /> : ""}
        </FormWrapper>
    );
}
