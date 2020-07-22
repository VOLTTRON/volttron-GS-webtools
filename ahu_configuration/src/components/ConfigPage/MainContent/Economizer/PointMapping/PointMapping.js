import React, { useContext } from "react";
import styled from "styled-components";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid
} from "@material-ui/core";
import ToolTipInfo from "../../Util/ToolTipInfo"
import { AHUContext } from "../../../../../context/AHUContext/AHUContext";
import { DropDownsContext } from "../../../../../context/DropDownsContext/DropDownsContext";

const StyledFormControl = styled(FormControl)`
  min-width: 50%;
`;


const PointMapping = props => {
  const ahuContext = useContext(AHUContext);
  const dropdownsContext = useContext(DropDownsContext);
  const [pointMapping, setPointMapping] = ahuContext.pointMapping;
  const handlePointMappingChange = event => {
    setPointMapping({ spFan: event.target.value });
    setPointMapping({
      ...pointMapping,
      [event.target.name]: [event.target.value]
    });
  };

  let parentSelectItems = [
    <MenuItem value=" " key= " ">
      <em>None</em>
    </MenuItem>
  ];

  if (Object.keys(dropdownsContext.dropDownsParent).length > 1) {
    parentSelectItems.push(
      dropdownsContext.dropDownsParent.map(dropdown => (
        <MenuItem value={dropdown} key={dropdown}>{dropdown}</MenuItem>
      ))
    );
  }

  return (
    <Grid container style={{paddingLeft: "10px"}} spacing={1}>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{color: "#0c9a6f", display:"flex"}}>SUPPLY FAN STATUS <ToolTipInfo fieldName="supply_fan_status"/></InputLabel>
          <Select
            value={
              pointMapping.supply_fan_status
                ? pointMapping.supply_fan_status
                : " "
            }
            onChange={handlePointMappingChange}
            name="supply_fan_status"
            style={{maxWidth: "250px"}}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{color: "#0c9a6f", display:"flex"}}>OUTDOOR AIR TEMPERATURE<ToolTipInfo fieldName="outdoor_air_temperature"/></InputLabel>
          <Select
            value={
              pointMapping.outdoor_air_temperature
                ? pointMapping.outdoor_air_temperature
                : " "
            }
            onChange={handlePointMappingChange}
            name="outdoor_air_temperature"
            style={{maxWidth: "250px"}}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{color: "#0c9a6f", display:"flex"}}>RETURN AIR TEMPERATURE<ToolTipInfo fieldName="return_air_temperature"/></InputLabel>
          <Select
            value={
              pointMapping.return_air_temperature
                ? pointMapping.return_air_temperature
                : " "
            }
            onChange={handlePointMappingChange}
            name="return_air_temperature"
            style={{maxWidth: "250px"}}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{color: "#0c9a6f", display:"flex"}}>MIXED AIR TEMPERATURE<ToolTipInfo fieldName="mixed_air_temperature"/></InputLabel>
          <Select
            value={
              pointMapping.mixed_air_temperature
                ? pointMapping.mixed_air_temperature
                : " "
            }
            onChange={handlePointMappingChange}
            name="mixed_air_temperature"
            style={{maxWidth: "250px"}}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{color: "#0c9a6f", display:"flex"}}>OUTDOOR DAMPER SIGNAL<ToolTipInfo fieldName="outdoor_damper_signal"/></InputLabel>
          <Select
            value={
              pointMapping.outdoor_damper_signal
                ? pointMapping.outdoor_damper_signal
                : " "
            }
            onChange={handlePointMappingChange}
            name="outdoor_damper_signal"
            style={{maxWidth: "250px"}}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{color: "#0c9a6f", display:"flex"}}>COOL CALL<ToolTipInfo fieldName="cool_call"/></InputLabel>
          <Select
            value={pointMapping.cool_call ? pointMapping.cool_call : " "}
            onChange={handlePointMappingChange}
            name="cool_call"
            style={{maxWidth: "250px"}}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12}>
        <StyledFormControl>
          <InputLabel style={{color: "#0c9a6f", display:"flex"}}>SUPPLY FAN SPEED<ToolTipInfo fieldName="supply_fan_speed"/></InputLabel>
          <Select
            value={
              pointMapping.supply_fan_speed ? pointMapping.supply_fan_speed : " "
            }
            onChange={handlePointMappingChange}
            name="supply_fan_speed"
            labelWidth={10}
            style={{maxWidth: "250px"}}
          >
            {parentSelectItems}
          </Select>
        </StyledFormControl>
      </Grid>
    </Grid>
  );
};

export default PointMapping;
