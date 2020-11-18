import React, { useState, useContext } from "react";
import {
  InputLabel,
  Select,
  TextField,
  NativeSelect,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  FormControl,
  TreeView,
  TreeItem,
  FormControlLabel,
  Checkbox,
  StyledBox,
  Toggle,
} from "./_styledMainConfigForm";
import { Tooltip } from "./_styledMainConfigForm";
import MasterDriverContext from "../../context/masterDriverContext";
import configMapping from "../../constants/jsonTemplates/configurationMapping.json";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { FloatInput } from "../common/_styledInput";
import { SmallLabel } from "../common/_styledLabel";
import { clone } from "../../utils/clone";
import { darkModeContext } from "../../context/darkModeContext";
import {
  _CRITERIA,
  _PAIRWISE,
  CONFIG,
  DEMAND_FORMULA,
  POWER_METER,
  OPERATION,
  OPERATION_ARGS
} from "../../constants/strings";
import EditIcon from "@material-ui/icons/Edit";
import FloatingCalculator from "../common/FloatingCalculator";

export default function MainConfigForm(props) {
  const {
    campuses,
    buildings,
    devices,
    configuration,
    setConfiguration,
  } = useContext(MasterDriverContext);
  const { darkMode } = useContext(darkModeContext);
  const [state, setState] = useState({
    campus: configuration[CONFIG]["campus"],
    building: configuration[CONFIG]["building"],
    device_name: configuration[CONFIG][POWER_METER]["device_name"],
    point: configuration[CONFIG][POWER_METER]["point"],
    formula: configuration[CONFIG][POWER_METER]["demand_formula"] ? configuration[CONFIG][POWER_METER]["demand_formula"]["operation"] : "",
    formulaArgs: configuration[CONFIG][POWER_METER]["demand_formula"] ? configuration[CONFIG][POWER_METER]["demand_formula"]["operationArgs"] : [],
    agentId: configuration[CONFIG]["agent_id"],
    demandLimit: configuration[CONFIG]["demand_limit"],
    controlTime: configuration[CONFIG]["control_time"],
    curtailmentConfirm: NaN,
    curtailmentBreak: configuration[CONFIG]["curtailment_break"],
    averageBuildingPowerWindow:
      configuration[CONFIG]["average_building_power_window"],
    stagger_release: true,
    stagger_off_time: false,
    calcVisible: configuration[CONFIG][POWER_METER][DEMAND_FORMULA]
      ? true
      : false,
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (event, newConfiguration = clone(configuration)) => {
    const name = event.target.name;
    updateConfiguration(name, event.target.value, newConfiguration);
    setState({
      ...state,
      [name]: event.target.value,
    });

  };

  const handleOperationChange = (
    operation,
    operationArgs,
    alwaysArray,
    curtailedArray,
    newConfiguration = clone(configuration)
  ) => {
    
    // Handle init
    if(!newConfiguration[CONFIG][POWER_METER][DEMAND_FORMULA]){
      newConfiguration[CONFIG][POWER_METER][DEMAND_FORMULA] = {
        operation: "",
        operationArgs: [],
      };
    }
    newConfiguration[CONFIG][POWER_METER][DEMAND_FORMULA][
      OPERATION
    ] = operation;
    newConfiguration[CONFIG][POWER_METER][DEMAND_FORMULA][OPERATION_ARGS]= operationArgs;
    setConfiguration(newConfiguration);

    setState({
      ...state,
      formula: operation,
    });
  };

  const handleFloatChange = (
    event,
    newConfiguration = clone(configuration)
  ) => {
    const name = event.target.name;
    const floatValue = parseFloat(event.target.value);
    if (name === "curtailment_confirm") {
      if (isNaN(floatValue)) {
        delete newConfiguration[CONFIG]["curtailment_confirm"];
        setConfiguration(newConfiguration);
      } else {
        updateConfiguration(name, floatValue, newConfiguration);
      }
    } else {
      updateConfiguration(name, floatValue, newConfiguration);
    }

    setState({
      ...state,
      [name]: event.target.value,
    });
  };


  const handleCampusChange = (event) => {
    const campus = event.target.value;
    let powerMeterDT = clone(configuration[CONFIG][POWER_METER]);
    let powerMeterDTTokens = powerMeterDT["device_topic"].split("/");
    let newPowerMeterDT = "";
    newPowerMeterDT = ` ${campus}/${powerMeterDTTokens[1]}/${powerMeterDTTokens[2]}`;
    let newConfiguration = clone(configuration);
    newConfiguration["config"]["power_meter"]["device_topic"] = newPowerMeterDT;
    // update criteria device topics
    Object.keys(newConfiguration).forEach((configName) => {
      if (configName.includes(_CRITERIA) && !configName.includes(_PAIRWISE)) {
        for (let [parentDeviceKey, parentDevice] of Object.entries(
          newConfiguration[configName]
        )) {
          if (parentDeviceKey === "mapper") {
            continue;
          }
          for (let [deviceName, deviceCriteria] of Object.entries(
            parentDevice
          )) {
            for (let [settingKey, setting] of Object.entries(deviceCriteria)) {
              if (settingKey === "mapper") {
                continue;
              }
              let dtTokens = setting["device_topic"].split("/");
              let newDeviceTopic = ` ${campus}/${dtTokens[1]}/${dtTokens[2]}`;
              newConfiguration[configName][deviceName][deviceName][settingKey][
                "device_topic"
              ] = newDeviceTopic;
              const controlConfigName = configName.replace(
                "criteria",
                "control"
              );
              newConfiguration[controlConfigName][deviceName][deviceName][
                "device_topic"
              ] = newDeviceTopic;
            }
          }
        }
      }
    });
    setConfiguration(newConfiguration);
    handleChange(event, newConfiguration);
  };

  const handleBuildingChange = (event) => {
    const building = event.target.value;
    let powerMeterDT = clone(configuration["config"]["power_meter"]);
    let powerMeterDTTokens = powerMeterDT["device_topic"].split("/");
    let newPowerMeterDT = "";
    newPowerMeterDT = ` ${powerMeterDTTokens[0]}/${building}/${powerMeterDTTokens[2]}`;
    let newConfiguration = clone(configuration);
    newConfiguration["config"]["power_meter"]["device_topic"] = newPowerMeterDT;
    // update criteria device topics
    Object.keys(newConfiguration).forEach((configName) => {
      if (configName.includes(_CRITERIA) && !configName.includes(_PAIRWISE)) {
        for (let [parentDeviceKey, parentDevice] of Object.entries(
          newConfiguration[configName]
        )) {
          if (parentDeviceKey === "mapper") {
            continue;
          }
          for (let [deviceName, deviceCriteria] of Object.entries(
            parentDevice
          )) {
            for (let [settingKey, setting] of Object.entries(deviceCriteria)) {
              if (settingKey === "mapper") {
                continue;
              }
              let dtTokens = setting["device_topic"].split("/");
              let newDeviceTopic = ` ${dtTokens[0]}/${building}/${dtTokens[2]}`;
              newConfiguration[configName][deviceName][deviceName][settingKey][
                "device_topic"
              ] = newDeviceTopic;
              const controlConfigName = configName.replace(
                "criteria",
                "control"
              );
              newConfiguration[controlConfigName][deviceName][deviceName][
                "device_topic"
              ] = newDeviceTopic;
            }
          }
        }
      }
    });
    setConfiguration(newConfiguration);
    handleChange(event, newConfiguration);
  };

  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    updateConfiguration(name, !state[name]);
    setState({
      ...state,
      [name]: !state[name],
    });
  };

  const handleDeviceChange = (event) => {
    let deviceTopic = configuration[CONFIG][POWER_METER]["device_topic"];
    const deviceTopicTokens = deviceTopic.split("/");
    let newDeviceTopic = `${deviceTopicTokens[0]}/${deviceTopicTokens[1]}/${event.target.value}`;
    const name = event.target.name;
    // get points from device
    let points = getPoints(event.target.value);
    let newConfiguration = clone(configuration);
    updateConfiguration("device_topic", newDeviceTopic, newConfiguration);
    updateConfiguration(name, event.target.value, newConfiguration);
    updateConfiguration("point", "", newConfiguration);
    setState({
      ...state,
      [name]: event.target.value,
      points: points,
      point: "",
    });
  };

  const updateConfiguration = (
    name,
    value,
    newConfiguration = clone(configuration)
  ) => {
    const savePath = configMapping[name];
    if (savePath.length === 2) {
      newConfiguration[savePath[0]][savePath[1]] = value;
    } else if (savePath.length === 3) {
      newConfiguration[savePath[0]][savePath[1]][savePath[2]] = value;
    }
    setConfiguration(newConfiguration);
  };

  const getPoints = (device_name) => {
    let points = [];
    for (let deviceIndex in devices) {
      if (devices[deviceIndex]["device_name"] === device_name) {
        points = devices[deviceIndex]["points"];
      }
    }
    return points;
  };

  let points = getPoints(configuration[CONFIG][POWER_METER]["device_name"]);

  const toggleCalc = () => {
    const { calcVisible } = state;
    let newConfiguration = clone(configuration);
    if (!calcVisible) {
      newConfiguration[CONFIG][POWER_METER][DEMAND_FORMULA] = {
        operation: "",
        operationArgs: [],
      };
    } else {
      delete newConfiguration[CONFIG][POWER_METER][DEMAND_FORMULA];
    }
    setConfiguration(newConfiguration);
    setState({ calcVisible: !calcVisible });
  };

  return (
    <StyledBox>
      <FormControl>
        <InputLabel htmlFor="campus">Campus</InputLabel>
        <Select
          native
          value={configuration[CONFIG]["campus"]}
          onChange={handleCampusChange}
          inputProps={{
            name: "campus",
            id: "campusInput",
          }}
        >
          <option aria-label="None" value="" />
          {campuses.map((campus) => {
            return <option value={campus}>{campus}</option>;
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="building">Building</InputLabel>
        <NativeSelect
          value={configuration[CONFIG]["building"]}
          onChange={handleBuildingChange}
          inputProps={{
            name: "building",
            id: "buildingInput",
          }}
        >
          <option aria-label="None" value="" />
          {buildings.map((building) => {
            return <option value={building}>{building}</option>;
          })}
        </NativeSelect>
      </FormControl>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="Power Meter" darkMode={darkMode}>
          <FormControl>
            <InputLabel htmlFor="device">Device</InputLabel>
            <NativeSelect
              value={configuration[CONFIG][POWER_METER]["device_name"]}
              onChange={handleDeviceChange}
              inputProps={{
                name: "device_name",
                id: "deviceNameInput",
              }}
            >
              <option aria-label="None" value="" />
              {devices.map((device) => {
                return (
                  <option value={device["device_name"]}>
                    {device["device_name"]}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="device">Point</InputLabel>
            <NativeSelect
              value={configuration[CONFIG][POWER_METER]["point"]}
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
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={0}>
              <Grid item>Calculator Off</Grid>
              <Grid item>
                <Toggle
                  checked={state.calcVisible}
                  onChange={toggleCalc}
                ></Toggle>
              </Grid>
              <Grid item>On</Grid>
            </Grid>
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={10}>
                <TextField
                  id="demandFormulaInput"
                  label="Operation"
                  type="string"
                  value={state.formula}
                  disabled
                  multiline
                />
                <FloatingCalculator
                  open={openModal}
                  handleClose={() => setOpenModal(false)}
                  operationalArguments={points}
                  formula={state.formula}
                  handleOperationChange={handleOperationChange}
                  extraButtons={false}
                />
            </Grid>
            <Grid xs={2}>
              <IconButton
                style={{ paddingTop: "28px" }}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </TreeItem>
      </TreeView>
      <FormControl>
        <TextField
          id="agentIdInput"
          name="agent_id"
          label="Agent Id"
          defaultValue={state.agentId}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <Tooltip title="ILC will manage controllable loads to maintain building demand at this value">
          <TextField
            id="demandLimitInput"
            name="demand_limit"
            label="Demand Limit"
            defaultValue={state.demandLimit}
            onChange={handleChange}
          />
        </Tooltip>
      </FormControl>
      <FormControl>
        <SmallLabel darkMode={darkMode}>Control Time (minutes)</SmallLabel>
        <Tooltip title="After ILC control brings the building demand to the demand target, ILC will hold control of devices for this amount of time, then the ILC will begin to release devices.">
          <FloatInput
            id="controlTimeInput"
            name="control_time"
            label="Control Time (minutes)"
            type="number"
            defaultValue={state.controlTime}
            step="0.01"
            min="0"
            onChange={handleFloatChange}
            darkMode={darkMode}
          />
        </Tooltip>
      </FormControl>
      <FormControl>
        <SmallLabel darkMode={darkMode}>Curtailment Confirm</SmallLabel>
        <FloatInput
          id="curtailmentConfirmInput"
          name="curtailment_confirm"
          label="Curtailment Confirm"
          type="number"
          defaultValue={state.curtailmentConfirm}
          step="0.01"
          min="0"
          onChange={handleFloatChange}
          darkMode={darkMode}
        />
      </FormControl>
      <FormControl>
        <SmallLabel darkMode={darkMode}>Curtailment Break (minutes)</SmallLabel>
        <Tooltip title="ILC will release devices in a staggered manner over amount of time">
          <FloatInput
            id="curtailmentBreakInput"
            name="curtailment_break"
            label="Curtailment Break (minutes)"
            type="number"
            defaultValue={state.curtailmentBreak}
            step="0.01"
            min="0"
            onChange={handleFloatChange}
            darkMode={darkMode}
          />
        </Tooltip>
      </FormControl>
      <FormControl>
        <SmallLabel darkMode={darkMode}>
          Average Building Power Window (minutes)
        </SmallLabel>
        <Tooltip title="The ILC will use a moving average over this amount of time as feedback to manage the building demand">
          <FloatInput
            id="averageBuildingPowerWindow"
            name="average_building_power_window"
            label="Average Building Power Window (minutes)"
            type="number"
            defaultValue={state.averageBuildingPowerWindow}
            step="0.01"
            min="0"
            onChange={handleFloatChange}
            darkMode={darkMode}
          />
        </Tooltip>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.stagger_release}
            onChange={handleCheckboxChange}
            name="stagger_release"
          />
        }
        label="Stagger Release"
        class={darkMode ? "darkLabel" : ""}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.stagger_off_time}
            onChange={handleCheckboxChange}
            name="stagger_off_time"
          />
        }
        label="Stagger Off Time"
        class={darkMode ? "darkLabel" : ""}
      />
    </StyledBox>
  );
}
