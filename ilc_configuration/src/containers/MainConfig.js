import React, { useState, useContext} from 'react';
import MasterDriverContext from '../context/masterDriverContext';
import MainConfigForm from '../components/MainConfig/MainConfigForm'
import Grid from '@material-ui/core/Grid';
import { FormWrapper } from './_styledMainConfig'
import { SmallHeader } from '../components/common/_styledHeader'
import { darkModeContext } from "../context/darkModeContext";

export default function MainConfig(props) {
    let {parsedMDC, campuses, buildings, devices} = useContext(MasterDriverContext);
    const { darkMode } = useContext(darkModeContext);

    return (
        <FormWrapper>
            <SmallHeader darkMode={darkMode}>
                Main Configuration
            </SmallHeader>
            <MainConfigForm/>
        </FormWrapper>
    );
}