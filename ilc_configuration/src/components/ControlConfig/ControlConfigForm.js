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
import { _CONTROL, OPERATION, OPERATION_ARGS, CONDITION, CONDITION_ARGS } from "../../constants/strings";
import { clone } from "../../utils/clone";
import { TreeView, TreeItem } from "../common/_styledTree";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export default function ControlConfigForm(props) {
  const { deviceName, setting } = props;
  const { darkMode } = useContext(darkModeContext);
  const { devices, configuration, setConfiguration } = useContext(
    MasterDriverContext
  );
  const { clusterFocus } = useContext(ClusterContext);
  const [controlMethodCalculatorModalOpen, setControlMethodCalculatorModalOpen] = useState(false);
  const [offset, setOffset] = useState(
    configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ]
      ? configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
          `${setting}_setting`
        ]["offset"]
      : ""
  );
  const [value, setValue] = useState(
    configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ]
      ? configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
          `${setting}_setting`
        ]["value"]
      : ""
  );

  const [load, setLoad] = useState(
    configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ]
      ? configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
          `${setting}_setting`
        ]["load"]
      : ""
  );

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
      : ""
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

  const isLoadCalc =
    configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ]?.[`load`]?.[OPERATION];
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
    newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ]["device_status"][props.setting][CONDITION] = forumla;

    newConfiguration[`${clusterFocus}${_CONTROL}`][props.deviceName][
      props.deviceName
    ]["device_status"][props.setting][CONDITION_ARGS] = formulaArgs;
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

  const handleControlMethodCalculatorOperationChange = (
    formula,
    args,
  ) => {
    debugger;
    const clonedConfig = clone(configuration)
    clonedConfig[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`]["equation"][OPERATION] = formula;

    clonedConfig[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`]["equation"][OPERATION_ARGS] = args;

    setConfiguration(clonedConfig);
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
      ]["equation"][OPERATION_ARGS] = [];
    }
    setConfiguration(newConfiguration);
  };

  const handleFloatChange = (e, newConfiguration = clone(configuration)) => {
    const newValue = e.target.value;
    switch (e.target.name) {
      case "offset":
        setOffset(newValue);
        break;
      case "value":
        setValue(newValue);
        break;
      case "load":
        setLoad(newValue);
        break;
      default:
        break;
    }
  };

  const handleFloatBlur = (e, clonedConfig = clone(configuration)) => {
    clonedConfig[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
      `${setting}_setting`
    ][e.target.name] = Number(e.target.value);
    setConfiguration(clonedConfig);
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
            {points.map((point, index) => {
              return (
                <option key={index} value={point}>
                  {point}
                </option>
              );
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
              <TextField
                name="offset"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleFloatChange}
                value={offset}
                onBlur={handleFloatBlur}
              />
            </FormControl>
          </>
        );
      case "value":
        return (
          <>
            <FormControl>
              <SmallLabel darkMode={darkMode}>Value</SmallLabel>
              <TextField
                name="value"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleFloatChange}
                value={value}
                onBlur={handleFloatBlur}
              />
            </FormControl>
          </>
        )
      case "equation":
          return (
            <>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={10}>
                    <TextField
                      id="criteriaFormulaInput"
                      label="Operation"
                      type="string"
                      value={configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
                        `${setting}_setting`]["equation"][OPERATION]}
                      disabled
                      multiline
                      style={{ width: "100%" }}
                    />
                  </Grid>
                    <IconButton
                      style={{ marginTop: "14px" }}
                      onClick={() => {
                        setControlMethodCalculatorModalOpen(true);
                      }}
                    >
                    <EditIcon />
                    </IconButton>
                </Grid>
                <FloatingCalculator
                  open={controlMethodCalculatorModalOpen}
                  handleClose={() => setControlMethodCalculatorModalOpen(false)}
                  operationalArguments={points}
                  formula={configuration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
                    `${setting}_setting`]["equation"][OPERATION]}
                  handleOperationChange={handleControlMethodCalculatorOperationChange}
                  extraButtons={false}
                  curtailed={true}
                />
              </div>
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
            {controlMethods.map((method, index) => {
              return (
                <option key={index} value={method}>
                  {method}
                </option>
              );
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
            <TextField
              name="load"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleFloatChange}
              value={load}
              onBlur={handleFloatBlur}
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
                    style={{ marginTop: "14px" }}
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
                label="Condition"
                type="string"
                value={configuration[`${clusterFocus}${_CONTROL}`][props.deviceName]
                  [props.deviceName]["device_status"][props.setting][CONDITION]}
                disabled
                multiline
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                style={{ marginTop: "14px" }}
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
            formula={configuration[`${clusterFocus}${_CONTROL}`][props.deviceName][props.deviceName]["device_status"][props.setting][CONDITION]}
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
