import React, { useContext } from "react";
import styled from "styled-components";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { AHUContext } from "../../../../../context/AHUContext/AHUContext";
import { DropDownsContext } from "../../../../../context/DropDownsContext/DropDownsContext";
import ToolTipInfo from "../../Util/ToolTipInfo";

const StyledFormControl = styled(FormControl)`
  min-width: 50%;
  &.MuiFormLabel-root {
    color: blue;
  }
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const AirSidePointMapping = (props) => {
  const {subDevice} = props;
  const ahuContext = useContext(AHUContext);
  const dropdownsContext = useContext(DropDownsContext);
  const [pointMapping, setPointMapping] = ahuContext.pointMapping;
  const handlePointMappingChange = (event) => {
    setPointMapping({ spFan: event.target.value });
    setPointMapping({
      ...pointMapping,
      [event.target.name]: [event.target.value],
    });
  };

  let parentSelectItems = [
    <MenuItem value=" " key={null}>
      <em>None</em>
    </MenuItem>,
  ];

  if (Object.keys(dropdownsContext.dropDownsParent).length > 1) {
    parentSelectItems.push(
      dropdownsContext.dropDownsParent.map((dropdown) => (
        <MenuItem value={dropdown} key={dropdown}>{dropdown}</MenuItem>
      ))
    );
  }

  let subDeviceSelectItems = [
    <MenuItem value=" " key={null}>
      <em>None</em>
    </MenuItem>,
  ];

  const enableZoneReheatAndDamper =
    (Object.keys(dropdownsContext.dropDownsChildren).length > 1 && subDevice.length > 0);
  if (enableZoneReheatAndDamper) {
    subDeviceSelectItems.push(
      dropdownsContext.dropDownsChildren.map((dropdown) => (
        <MenuItem value={dropdown} key={dropdown}>{dropdown}</MenuItem>
      ))
    );
  } else {
    if (pointMapping.zone_damper || pointMapping.zone_reheat) {
      let pointMappingClone = { ...pointMapping };
      pointMappingClone.zone_damper = null;
      pointMappingClone.zone_reheat = null;
      setPointMapping(pointMappingClone);
    }
  }

  return (
    <Grid container style={{ paddingLeft: "10px" }} spacing={1}>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            FAN STATUS
            <ToolTipInfo fieldName="fan_status" />
          </InputLabel>
          <Select
            value={pointMapping.fan_status ? pointMapping.fan_status : ' '}
            onChange={handlePointMappingChange}
            name="fan_status"
            style={{ maxWidth: "250px" }}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl disabled={!enableZoneReheatAndDamper}>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            ZONE REHEAT
            <ToolTipInfo fieldName="zone_reheat" />
          </InputLabel>
          <Select
            value={pointMapping.zone_reheat ? pointMapping.zone_reheat : ' '}
            onChange={handlePointMappingChange}
            name="zone_reheat"
            style={{ maxWidth: "250px" }}
          >
            {subDeviceSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl disabled={!enableZoneReheatAndDamper}>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            ZONE DAMPER
            <ToolTipInfo fieldName="zone_damper" />
          </InputLabel>
          <Select
            value={pointMapping.zone_damper ? pointMapping.zone_damper : ' '}
            onChange={handlePointMappingChange}
            name="zone_damper"
            style={{ maxWidth: "250px" }}
          >
            {subDeviceSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            DUCT STATIC PRESSURE
            <ToolTipInfo fieldName="duct_stcpr" />
          </InputLabel>
          <Select
            value={pointMapping.duct_stcpr ? pointMapping.duct_stcpr : ' '}
            onChange={handlePointMappingChange}
            name="duct_stcpr"
            style={{ maxWidth: "250px" }}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            DUCT STATIC PRESSURE SETPOINT
            <ToolTipInfo fieldName="duct_stcpr_stpt" />
          </InputLabel>
          <Select
            value={
              pointMapping.duct_stcpr_stpt ? pointMapping.duct_stcpr_stpt : ' '
            }
            onChange={handlePointMappingChange}
            name="duct_stcpr_stpt"
            style={{ maxWidth: "250px" }}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            SUPPLY AIR TEMPERATURE
            <ToolTipInfo fieldName="sa_temp" />
          </InputLabel>
          <Select
            value={pointMapping.sa_temp ? pointMapping.sa_temp : ' '}
            onChange={handlePointMappingChange}
            name="sa_temp"
            style={{ maxWidth: "250px" }}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            FAN SPEED COMMAND
            <ToolTipInfo fieldName="fan_speedcmd" />
          </InputLabel>
          <Select
            value={pointMapping.fan_speedcmd ? pointMapping.fan_speedcmd : ' '}
            onChange={handlePointMappingChange}
            name="fan_speedcmd"
            labelWidth={10}
            style={{ maxWidth: "250px" }}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{ color: "#0c9a6f", display: "flex" }}>
            SUPPLY AIR TEMP SETPOINT
            <ToolTipInfo fieldName="sat_stpt" />
          </InputLabel>
          <Select
            value={pointMapping.sat_stpt ? pointMapping.sat_stpt : ' '}
            onChange={handlePointMappingChange}
            name="sat_stpt"
            style={{ maxWidth: "250px" }}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
    </Grid>
  );
};

export default AirSidePointMapping;
