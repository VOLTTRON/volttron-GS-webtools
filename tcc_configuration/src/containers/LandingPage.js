import React, { useContext} from 'react';
import { Input } from '@material-ui/core'
import {default as history} from '../history';
import { default as MasterDriverContext } from "../context/masterDriverContext"
import configuration from '../constants/jsonTemplates/configuration.json'
import { ModedFormHeader } from '../components/common/utility';

export default function LandingPage(props) {
    const {rerender, setRerender} = useContext(MasterDriverContext);

    const masterDriverUploadHandler = event => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            localStorage.setItem("tcc-config-master-driver-config", reader.result)
            setRerender(!rerender)
        };
        reader.onerror = function() {
            console.log(reader.error);
        };
        //clear out existing configuration
        localStorage.setItem("tcc-configuration-store", JSON.stringify(configuration))
        history.push("/campus")
    };


    return (
        <div>
            {ModedFormHeader("Upload Master Driver Configuration Store", "medium")}
            <Input
                type="file"
                color="primary"
                onChange={masterDriverUploadHandler}
            />
        </div>
    );
}
