import React from "react";
import {
  InputLabel,
  Select,
  Input,
  ListItemText,
  Checkbox,
  MenuItem,
} from "@material-ui/core";
import {StyledFormControl, StyledBoxWrapper, StyledBox, StyledMenuItem} from "./_style"

const TopPanel = (props) => {
  const {
    economizerFile,
    locationList,
    handleCampusChange,
    campus,
    building,
    buildingList,
    handleBuildingChange,
    deviceList,
    device,
    handleDeviceChange,
    subDevice,
    subDeviceList,
    handleSubDeviceChange,
  } = props;

  let subDeviceLists = [];
  
  if (subDeviceList !== undefined) {
    const keys = Object.keys(subDeviceList);
    keys.forEach((key) => {
      let listItems = subDeviceList[key];
      subDeviceLists.push(
        <StyledMenuItem value={key} key={key}>
          <em>{key}</em>
        </StyledMenuItem>
      );
      listItems.forEach((listItem) => {
        subDeviceLists.push(
          <MenuItem key={listItem} value={listItem}>
            <Checkbox checked={subDevice.indexOf(listItem) > -1} />
            <ListItemText primary={listItem} />
          </MenuItem>
        );
      });
    });
  }
  

  let subDeviceDropDowns = null;
  if (!economizerFile) {
    subDeviceDropDowns = (
      <>
        <StyledBox
          p={1}
          bgcolor="grey.300"
          alignContent="flex-end"
          flexGrow={1}
        >
          <StyledFormControl>
            <InputLabel>Subdevice</InputLabel>
            <Select
              name="Subdevice"
              value={subDevice}
              required
              variant="outlined"
              autoWidth
              multiple
              onChange={handleSubDeviceChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
            >
              {subDeviceLists}
            </Select>
          </StyledFormControl>
        </StyledBox>
      </>
    );
  }

  return (
    <>
      <StyledBoxWrapper display="flex" p={1} flexDirection="row">
        <StyledBox p={1} bgcolor="grey.300" flexGrow={1}>
          <StyledFormControl fullWidth>
            <InputLabel>Campus</InputLabel>
            <Select
              name="Campus"
              value={campus}
              required
              autoWidth
              onChange={handleCampusChange}
            >
              {Object.keys(locationList).map((space) => (
                <MenuItem key={space} value={space}>
                  {space}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </StyledBox>
        <StyledBox p={1} bgcolor="grey.300" flexGrow={1}>
          <StyledFormControl fullWidth>
            <InputLabel>Building</InputLabel>
            <Select
              name="mounting"
              value={building}
              required
              autoWidth
              onChange={handleBuildingChange}
            >
              {buildingList.map((buildings) => (
                <MenuItem key={buildings} value={buildings}>
                  {buildings}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </StyledBox>
        <StyledBox p={1} bgcolor="grey.300" flexGrow={1}>
          <StyledFormControl fullWidth>
            <StyledFormControl>
              <InputLabel>Device</InputLabel>
              <Select
                name="devices"
                value={device}
                required
                autoWidth
                multiple
                onChange={handleDeviceChange}
                input={<Input />}
                renderValue={(selected) => selected.join(", ")}
              >
                {deviceList.map((devices) => (
                  <MenuItem key={devices} value={devices}>
                    <Checkbox checked={device.indexOf(devices) > -1} />
                    <ListItemText primary={devices} />
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </StyledFormControl>
        </StyledBox>
        {subDeviceDropDowns}
      </StyledBoxWrapper>
    </>
  );
};

export default TopPanel;
