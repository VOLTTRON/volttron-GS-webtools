import React, { useContext } from "react";
import styled from "styled-components";
import {

  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ToolTipInfo from "../../Util/ToolTipInfo";
import { AHUContext } from "../../../../../context/AHUContext/AHUContext";
import { DropDownsContext } from "../../../../../context/DropDownsContext/DropDownsContext";
import PointMappingDropDown from "./PointMappingDropDown/PointMappingDropDown";

const PointMapping = (props) => {
  const ahuContext = useContext(AHUContext);
  const dropdownsContext = useContext(DropDownsContext);
  const [pointMapping, setPointMapping] = ahuContext.econPointMapping;
  const handlePointMappingChange = (event, index) => {
    let toChange = pointMapping[event.target.name];
    toChange[index] = event.target.value;
    setPointMapping({
      ...pointMapping,
      [event.target.name]: toChange,
    });
  };

  let parentSelectItems = [
    <MenuItem value=" " key=" ">
      <em>None</em>
    </MenuItem>,
  ];

  const handleAddButtonClick = (key) => {
    let toInsert = pointMapping[key];
    toInsert.push("");
    setPointMapping({
      ...pointMapping,
      key: toInsert,
    });
  };
  const handleRemoveButtonClick = (key, keyIndex) => {
    let toRemove = pointMapping[key];
    toRemove = toRemove.splice(keyIndex, 1);
    setPointMapping({
      ...pointMapping,
      key: toRemove,
    });
  };

  if (Object.keys(dropdownsContext.dropDownsParent).length > 1) {
    parentSelectItems.push(
      dropdownsContext.dropDownsParent.map((dropdown) => (
        <MenuItem value={dropdown} key={dropdown}>
          {dropdown}
        </MenuItem>
      ))
    );
  }

  let supplyFanKey = -1;
  let outdoorAirTempKey = -1;
  let returnAirTempKey = -1;
  let mixedAirTempKey = -1;
  let outdoorDampKey = -1;
  let coolCallKey = -1;
  let supplyFanSpeedKey = -1;

  return (
    <Grid container style={{ paddingLeft: "10px" }} spacing={1}>
      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          SUPPLY FAN <ToolTipInfo fieldName="supply_fan_status" />
        </InputLabel>
          {pointMapping.supply_fan_status.map((e) => {
            supplyFanKey += 1;
            return (
              <PointMappingDropDown
                fieldName="supply_fan_status"
                key={supplyFanKey}
                keyIndex={supplyFanKey}
                handlePointMappingChange={handlePointMappingChange}
                handleRemoveButtonClick={handleRemoveButtonClick}
                pointMapping={pointMapping}
                parentSelectItems={parentSelectItems}
              />
            );
          })}
        <IconButton
          onClick={() => handleAddButtonClick("supply_fan_status")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>
       <Grid item xs={12} style={{ minWidth: "250px" }}>
         <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          OUTDOOR AIR TEMPERATURE
          <ToolTipInfo fieldName="outdoor_air_temperature" />
        </InputLabel>

        {pointMapping.outdoor_air_temperature.map((e) => {
          outdoorAirTempKey += 1;
          return (
            <PointMappingDropDown
              fieldName="outdoor_air_temperature"
              key={outdoorAirTempKey}
              keyIndex={outdoorAirTempKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("outdoor_air_temperature")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>
       <Grid item xs={12} style={{ minWidth: "250px" }}>
         
           <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
            RETURN AIR TEMPERATURE
            <ToolTipInfo fieldName="return_air_temperature" />
          </InputLabel>
           
          {pointMapping.return_air_temperature.map((e) => {
          returnAirTempKey += 1;
          return (
            <PointMappingDropDown
              fieldName="return_air_temperature"
              key={returnAirTempKey}
              keyIndex={returnAirTempKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("return_air_temperature")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} style={{ minWidth: "250px" }}>
         <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          MIXED AIR TEMPERATURE
          <ToolTipInfo fieldName="mixed_air_temperature" />
        </InputLabel>

        {pointMapping.mixed_air_temperature.map((e) => {
          mixedAirTempKey += 1;
          return (
            <PointMappingDropDown
              fieldName="mixed_air_temperature"
              key={mixedAirTempKey}
              keyIndex={mixedAirTempKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("mixed_air_temperature")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} style={{ minWidth: "250px" }}>
         <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          OUTDOOR DAMPER SIGNAL
          <ToolTipInfo fieldName="outdoor_damper_signal" />
        </InputLabel>

        {pointMapping.outdoor_damper_signal.map((e) => {
          outdoorDampKey += 1;
          return (
            <PointMappingDropDown
              fieldName="outdoor_damper_signal"
              key={outdoorDampKey}
              keyIndex={outdoorDampKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("outdoor_damper_signal")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} style={{ minWidth: "250px" }}>
         <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          COOL CALL
          <ToolTipInfo fieldName="cool_call" />
        </InputLabel>

        {pointMapping.cool_call.map((e) => {
          coolCallKey += 1;
          return (
            <PointMappingDropDown
              fieldName="cool_call"
              key={coolCallKey}
              keyIndex={coolCallKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("cool_call")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid> 
      <Grid item xs={12} style={{ minWidth: "250px" }}>
         <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          SUPPLY FAN SPEED
          <ToolTipInfo fieldName="supply_fan_speed" />
        </InputLabel>

        {pointMapping.supply_fan_speed.map((e) => {
          supplyFanSpeedKey += 1;
          return (
            <PointMappingDropDown
              fieldName="supply_fan_speed"
              key={supplyFanSpeedKey}
              keyIndex={supplyFanSpeedKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("supply_fan_speed")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PointMapping;
