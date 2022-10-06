import React, { useContext, useEffect, useState } from "react";
import { FormControl, TreeView, TreeItem } from "../_styledCriteriaConfigForm";
import ClusterContext from "../../../context/clusterContext";
import Status from "../formComponents/Status";
import Mapper from "../formComponents/Mapper";
import Constant from "../formComponents/Constant";
import History from "../formComponents/History";
import {
  _CRITERIA,
  OPERATION,
  OPERATION_ARGS,
} from "../../../constants/strings";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  InputLabel,
  NativeSelect,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { SmallLabel } from "../../common/_styledLabel";
import { FloatInput } from "../../common/_styledInput";
import EditIcon from "@material-ui/icons/Edit";
import FloatingCalculator from "../../common/FloatingCalculator";
import { clone } from "../../../utils/clone";

const operationTypes = ["formula", "status", "mappers", "constant", "history"];

export default function CriteriaDropdown(props) {
  const {
    criteria,
    setting,
    handleOperationChange,
    configuration,
    propsSetting,
    propsName,
    points,
    setConfiguration,
  } = props;

  const { clusterFocus } = useContext(ClusterContext);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);

  const [minValue, setMinValue] = useState(2);
  const [maxValue, setMaxValue] = useState(2);
  const [calculatorFormula, setCalculatorFormula] = useState();

  useEffect(() => {
    const formula = configuration[`${clusterFocus}${_CRITERIA}`][propsName][propsName][propsSetting][criteria["text"]]
    ? configuration[`${clusterFocus}${_CRITERIA}`][propsName][propsName][propsSetting][criteria["text"]][OPERATION]
    : "";
  const calculatorMin = configuration[`${clusterFocus}${_CRITERIA}`][propsName][propsName][propsSetting][criteria["text"]]
    ? configuration[`${clusterFocus}${_CRITERIA}`][propsName][propsName][propsSetting][criteria["text"]]["minimum"]
    : 1;
  const calculatorMax = configuration[`${clusterFocus}${_CRITERIA}`][propsName][propsName][propsSetting][criteria["text"]]
    ? configuration[`${clusterFocus}${_CRITERIA}`][propsName][propsName][propsSetting][criteria["text"]]["maximum"]
    : 1;
    setMinValue(calculatorMin);
    setMaxValue(calculatorMax);
    setCalculatorFormula(formula)
  }, [configuration[`${clusterFocus}${_CRITERIA}`][propsName][propsName][propsSetting][criteria["text"]]])
  
  /**
   * Save formula from floating calculator
   * @param {*} formula
   * @param {*} args
   * @param {*} alwaysArray
   * @param {*} curtailedArray
   * @param {*} clonedConfig
   */
  const handleCalculatorOperationChange = (
    formula,
    args,
    alwaysArray,
    curtailedArray,
    clonedConfig = clone(configuration)
  ) => {
    clonedConfig[`${clusterFocus}${_CRITERIA}`][propsName][propsName][
      propsSetting
    ][criteria["text"]][OPERATION] = formula;

    clonedConfig[`${clusterFocus}${_CRITERIA}`][propsName][propsName][
      propsSetting
    ][criteria["text"]]["operation_type"] = "formula";

    clonedConfig[`${clusterFocus}${_CRITERIA}`][propsName][propsName][
      propsSetting
    ][criteria["text"]][OPERATION_ARGS] = {
      always: alwaysArray,
      nc: curtailedArray,
    };

    setConfiguration(clonedConfig);
  };

  /**
   * Update state of rended textbox value
   * @param {*} e
   * @param {*} clonedConfig
   */
  const handleFloatChange = (e, clonedConfig = clone(configuration)) => {
    let newValue = e.target.value;
    if (e.target.name === "minimum") {
      setMinValue(newValue);
    } else {
      setMaxValue(newValue);
    }
  };

  /**
   * Update config when leaving text box
   * @param {*} e
   * @param {*} clonedConfig
   */
  const handleFloatBlur = (e, clonedConfig = clone(configuration)) => {
    clonedConfig[`${clusterFocus}${_CRITERIA}`][propsName][propsName][
      propsSetting
    ][criteria["text"]][e.target.name] = Number(e.target.value);
    setConfiguration(clonedConfig);
  };

  /**
   * Render component based on settingConfig[criteriaName]["operation_type"
   * @param {*} criteriaName
   */
  const buildCriteriaInputForms = (criteriaName) => {
    // default duplicate names for now
    const parentName = propsName;
    const settingConfig =
      configuration[`${clusterFocus}${_CRITERIA}`][parentName][parentName][
        propsSetting
      ];
    if (settingConfig[criteriaName]) {
      switch (settingConfig[criteriaName]["operation_type"]) {
        case "formula":
          return (
            <>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={10}>
                    <TextField
                      id="criteriaFormulaInput"
                      label="Operation"
                      type="string"
                      value={calculatorFormula}
                      disabled
                      multiline
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      style={{ marginTop: "14px" }}
                      onClick={() => {
                        setCalculatorModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <SmallLabel>Minimum</SmallLabel>
                      <TextField
                        name="minimum"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleFloatChange}
                        value={minValue}
                        onBlur={handleFloatBlur}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <SmallLabel>Maximum</SmallLabel>
                      <TextField
                        name="maximum"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleFloatChange}
                        value={maxValue}
                        onBlur={handleFloatBlur}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <FloatingCalculator
                  open={calculatorModalOpen}
                  handleClose={() => setCalculatorModalOpen(false)}
                  operationalArguments={points}
                  formula={calculatorFormula}
                  handleOperationChange={handleCalculatorOperationChange}
                  extraButtons={false}
                  curtailed={true}
                />
              </div>
            </>
          );
        case "status":
          return (
            <Status
              device={parentName}
              setting={propsSetting}
              criteria={criteriaName}
            />
          );
        case "mappers":
          return (
            <Mapper
              device={parentName}
              setting={propsSetting}
              criteria={criteriaName}
            />
          );
        case "constant":
          return (
            <Constant
              device={parentName}
              setting={propsSetting}
              criteria={criteriaName}
            />
          );
        case "history":
          return (
            <History
              device={parentName}
              setting={propsSetting}
              criteria={criteriaName}
            />
          );
        default:
          return;
      }
    }
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem
        nodeId={`${criteria["id"]}${clusterFocus}`}
        label={criteria["text"]}
      >
        <FormControl>
          <InputLabel htmlFor="device">Choose Operation Type</InputLabel>
          <NativeSelect
            value={
              setting[criteria["text"]]
                ? setting[criteria["text"]]["operation_type"]
                : ""
            }
            onChange={(event) => {
              return handleOperationChange(event, criteria["text"]);
            }}
          >
            <option aria-label="None" value="" />
            {operationTypes.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        {buildCriteriaInputForms(criteria["text"])}
      </TreeItem>
    </TreeView>
  );
}
