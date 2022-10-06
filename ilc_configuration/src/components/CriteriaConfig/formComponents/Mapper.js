import React, { useState, useContext, useEffect } from "react";
import { InputLabel, NativeSelect, TextField } from "@material-ui/core";
import { FormControl } from "../_styledCriteriaConfigForm";
import MasterDriverContext from "../../../context/masterDriverContext";
import ClusterContext from "../../../context/clusterContext";
import { _CRITERIA } from "../../../constants/strings";

export default function Mapper(props) {
  let { devices, configuration, setConfiguration } = useContext(
    MasterDriverContext
  );
  let { clusterFocus } = useContext(ClusterContext);
  const [state, setState] = useState({
    stateClusterFocus: clusterFocus,
  });
  let { device, setting, criteria } = props;

  useEffect(() => {
    if (clusterFocus !== state.stateClusterFocus) {
      setState({
        ...state,
        stateClusterFocus: clusterFocus,
      });
    }
  }, [
    configuration,
    clusterFocus,
    props.device,
    props.setting,
    props.criteria,
    state,
  ]);

  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  const mapperObj = configuration[`${clusterFocus}${_CRITERIA}`]["mappers"];

  const handleChange = (event) => {
    const name = event.target.name;
    updateConfiguration(name, event.target.value);
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const updateConfiguration = (name, value) => {
    let newConfiguration = clone(configuration);
    if (name === "map_key" && value == "") {
      newConfiguration[`${clusterFocus}${_CRITERIA}`][device][device][setting][
        criteria
      ]["dict_name"] = "";
    }

    newConfiguration[`${clusterFocus}${_CRITERIA}`][device][device][setting][
      criteria
    ][name] = value;
    setConfiguration(newConfiguration);
  };

  const createMapKeys = (dict_name) => {
    const mapKeys = Object.keys(mapperObj[dict_name]).map((mapKey) => {
      return <option value={mapKey}>{mapKey}</option>;
    });
    return mapKeys;
  };

  const createDictNames = () => {
    const dictNames = Object.keys(mapperObj).map((dictName) => {
      return <option value={dictName}>{dictName}</option>;
    });
    return dictNames;
  };

  const { map_key, dict_name } = configuration[`${clusterFocus}${_CRITERIA}`][
    device
  ][device][setting][criteria];
  return (

    <>
          <FormControl>
            <InputLabel>Dict. Name</InputLabel>
            <NativeSelect
              value={dict_name ? dict_name : ""}
              onChange={handleChange}
              inputProps={{
                name: "dict_name",
              }}
            >
              <option value=""></option>
              {createDictNames()}
            </NativeSelect>
      </FormControl>
      {dict_name ? (
      <FormControl>
        <InputLabel>Map Key</InputLabel>
        <NativeSelect
          value={map_key ? map_key : ""}
          onChange={handleChange}
          inputProps={{
            name: "map_key",
          }}
        >
          <option value=""></option>
          {createMapKeys(dict_name)}
        </NativeSelect>
      </FormControl>
            ) : null}
    </>
  );
}
