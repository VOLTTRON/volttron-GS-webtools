import React, { useContext, useState, Fragment } from "react";
import { InputLabel, NativeSelect } from "@material-ui/core";
import MasterDriverContext from "../../context/masterDriverContext";
import ClusterContext from "../../context/clusterContext";
import { darkModeContext } from "../../context/darkModeContext";
import { FormControl } from "./_styledCriteriaConfigForm";

import { PrimaryButton } from "../common/_styledButton";

import { VerySmallHeader } from "../common/_styledHeader";
import { _CRITERIA, _CONTROL } from "../../constants/strings";
import defaultMapper from "../../constants/jsonTemplates/mapper.json";
import { Grid } from "@material-ui/core";
import CriteriaDropdown from "./CriteriaDropdown/CriteriaDropdown";

export default function CriteriaConfigForm(props) {
  const { devices, configuration, setConfiguration } = useContext(
    MasterDriverContext
  );
  const { clusterFocus } = useContext(ClusterContext);
  const { darkMode } = useContext(darkModeContext);
  const clone = (obj) => JSON.parse(JSON.stringify(obj));
  const [state, setState] = useState({
    copying: false,
    sourceDeviceName: null,
  });

  const handleDeviceChange = (event) => {
    const deviceName = event.target.value;
    if (configuration[`${clusterFocus}${_CRITERIA}`][deviceName]) {
      alert("Device crtieria has already been chosen.");
      return;
    }
    let newConfiguration = clone(configuration);
    const campus = configuration["config"]["campus"];
    const building = configuration["config"]["building"];

    if (Object.keys(newConfiguration[`${clusterFocus}${_CRITERIA}`]).length) {
      const oldName = props.name;
      if (newConfiguration[`${clusterFocus}${_CRITERIA}`][oldName][oldName]) {
        const criteriaContent = clone(
          configuration[`${clusterFocus}${_CRITERIA}`][oldName][oldName]
        );
        delete newConfiguration[`${clusterFocus}${_CRITERIA}`][oldName];
        newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName] = {};
        newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][
          deviceName
        ] = criteriaContent;
        newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName][
          "curtail"
        ]["device_topic"] = `${campus}/${building}/${deviceName}`;
        if (
          newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][
            deviceName
          ]["augment"]
        ) {
          newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][
            deviceName
          ]["augment"]["device_topic"] = `${campus}/${building}/${deviceName}`;
        }
        const controlContent = clone(
          configuration[`${clusterFocus}${_CONTROL}`][oldName][oldName]
        );
        delete newConfiguration[`${clusterFocus}${_CONTROL}`][oldName];
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName] = {};
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][
          deviceName
        ] = controlContent;
        newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName][
          "device_topic"
        ] = `${campus}/${building}/${deviceName}`;
      }
    } else {
      newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName] = {};
      newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][
        deviceName
      ] = {
        curtail: {
          device_topic: `${campus}/${building}/${deviceName}`,
        },
      };
      newConfiguration[`${clusterFocus}${_CRITERIA}`]["mapper"] = defaultMapper;
      // set control config
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName] = {};
      newConfiguration[`${clusterFocus}${_CONTROL}`][deviceName][deviceName] = {
        device_topic: `${campus}/${building}/${deviceName}`,
        device_status: {
          curtail: {
            operation: "",
            operation_args: [],
          },
        },
        curtail_setting: {
          point: "",
          control_method: "",
          load: 0,
        },
      };
    }
    // delete old criteria config
    if (props.name !== "") {
      delete newConfiguration[`${clusterFocus}${_CRITERIA}`][props.name];
    }
    setConfiguration(newConfiguration);
    return;
  };

  const handleOperationChange = (event, criteriaName) => {
    // update configuration
    const type = event.target.value;
    let newConfiguration = clone(configuration);
    let criteriaObj = { operation_type: type };
    switch (type) {
      case "constant":
        criteriaObj["value"] = 0;
        break;
      case "history":
        criteriaObj["previous_time"] = 0;
        criteriaObj["on_value"] = 0;
        criteriaObj["off_value"] = 0;
        break;
      case "status":
        criteriaObj["on_value"] = 0;
        criteriaObj["off_value"] = 0;
        break;
      case "formula":
        criteriaObj["operation"] = "";
        criteriaObj["operation_args"] = {
          always: [],
          nc: [],
        };
        break;
      default:
        return null;
    }
    newConfiguration[`${clusterFocus}${_CRITERIA}`][props.name][props.name][
      props.setting
    ][criteriaName] = criteriaObj;

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

  const copyInputs = () => {
    const thisDevice = props.name;
    return state.copying ? (
      <FormControl>
        <InputLabel htmlFor="device">Copy Values From</InputLabel>
        <NativeSelect
          onChange={(event) => {
            setState({ ...state, sourceDeviceName: event.target.value });
          }}
        >
          <option aria-label="None" value="" />
          {Object.entries(configuration[`${clusterFocus}${_CRITERIA}`]).map(
            (deviceObj) => {
              const deviceName = deviceObj[0];
              if (!(deviceName === "mapper" || deviceName == thisDevice)) {
                return (
                  <option key={deviceName} value={deviceName}>
                    {deviceName}
                  </option>
                );
              }
            }
          )}
        </NativeSelect>
      </FormControl>
    ) : null;
  };

  const performCopy = () => {
    const copyToDevice = props.name;
    const { sourceDeviceName } = state;
    if (sourceDeviceName) {
      const newConfiguration = clone(configuration);
      const curtailDeviceTopic =
        newConfiguration[`${clusterFocus}${_CRITERIA}`][copyToDevice][
          copyToDevice
        ]["curtail"]["device_topic"];
      let augmentDeviceTopic = "";
      if (
        newConfiguration[`${clusterFocus}${_CRITERIA}`][copyToDevice][
          copyToDevice
        ]["augment"]
      ) {
        augmentDeviceTopic =
          newConfiguration[`${clusterFocus}${_CRITERIA}`][copyToDevice][
            copyToDevice
          ]["augment"]["device_topic"];
      }
      const sourceDevice = clone(
        configuration[`${clusterFocus}${_CRITERIA}`][sourceDeviceName][
          sourceDeviceName
        ]
      );
      newConfiguration[`${clusterFocus}${_CRITERIA}`][copyToDevice][
        copyToDevice
      ] = sourceDevice;
      // update device topic
      newConfiguration[`${clusterFocus}${_CRITERIA}`][copyToDevice][
        copyToDevice
      ]["curtail"]["device_topic"] = curtailDeviceTopic;
      if (
        newConfiguration[`${clusterFocus}${_CRITERIA}`][copyToDevice][
          copyToDevice
        ]["augment"]
      ) {
        newConfiguration[`${clusterFocus}${_CRITERIA}`][copyToDevice][
          copyToDevice
        ]["augment"]["device_topic"] = augmentDeviceTopic;
      }
      setConfiguration(newConfiguration);
      setState({ ...state, copying: false });
    } else {
    }
  };

  let points = getPoints(props.name);

  const buildCriteriaDropdowns = () => {
    const setting =
      configuration[`${clusterFocus}${_CRITERIA}`][props.name][props.name][
        props.setting
      ];
    let criteriaArray = configuration["criteria"][clusterFocus].map(
      (criteria) => {
        return (
          <CriteriaDropdown
            criteria={criteria}
            setting={setting}
            propsSetting={props.setting}
            handleOperationChange={handleOperationChange}
            propsName={props.name}
            points={points}
            configuration={configuration}
            setConfiguration={setConfiguration}
          />
        );
      }
    );
    return criteriaArray;
  };

  return (
    <>
      {props.setting === "curtail" ? (
        <>
          <PrimaryButton
            display={state.copying || devices.length <= 2 ? "none" : "block"}
            margintop="1.5rem"
            backgroundcolor="#0000008a"
            onClick={() => setState({ ...state, copying: true })}
          >
            Copy Center
          </PrimaryButton>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <PrimaryButton
                display={state.copying ? "block" : "none"}
                backgroundcolor="#0000008a"
                margintop="1.5rem"
                onClick={() => performCopy()}
              >
                Execute Copy
              </PrimaryButton>
            </Grid>
            <Grid item xs={8}>
              {copyInputs()}
            </Grid>
          </Grid>
        </>
      ) : null}
      <FormControl>
        {props.setting === "curtail" || !props.name ? (
          <>
            <InputLabel htmlFor="device">Device</InputLabel>
            <NativeSelect
              value={props.name}
              onChange={handleDeviceChange}
              inputProps={{
                name: props.name,
                id: props.name,
              }}
            >
              <option aria-label="None" value="" />
              {devices.map((device) => {
                return (
                  <option
                    key={device["device_name"]}
                    value={device["device_name"]}
                  >
                    {device["device_name"]}
                  </option>
                );
              })}
            </NativeSelect>
          </>
        ) : null}
        <VerySmallHeader darkMode={darkMode}>{props.setting}</VerySmallHeader>
        {props.name ? buildCriteriaDropdowns() : null}
      </FormControl>
    </>
  );
}
