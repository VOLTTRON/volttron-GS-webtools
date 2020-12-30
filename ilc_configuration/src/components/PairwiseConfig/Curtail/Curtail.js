import React, { useState, useContext } from "react";
import MasterDriverContext from "../../../context/masterDriverContext";
import ClusterContext from "../../../context/clusterContext";
import { TreeView, TreeItem } from "./_styledCurtail";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { darkModeContext } from "../../../context/darkModeContext";
import { _PAIRWISE } from "../../../constants/strings";
import pairwiseValidation from "../pairwiseValidation";
import { PrimaryButton } from "../../common/_styledButton";
import { Typography } from "@material-ui/core";
import CurtailSlider from "./CurtailSlider/CurtailSlider";

export default function Curtail(props) {
  const { darkMode } = useContext(darkModeContext);
  let { configuration, setConfiguration } = useContext(MasterDriverContext);
  let { clusterFocus } = useContext(ClusterContext);

  const [state, setState] = useState({
    validationVisible: false,
    validationMessage: "",
    consistencyRatio: null,
  });

  const updatePairwiseValues = (
    event,
    value,
    parentCriteriaName,
    criteriaName
  ) => {
    if (value < 0) {
      value = -(1 / value);
    }
    configuration[`${clusterFocus}${_PAIRWISE}`][props.name][
      parentCriteriaName
    ][criteriaName] = value;
    setConfiguration(configuration);
    setState({ validationVisible: false });
  };

  const createCriteriaSliders = (parentCriteriaName, criteriaObj) => {
    let sliders = [];

    for (let [key, value] of Object.entries(criteriaObj)) {
      sliders.push(
        <CurtailSlider
          clusterFocus={clusterFocus}
          key={key}
          dataKey={key}
          value={value}
          updatePairwiseValues={updatePairwiseValues}
          parentCriteriaName={parentCriteriaName}
        />
      );
    }
    return sliders;
  };

  const createCurtailDropdowns = () => {
    let index = 1;
    let treeItems = [];
    if (configuration[`${clusterFocus}${_PAIRWISE}`][props.name]) {
      for (let [key, value] of Object.entries(
        configuration[`${clusterFocus}${_PAIRWISE}`][props.name]
      )) {
        treeItems.push(
          <TreeItem
            nodeId={`${clusterFocus}${index + 1}`}
            label={key}
            darkMode={darkMode}
          >
            {createCriteriaSliders(key, value)}
          </TreeItem>
        );
        index++;
      }
    }
    return treeItems;
  };

  const handlePairwiseValidation = () => {
    const consistencyRatio = pairwiseValidation(
      configuration,
      clusterFocus,
      props.name
    );
    if (consistencyRatio < 0.2) {
      setState({
        validationVisible: true,
        validationMessage: `Pairwise Criteria VALID`,
        consistencyRatio: consistencyRatio,
      });
    } else {
      setState({
        validationVisible: true,
        validationMessage: "Pairwise Criteria INVALID. Please revise. ",
        consistencyRatio: consistencyRatio,
      });
    }
  };

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultExpanded={[clusterFocus]}
    >
      {configuration[`${clusterFocus}${_PAIRWISE}`][props.name] ? (
        <TreeItem
          nodeId={clusterFocus}
          label={`${props.name} for ${clusterFocus}`}
          darkMode={darkMode}
        >
          <PrimaryButton
            onClick={handlePairwiseValidation}
            disabled={state.validationVisible}
          >
            Validate
          </PrimaryButton>
          <Typography
            style={{ display: state.validationVisible ? null : "none" }}
            variant="h6"
          >
            {state.validationMessage}
          </Typography>
          {createCurtailDropdowns()}
        </TreeItem>
      ) : (
        ""
      )}
    </TreeView>
  );
}
