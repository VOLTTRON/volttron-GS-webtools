import React, { useState, useContext, useEffect } from "react";
import LeftPanel from "../../components/ConfigPage/LeftPanel/LeftPanel";
import TopPanel from "../../components/ConfigPage/TopPanel/TopPanel";
import MainContent from "../../components/ConfigPage/MainContent/MainContent";
import { DropDownsContext } from "../../context/DropDownsContext/DropDownsContext";
import { MasterDriverContext } from "../../context/MasterDriverContext/MasterDriverContext";
import { CampusBuildingDeviceContext } from "../../context/CampusBuildingDeviceContext/CampusBuildingDeviceContext";
import { AHUContext } from "../../context/AHUContext/AHUContext";
import { AirsideArgumentsContext } from "../../context/AirsideArgumentsContext/AirsideArgumentsContext";
import { AirsideThresholdsContext } from "../../context/AirsideThresholdsContext/AirsideThresholdsContext";
import { CurrentPageContext } from "../../context/CurrentPageContext/CurrentPageContext";
import { EconThresholdsContext } from "../../context/EconThresholdsContext/EconThresholdsContext";
import ErrorModal from "../Layout/ErrorModal/ErrorModal";
import { dropDown } from "./Util/DropDown";
import { writeToLocalStorage } from "../../context/AccessLocalStorage";
import {
  StyledDivWrapper,
  StyledDivContentWrapper,
  StyledDivLeft,
  StyledDivTop,
  StyledDivMain,
} from "./_style";
import { EconArgumentsContext } from "../../context/EconArgumentsContext/EconArgumentsContext";

const ConfigPage = (props) => {
  const [open, setOpen] = useState(false);
  const [expandThresholds, setExpandThresholds] = useState(false);
  const { locationListProp } = props;
  const dropDownsContext = useContext(DropDownsContext);
  const ahuContext = useContext(AHUContext);
  const [airsideArguments] = useContext(AirsideArgumentsContext);
  const [airsideThresholdsContext] = useContext(AirsideThresholdsContext);
  const currentPageContext = useContext(CurrentPageContext);
  const econThresholdsContext = useContext(EconThresholdsContext);
  const masterDriverContext = useContext(MasterDriverContext);
  const campusBuildingDeviceContext = useContext(CampusBuildingDeviceContext);
  const econArgumentsContext = useContext(EconArgumentsContext);

  const [
    locationList,
    setLocationList,
  ] = campusBuildingDeviceContext.locationList;
  const [campus, setCampus] = campusBuildingDeviceContext.campus;
  const [building, setBuilding] = campusBuildingDeviceContext.building;
  const [
    buildingList,
    setBuildingList,
  ] = campusBuildingDeviceContext.buildingList;
  const [device, setDevice] = campusBuildingDeviceContext.device;
  const [deviceList, setDeviceList] = campusBuildingDeviceContext.deviceList;
  const [subDevice, setSubDevice] = campusBuildingDeviceContext.subDevice;
  const [
    subDeviceList,
    setSubDeviceList,
  ] = campusBuildingDeviceContext.subDeviceList;
  const [
    devicesInSubDevices,
    setDevicesInSubDevices,
  ] = campusBuildingDeviceContext.devicesInSubDevices;
  const [
    firstSubDevice,
    setFirstSubDevice,
  ] = campusBuildingDeviceContext.firstSubDevice;
  const [showError, setShowError] = useState(false);
  const [pointMapping, setPointMapping] = ahuContext.airPointMapping;
  const [timer, setTimer] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    if (campus.length < 1 && building.length < 1) {
      setShowError(true);
    }
  }, []);

  // Save context to local storage every 10 seconds
  if (Math.floor(Date.now() / 1000) - timer > 10) {
    writeToLocalStorage(
      ahuContext,
      airsideArguments,
      airsideThresholdsContext,
      campusBuildingDeviceContext,
      currentPageContext,
      dropDownsContext,
      econArgumentsContext,
      econThresholdsContext,
      masterDriverContext
    );
    setTimer(Math.floor(Date.now() / 1000));
  }

  // Location List cannot be context since it it used in layout and would
  // cause infinite re-renders. Instead we get it from props and set the
  // context from props if it is empty
  if (Object.keys(locationList).length < 1) {
    setLocationList(locationListProp);
  }

  const handleCampusChange = (event) => {
    const value = event.target.value;
    let buildListObj = Object.keys(locationList[value]);
    setCampus(value);
    setBuilding("");
    setBuildingList(buildListObj);
    setDevice([]);
    setDeviceList([]);
    setSubDevice([]);
    setSubDeviceList([]);
    dropDownsContext.setDropDownsChildren([{}]);
    dropDownsContext.setDropDownsParent({});
  };

  const handleBuildingChange = (event) => {
    const value = event.target.value;
    let deviceListObj = Object.keys(locationList[campus][value]);
    dropDown(
      campus,
      value,
      deviceListObj,
      [],
      dropDownsContext,
      masterDriverContext,
      devicesInSubDevices
    );
    setDeviceList(deviceListObj);
    setBuilding(value);
    setDevice([]);
  };

  /**
   * On device change...
   * check if device in sub device
   *  No: Go on normal
   *  Yes: Check and see if that value has been selected as a sub
   *    No: Just remove from
   * @param {*} event
   * @param {*} subDevicesList
   */

  const handleDeviceChange = (event, subDevicesList) => {
    let subDeviceListObj = [];
    let subdeviceList = [];
    const value = event.target.value;
    value.forEach((deviceKey) => {
      for (let key of Object.keys(locationList[campus][building][deviceKey])) {
        // defaultConfig is used for the devices with no sub devices
        // but needs to be scrubbed from the subDevice drop down options
        if (key !== "defaultConfig") {
          subdeviceList.push(key);
        }
      }
      if (subdeviceList.length > 0) {
        subDeviceListObj[deviceKey] = subdeviceList;
      }
      subdeviceList = [];
    });
    dropDown(
      campus,
      building,
      value,
      [],
      dropDownsContext,
      masterDriverContext,
      ahuContext.fileType[0] === "Economizer_AIRCx",
      devicesInSubDevices && value < 1
    ); // Changes dd context
    // Change sub-devices when devices have not been transferred to sub-devices or devices are empty
    if (subDevicesList?.Devices?.length === undefined || value.length < 1) {
      setSubDeviceList(subDeviceListObj);
    }

    if (value < 1) {
      // Empty devices needs to clear sub-devices
      setSubDevice([]);
      setFirstSubDevice("");
      setDevicesInSubDevices(false);
      dropDownsContext.setDropDownsChildren([{}]);
    }
    setDevice(value);
  };

  const handleSubDeviceChange = (event) => {
    const newSubDevices = event.target.value;
    let zoneReHeatValues = pointMapping.zone_reheat;
    let zoneDamperValues = pointMapping.zone_damper;
    // compare old devices to new devices
    if (newSubDevices.length > subDevice.length) {
      // sub-device was selected. Remove extra ZR or ZD instances
      if (zoneReHeatValues.length > subDevice.length) {
        // zoneReHeatValues.splice(zoneReHeatValues.length  - subDevice.length);
        zoneReHeatValues.length = newSubDevices.length;
      }
      if (zoneDamperValues.length > subDevice.length) {
        // zoneDamperValues.splice(zoneDamperValues.length + 1 - subDevice.length);
        zoneDamperValues.length = newSubDevices.length;
      }
    } else {
      // sub-device was de-selected
      let removedIndex = 0;
      for (let i = 0; i < subDevice.length; i++) {
        if (newSubDevices[i] !== subDevice[i]) {
          removedIndex = i;
          break;
        }
      }

      if (removedIndex === 0 && newSubDevices.length === 1) {
        // First element removed and there are no others to take its place
        zoneReHeatValues = [""];
        zoneDamperValues = [""];
      } else if (removedIndex < newSubDevices.length) {
        // sub-device removed was not the last sub-device
        zoneReHeatValues.splice(removedIndex, 1);
        zoneDamperValues.splice(removedIndex, 1);
      } else {
        // last sub-device removed. Drop all dd instances of that type
        if (zoneReHeatValues.length === 1) {
          zoneReHeatValues = [""];
        } else {
          zoneReHeatValues.length = removedIndex;
        }
        if (zoneReHeatValues.length === 1) {
          zoneDamperValues = [""];
        } else {
          zoneDamperValues.length = removedIndex;
        }
      }
    }

    dropDown(
      campus,
      building,
      device,
      newSubDevices,
      dropDownsContext,
      masterDriverContext,
      ahuContext.fileType[0] === "Economizer_AIRCx",
      devicesInSubDevices
    ); // Changes dd context
    setPointMapping({
      ...pointMapping,
      zone_reheat: zoneReHeatValues,
      zone_damper: zoneDamperValues,
    });
    debugger;
    if (devicesInSubDevices) {
      setFirstSubDevice(newSubDevices[0] ? newSubDevices[0] : "");
    }
    setSubDevice(newSubDevices);
  };

  return (
    <StyledDivWrapper>
      {showError ? (
        <ErrorModal onClose={() => setShowError(false)}>
          Select a campus, building, and device at the top of the page before
          beginning configuration
        </ErrorModal>
      ) : null}
      <StyledDivLeft
        disabled={!(campus && building && Object.keys(device).length > 0)}
      >
        <LeftPanel
          open={open}
          setOpen={setOpen}
          expandThresholds={expandThresholds}
          setExpandThresholds={setExpandThresholds}
        ></LeftPanel>
      </StyledDivLeft>
      <StyledDivContentWrapper>
        <StyledDivTop>
          <TopPanel
            economizerFile={ahuContext.fileType[0] === "Economizer_AIRCx"}
            locationList={locationList}
            campus={campus}
            handleCampusChange={handleCampusChange}
            building={building}
            buildingList={buildingList}
            handleBuildingChange={handleBuildingChange}
            device={device}
            deviceList={deviceList}
            handleDeviceChange={handleDeviceChange}
            subDevice={subDevice}
            subDeviceList={subDeviceList}
            setSubDeviceList={setSubDeviceList}
            handleSubDeviceChange={handleSubDeviceChange}
            setDevicesInSubDevices={setDevicesInSubDevices}
          ></TopPanel>
        </StyledDivTop>
        <StyledDivMain
          disabled={!(campus && building && Object.keys(device).length > 0)}
        >
          <MainContent
            open={open}
            setOpen={setOpen}
            setExpandThresholds={setExpandThresholds}
          ></MainContent>
        </StyledDivMain>
      </StyledDivContentWrapper>
    </StyledDivWrapper>
  );
};
export default ConfigPage;
