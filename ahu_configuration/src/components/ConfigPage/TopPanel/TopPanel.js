import React from "react";
import {
  InputLabel,
  Select,
  Input,
  ListItemText,
  Checkbox,
  MenuItem,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  StyledFormControl,
  StyledBoxWrapper,
  StyledBox,
  StyledMenuItem,
} from "./_style";

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
    setSubDeviceList,
    handleSubDeviceChange,
    setDevicesInSubDevices
  } = props;

  let subDeviceLists = [];

  /**
   * User can transfer from device to sub-device if Airside
   * and no sub-device options are available
   */
  const transferDeviceOptionsToSubDeviceOptions = () => {
    let newSubList = [];
    newSubList["Devices"] = deviceList
    console.log({ deviceList });
    setSubDeviceList(newSubList);
    setDevicesInSubDevices(true);
  };

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
  // Handle airside
  if (!economizerFile) {
    let transferButton = null;
    if (subDeviceLists.length < 1) {
      transferButton = (
        <span disabled={device.length < 1}>
          <Tooltip title="Transfer device list to sub-device list">
            <IconButton
            disabled={device.length < 1}
              onClick={() => transferDeviceOptionsToSubDeviceOptions()}
              color="primary"
            >
              <ChevronRightIcon></ChevronRightIcon>
            </IconButton>
          </Tooltip>
        </span>
      );
    } else {
      transferButton = null;
    }

    subDeviceDropDowns = (
      <>
        {transferButton}
        <StyledBox
          p={1}
          bgcolor="grey.300"
          alignContent="flex-end"
          flexGrow={1}
        >
          <StyledFormControl>
            <InputLabel>Sub-device</InputLabel>
            <Select
              name="Subdevice"
              value={subDevice}
              required
              variant="outlined"
              autoWidth
              multiple
              disabled={device.length < 1}
              onChange={handleSubDeviceChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
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
                onChange={(e) => handleDeviceChange(e, subDeviceList)}
                input={<Input />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }}
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
