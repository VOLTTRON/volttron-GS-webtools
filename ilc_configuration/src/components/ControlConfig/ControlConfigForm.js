import React, { useContext, useState } from "react";
import MasterDriverContext from "../../context/masterDriverContext";
import ClusterContext from "../../context/clusterContext";
import { darkModeContext } from "../../context/darkModeContext";
import FloatingCalculator from "../common/FloatingCalculator";
import {
  InputLabel,
  NativeSelect,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
  TextField,
  Grid,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { FormControl } from "../common/_styledFormControl";
import { TinyHeader } from "../common/_styledHeader";
import { SmallLabel } from "../common/_styledLabel";
import { FloatInput } from "../common/_styledInput";
import { _CONTROL, OPERATION, OPERATION_ARGS } from "../../constants/strings";
import { clone } from "../../utils/clone";
import { TreeView, TreeItem } from "../common/_styledTree";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Calculator from "../common/Calculator"

export default function ControlConfigForm(props) {
  const { darkMode } = useContext(darkModeContext);
  const { devices, configuration, setConfiguration } = useContext(
    MasterDriverContext
  );
  const { clusterFocus } = useContext(ClusterContext);

  const [curtailCalculatorFormula, setCurtailCalculatorFormula] = useState(
    configuration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ]["device_status"][props.setting][OPERATION]
  );

  const [loadCalculatorFormula, setLoadCalculatorFormula] = useState(
    configuration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ][`${props.setting}_setting`]["load"]
      ? configuration[`${clusterFocus}${_CONTROL}`][props.deviceName][
          props.deviceName
        ][`${props.setting}_setting`]["load"][OPERATION]
      : null
  );

  const [loadCalculatorFormulaArgs, setLoadCalculatorFormulaArgs] = useState(
    configuration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ][`${props.setting}_setting`]["load"]
      ? configuration[`${clusterFocus}${_CONTROL}`][props.deviceName][
          props.deviceName
        ][`${props.setting}_setting`]["load"][OPERATION_ARGS]
      : []
  );

  const { deviceName, setting } = props;
  const isLoadCalc =
    configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ][`load`][OPERATION];
  const [loadConfig, setLoadConfig] = useState(
    isLoadCalc ? "calculator" : "float"
  );

  const [curtailCalculatorOpenModal, setCurtailCalculatorOpenModal] = useState(
    false
  );
  const [loadCalculatorOpenModal, setLoadCalculatorOpenModal] = useState(false);

  const handleCurtailCalculatorChange = (
    forumla,
    formulaArgs,
    alwaysArray,
    curtailedArray,
    newConfiguration = clone(configuration)
  ) => {
    debugger;
    newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ]["device_status"][props.setting][OPERATION] = forumla;
    newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ]["device_status"][props.setting][OPERATION_ARGS] = formulaArgs;
    setConfiguration(newConfiguration);
    setCurtailCalculatorFormula(forumla);
  };

  const handleLoadCalculatorChange = (
    forumla,
    formulaArgs,
    alwaysArray,
    curtailedArray,
    newConfiguration = clone(configuration)
  ) => {
    newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ][`${props.setting}_setting`]["load"][OPERATION] = forumla;
    newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ][`${props.setting}_setting`]["load"][OPERATION_ARGS] = formulaArgs;
    setConfiguration(newConfiguration);
    setLoadCalculatorFormula(forumla);
  };

  const handleChange = (event) => {
    let newConfiguration = clone(configuration);
    const name = event.target.name;
    const value = event.target.value;
    newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ][name] = value;
    setConfiguration(newConfiguration);
  };

  /**
   * Reset load values to prevent trying to write array to sting
   * @param {*} e
   * @param {*} newConfiguration
   */
  const handleLoadConfigChange = (
    e,
    newConfiguration = clone(configuration)
  ) => {
    if (e.target.value === "float") {
      newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
        props.deviceName
      ][`${props.setting}_setting`]["load"] = "0";
      setConfiguration(newConfiguration);
    } else {
      newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
        props.deviceName
      ][`${props.setting}_setting`]["load"] = {
        operation: loadCalculatorFormula,
        operation_args: loadCalculatorFormulaArgs,
      };
      setConfiguration(newConfiguration);
    }
    setLoadConfig(e.target.value);
  };

  const handleControlMethodChange = (event) => {
    let newConfiguration = clone(configuration);
    const point =
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ]["point"];
    const load =
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ]["load"];
    const name = event.target.name;
    const controlMethod = event.target.value;
    let traveller =
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ]["offset"];
    if (!traveller) {
      traveller =
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
          `${setting}_setting`
        ]["value"];
    }
    newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ] = {};
    newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ]["point"] = point;
    newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ]["load"] = load;
    if (
      traveller &&
      (controlMethod === "value" || controlMethod === "offset")
    ) {
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ][controlMethod] = traveller;
    }
    newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ][name] = controlMethod;
    if (controlMethod === "equation") {
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ]["equation"] = {};
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ]["equation"]["operation"] = "";
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ]["equation"]["operation_args"] = [];
    }
    setConfiguration(newConfiguration);
  };

  const handleFloatChange = (
    event,
    newConfiguration = clone(configuration)
  ) => {
    const name = event.target.name;
    const floatValue = parseFloat(event.target.value);
    newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ][name] = floatValue;
    setConfiguration(newConfiguration);
  };

  const getPoints = (deviceName) => {
    let points = [];
    for (let deviceIndex in devices) {
      if (devices[deviceIndex]["device_name"] === deviceName) {
        points = devices[deviceIndex]["points"];
      }
    }
    return points;
  };

  const points = getPoints(props.deviceName);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const createSettings = () => {
    return (
      <>
        <FormControl>
          <InputLabel htmlFor="device">Point</InputLabel>
          <NativeSelect
            value={
              configuration[`${clusterFocus}${_CONTROL}`][deviceName][
                deviceName
              ][`${setting}_setting`]["point"]
            }
            onChange={handleChange}
            inputProps={{
              name: "point",
              id: "pointInput",
            }}
          >
            <option aria-label="None" value="" />
            {points.map((point) => {
              return <option value={point}>{point}</option>;
            })}
          </NativeSelect>
        </FormControl>
      </>
    );
  };

  const createControlMethodContent = () => {
    const controlMethod =
      configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
        `${setting}_setting`
      ]["control_method"];
    switch (controlMethod) {
      case "offset":
        return (
          <>
            <FormControl>
              <SmallLabel darkMode={darkMode}>Offset</SmallLabel>
              <FloatInput
                id="controlTimeInput"
                name="offset"
                label="Offset"
                type="number"
                defaultValue={0}
                value={
                  configuration[`${clusterFocus}${_CONTROL}`][deviceName][
                    deviceName
                  ][`${setting}_setting`]["offset"]
                }
                step="0.01"
                onChange={handleFloatChange}
                darkMode={darkMode}
              />
            </FormControl>
          </>
        );
      case "value":
        return (
          <>
            <FormControl>
              <SmallLabel darkMode={darkMode}>Value</SmallLabel>
              <FloatInput
                id="controlTimeInput"
                name="value"
                label="Value"
                type="number"
                defaultValue={0}
                value={
                  configuration[`${clusterFocus}${_CONTROL}`][deviceName][
                    deviceName
                  ][`${setting}_setting`]["value"]
                }
                step="0.01"
                onChange={handleFloatChange}
                darkMode={darkMode}
              />
            </FormControl>
          </>
        );
      default:
        return null;
    }
  };

  const loadToggle = () => {
    return (
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          control={
            <Radio
              checked={loadConfig === "float"}
              onChange={(e) => handleLoadConfigChange(e)}
            />
          }
          value="float"
          label="Float"
        />
        <FormControlLabel
          control={
            <Radio
              checked={loadConfig === "calculator"}
              onChange={(e) => handleLoadConfigChange(e)}
            />
          }
          value="calculator"
          label="Calculator"
        />
      </RadioGroup>
    );
  };

  const createControlMethods = () => {
    const controlMethods = ["offset", "value", "equation"];
    return (
      <>
        <FormControl>
          <InputLabel htmlFor="device">Control Method</InputLabel>
          <NativeSelect
            value={
              configuration[`${clusterFocus}${_CONTROL}`][deviceName][
                deviceName
              ][`${setting}_setting`]["control_method"]
            }
            onChange={handleControlMethodChange}
            inputProps={{
              name: "control_method",
              id: "controlMethodInput",
            }}
          >
            <option aria-label="None" value="" />
            {controlMethods.map((method) => {
              return <option value={method}>{method}</option>;
            })}
          </NativeSelect>
        </FormControl>
        {createControlMethodContent()}
        <FormControl>
          <TinyHeader darkMode={darkMode} style={{ marginTop: "1rem" }}>
            Load
          </TinyHeader>
          {loadToggle()}
          {loadConfig === "float" ? (
            <FloatInput
              id="controlTimeInput"
              name="load"
              label="Load"
              type="number"
              defaultValue={
                configuration[`${clusterFocus}${_CONTROL}`][deviceName][
                  deviceName
                ][`${setting}_setting`]["load"]
              }
              step="0.01"
              onChange={handleFloatChange}
              darkMode={darkMode}
            />
          ) : (
            <div>
              <Grid container spacing={0}>
                <Grid item xs={10}>
                  <TextField
                    id="loadFormulaInput"
                    label="Operation"
                    type="string"
                    value={loadCalculatorFormula}
                    disabled
                    multiline
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    style={{ paddingTop: "28px" }}
                    onClick={() => {
                      setLoadCalculatorOpenModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <FloatingCalculator
                open={loadCalculatorOpenModal}
                handleClose={() => setLoadCalculatorOpenModal(false)}
                operationalArguments={points}
                formula={loadCalculatorFormula}
                handleOperationChange={handleLoadCalculatorChange}
                extraButtons={true}
              />
            </div>
          )}
        </FormControl>
      </>
    );
  };

  return (
    <>
      <TinyHeader darkMode={darkMode}>
        {capitalizeFirstLetter(props.setting)}
      </TinyHeader>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem
          nodeId={`${setting}_device_status`}
          label={`${capitalizeFirstLetter(props.setting)} Device Status`}
          darkMode={darkMode}
        >
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <TextField
                id="demandFormulaInput"
                label="Operation"
                type="string"
                value={curtailCalculatorFormula}
                disabled
                multiline
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                style={{ paddingTop: "28px" }}
                onClick={() => {
                  setCurtailCalculatorOpenModal(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
          <FloatingCalculator
            open={curtailCalculatorOpenModal}
            handleClose={() => setCurtailCalculatorOpenModal(false)}
            operationalArguments={points}
            formula={curtailCalculatorFormula}
            handleOperationChange={handleCurtailCalculatorChange}
            extraButtons={true}
          />
        </TreeItem>
        <TreeItem
          darkMode={darkMode}
          nodeId={`${setting}_device_setting`}
          label={`${capitalizeFirstLetter(props.setting)} Settings`}
        >
          {createSettings()}
          {createControlMethods()}
        </TreeItem>
      </TreeView>
    </>
  );
}
