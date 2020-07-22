import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { FormWrapper } from './_styledMainConfig'
import { default as Criteria } from '../components/PairwiseConfig/Criteria/Criteria'
import Curtail from '../components/PairwiseConfig/Curtail/Curtail'
import { SmallHeader } from '../components/common/_styledHeader'
import { darkModeContext } from "../context/darkModeContext";
import MasterDriverContext from '../context/masterDriverContext';
import ClusterContext from '../context/clusterContext';
import pairwiseTemplate from '../constants/jsonTemplates/pairwiseCurtail.json'
import {_PAIRWISE} from '../constants/strings'


export default function MainConfig(props) {
    const { darkMode } = useContext(darkModeContext);
    let { configuration, setConfiguration } = useContext(MasterDriverContext);
    let { clusterFocus } = useContext(ClusterContext);

    const [focus, setFocus] = useState(clusterFocus);
    const [showAugment, setShowAugment ] = useState(configuration[`${clusterFocus}${_PAIRWISE}`]["augment"] ? true : false);

    if (focus !== clusterFocus) {
        setFocus(clusterFocus);
        setShowAugment(configuration[`${clusterFocus}${_PAIRWISE}`]["augment"])
    }

    const addAugment = () => {
        let config = configuration;
        config[`${clusterFocus}${_PAIRWISE}`]["augment"] = JSON.parse(JSON.stringify(config[`${clusterFocus}${_PAIRWISE}`]["curtail"]))
        setConfiguration(config);
    }

    const removeAugment = () => {
        let config = configuration;
        delete config[`${clusterFocus}${_PAIRWISE}`]["augment"]
        setConfiguration(config);
    }

    const setAugment = () => {
        if (showAugment) {
            var response = window.confirm("Do you really want to remove the augment?");
            if (response === true){
                removeAugment();
                setShowAugment(false);
            }
        } else {
            addAugment();
            setShowAugment(true);
        }
    }

    return (
            <FormWrapper>
                <SmallHeader darkMode={darkMode}>
                    {`Pairwise Criteria Order - ${clusterFocus}`}
                </SmallHeader>
                <Criteria/>
                <SmallHeader darkMode={darkMode}>
                    Pairwise Criteria
                </SmallHeader>
                <Curtail name="curtail"/>
                { showAugment ? <Curtail name="augment"/> : '' }
                <Button variant="contained" color="secondary" onClick={e => setAugment()}>
                    { showAugment ? "Remove Augment" : "Add Augment" }
                </Button>
            </FormWrapper>
    );
}