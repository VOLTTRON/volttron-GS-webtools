import React, { useState, useContext } from "react";
import MasterDriverContext from "../../../context/masterDriverContext";
import ClusterContext from "../../../context/clusterContext";
import { TreeView, TreeItem, Slider } from "./_styledCurtail";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Grid from "@material-ui/core/Grid";
import { darkModeContext } from "../../../context/darkModeContext";
import { _PAIRWISE } from "../../../constants/strings";
import pairwiseValidation from "../pairwiseValidation";
import { PrimaryButton } from "../../common/_styledButton";
import { Typography, IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
  decimalToIndex,
  indexToFraction,
  marks,
} from "../../../constants/pairwiseMarks";

const gcd = (a, b) => {
  if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

  return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
};

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
    value,
    parentCriteriaName,
    criteriaName,
    operation
  ) => {
    if (operation === "subtract") {
      if (value === 0.1) return;
      if (value < 1) {
        let originalValueIndex = decimalToIndex(value);
        value = indexToFraction[originalValueIndex + 1];
      } else {
        if (value === 1) {
          // Jump from 1 to .25
          value = 1 / 2;
        } else {
          value = value - 1;
        }
      }
    } else {
      if (value === 10) return;
      if (value < 1) {
        if (value === 0.5) {
          // Jump from .5 to 1
          value = 1;
        } else {
          let originalValueIndex = decimalToIndex(value);
          value = indexToFraction[originalValueIndex - 1];
        }
      } else {
        value = value + 1;
      }
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
        <div>
          <Grid container xs={12}>
            <Grid item xs={2}>
              Less
            </Grid>
            <Grid item xs={8}>
              {key}
            </Grid>
            <Grid item xs={2}>
              More
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  updatePairwiseValues(
                    value,
                    parentCriteriaName,
                    key,
                    "subtract"
                  );
                }}
                size="small"
              >
                <RemoveIcon />
              </IconButton>{" "}
            </Grid>
            <Grid item xs={10}>
              <Slider
                value={value < 1 && value != 0 ? -1 / value : value}
                min={-10}
                max={10}
                step={null}
                marks={marks}
                scale={(x) => (x < 0 ? x * -1 : x)}
                aria-labelledby={clusterFocus}
                color="primary"
                style={{"pointerEvents": "none"}}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  updatePairwiseValues(value, parentCriteriaName, key, "add");
                }}
                size="small"
              >
                <AddIcon />
              </IconButton>{" "}
            </Grid>
          </Grid>
        </div>
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
