import React, { useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton } from '@material-ui/core';
import { Button, Input } from './_styledLandingPage'
import { default as MenuIcon } from '@material-ui/icons/Menu'
import {default as history} from '../history';
import { default as MasterDriverContext } from "../context/masterDriverContext"
import { MasterDriverProvider } from '../context/masterDriverContext'
import { SmallHeader } from '../components/common/_styledHeader'
import configuration from '../constants/jsonTemplates/configuration.json'

export default function LandingPage(props) {
    // const masterDriverContext = useContext(MasterDriverContext);
    // const [masterDriverConfig, setMasterDriverConfig] = useState(JSON.parse(localStorage.getItem("ilc-config-master-driver-config")))
    const {rerender, setRerender} = useContext(MasterDriverContext);
    const masterDriverUploadHandler = event => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            localStorage.setItem("ilc-config-master-driver-config", reader.result)
            setRerender(!rerender)
        };
        reader.onerror = function() {
            console.log(reader.error);
        };
        //clear out existing configuration
        localStorage.setItem("ilc-configuration-store", JSON.stringify(configuration))
        history.push("/main")

    };


    
    return (
        <div>
            <SmallHeader style={{textAlign: "center"}}>
                Upload Master Driver Configuration Store
            </SmallHeader>
            <Input type ="file" onChange = {masterDriverUploadHandler}>
            </Input>
        </div>
    );
}
