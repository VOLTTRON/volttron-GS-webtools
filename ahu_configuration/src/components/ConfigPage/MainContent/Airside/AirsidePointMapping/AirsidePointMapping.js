import React, { useContext } from "react";
import styled from "styled-components";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  IconButton,
} from "@material-ui/core";
import { AHUContext } from "../../../../../context/AHUContext/AHUContext";
import { DropDownsContext } from "../../../../../context/DropDownsContext/DropDownsContext";
import PointMappingDropDown from "../../Economizer/PointMapping/PointMappingDropDown/PointMappingDropDown";
import ToolTipInfo from "../../Util/ToolTipInfo";
import AddIcon from "@material-ui/icons/Add";

const AirSidePointMapping = (props) => {
  const { subDevice } = props;
  const ahuContext = useContext(AHUContext);
  const dropdownsContext = useContext(DropDownsContext);
  const [pointMapping, setPointMapping] = ahuContext.airPointMapping;
  const handlePointMappingChange = (event, index) => {
    let toChange = pointMapping[event.target.name];
    toChange[index] = event.target.value;
    setPointMapping({
      ...pointMapping,
      [event.target.name]: toChange,
    });
  };

  let parentSelectItems = [
    <MenuItem value=" " key={null}>
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

  let subDeviceSelectItems = [
    <MenuItem value=" " key={null}>
      <em>None</em>
    </MenuItem>,
  ];

  const enableZoneReheatAndDamper =
    Object.keys(dropdownsContext.dropDownsChildren).length > 1 &&
    subDevice.length > 0;
  if (enableZoneReheatAndDamper) {
    subDeviceSelectItems.push(
      dropdownsContext.dropDownsChildren.map((dropdown) => (
        <MenuItem value={dropdown} key={dropdown}>
          {dropdown}
        </MenuItem>
      ))
    );
  } else {
    if (
      (pointMapping.zone_damper.length > 0 &&
        pointMapping.zone_damper[0] !== "") ||
      (pointMapping.zone_reheat.length > 0 &&
        pointMapping.zone_reheat[0] !== "")
    ) {
      let pointMappingClone = { ...pointMapping };
      pointMappingClone.zone_damper = [""];
      pointMappingClone.zone_reheat = [""];
      setPointMapping(pointMappingClone);
    }
  }

  let fanStatusKey = -1;
  let zoneReheatKey = -1;
  let zoneDamperKey = -1;
  let ductStcprKey = -1;
  let ductStcprStpt = -1;
  let fanSpeedKey = -1;
  let saTempKey = -1;
  let satStptKey = -1;

  return (
    <Grid container style={{ paddingLeft: "10px" }} spacing={1}>
      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          FAN STATUS
          <ToolTipInfo fieldName="fan_status" />
        </InputLabel>
        {pointMapping.fan_status.map((e) => {
          fanStatusKey += 1;
          return (
            <PointMappingDropDown
              fieldName="fan_status"
              key={fanStatusKey}
              keyIndex={fanStatusKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("fan_status")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          ZONE REHEAT
          <ToolTipInfo fieldName="zone_reheat" />
        </InputLabel>
        {pointMapping.zone_reheat.map((e) => {
          zoneReheatKey += 1;
          return (
            <PointMappingDropDown
              fieldName="zone_reheat"
              disabled={!enableZoneReheatAndDamper}
              key={zoneReheatKey}
              keyIndex={zoneReheatKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={subDeviceSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("zone_reheat")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          ZONE DAMPER
          <ToolTipInfo fieldName="zone_damper" />
        </InputLabel>
        {pointMapping.zone_damper.map((e) => {
          zoneDamperKey += 1;
          return (
            <PointMappingDropDown
              fieldName="zone_damper"
              disabled={!enableZoneReheatAndDamper}
              key={zoneDamperKey}
              keyIndex={zoneDamperKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={subDeviceSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("zone_damper")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          DUCT STATIC PRESSURE
          <ToolTipInfo fieldName="duct_stcpr" />
        </InputLabel>
        {pointMapping.duct_stcpr.map((e) => {
          ductStcprKey += 1;
          return (
            <PointMappingDropDown
              fieldName="duct_stcpr"
              key={ductStcprKey}
              keyIndex={ductStcprKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("duct_stcpr")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          DUCT STATIC PRESSURE SETPOINT
          <ToolTipInfo fieldName="duct_stcpr_stpt" />
        </InputLabel>
        {pointMapping.duct_stcpr_stpt.map((e) => {
          ductStcprStpt += 1;
          return (
            <PointMappingDropDown
              fieldName="duct_stcpr_stpt"
              key={ductStcprStpt}
              keyIndex={ductStcprStpt}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("duct_stcpr_stpt")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          SUPPLY AIR TEMPERATURE
          <ToolTipInfo fieldName="sa_temp" />
        </InputLabel>
        {pointMapping.sa_temp.map((e) => {
          saTempKey += 1;
          return (
            <PointMappingDropDown
              fieldName="sa_temp"
              key={saTempKey}
              keyIndex={saTempKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("sa_temp")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          FAN SPEED COMMAND
          <ToolTipInfo fieldName="fan_speedcmd" />
        </InputLabel>
        {pointMapping.fan_speedcmd.map((e) => {
          fanSpeedKey += 1;
          return (
            <PointMappingDropDown
              fieldName="fan_speedcmd"
              key={fanSpeedKey}
              keyIndex={fanSpeedKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("fan_speedcmd")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12} style={{ minWidth: "250px" }}>
        <InputLabel style={{ color: "#0c9a6f", display: "flex" ,fontSize: "12px"}}>
          SUPPLY AIR TEMP SETPOINT
          <ToolTipInfo fieldName="sat_stpt" />
        </InputLabel>
        {pointMapping.sat_stpt.map((e) => {
          satStptKey += 1;
          return (
            <PointMappingDropDown
              fieldName="sat_stpt"
              key={satStptKey}
              keyIndex={satStptKey}
              handlePointMappingChange={handlePointMappingChange}
              handleRemoveButtonClick={handleRemoveButtonClick}
              pointMapping={pointMapping}
              parentSelectItems={parentSelectItems}
            />
          );
        })}
        <IconButton
          onClick={() => handleAddButtonClick("sat_stpt")}
          aria-label="add"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default AirSidePointMapping;
