import React, { useState, useContext, useEffect } from "react";
import LeftPanel from "../../components/ConfigPage/LeftPanel/LeftPanel";
import TopPanel from "../../components/ConfigPage/TopPanel/TopPanel";
import MainContent from "../../components/ConfigPage/MainContent/MainContent";
import styled from "styled-components";
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
  const [showError, setShowError] = useState(false);
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
  // cause infinite rerenders. Instead we get it from props and set the
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
    dropDownsContext.setDropDownsChildren({});
    dropDownsContext.setDropDownsParent({});
  };

  const handleBuildingChange = (event) => {
    const value = event.target.value;
    let deviceListObj = Object.keys(locationList[campus][value]);
    dropDown(
      campus,
      value,
      deviceListObj,
      null,
      dropDownsContext,
      masterDriverContext,
      true
    );
    setDeviceList(deviceListObj);
    setBuilding(value);
    setDevice([]);
  };

  const handleDeviceChange = (event) => {
    let subDeviceListObj = [];
    let subdeviceList = [];
    const value = event.target.value;
    value.forEach((deviceKey) => {
      for (let key of Object.keys(locationList[campus][building][deviceKey])) {
        // defaultConfig is used to for the devices with no sub devices
        // but needs to be scrubbed from the subdevice drop down options
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
      null,
      dropDownsContext,
      masterDriverContext,
      ahuContext.fileType[0] === "Economizer_AIRCx"
    ); // Changes dd context
    setSubDeviceList(subDeviceListObj);
    if (value < 1) {
      // Empty devices needs to clear subdevices
      setSubDevice([]);
      dropDownsContext.setDropDownsChildren({});
    }
    setDevice(value);
  };

  const handleSubDeviceChange = (event) => {
    const value = event.target.value;
    if (subDevice.length < 1) {
      // Zone Reheat and Zone Damper dd values only get first selection
      dropDown(
        campus,
        building,
        deviceList,
        value,
        dropDownsContext,
        masterDriverContext,
        ahuContext.fileType[0] === "Economizer_AIRCx"
      ); // Changes dd context
    }
    setSubDevice(value);
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
            handleSubDeviceChange={handleSubDeviceChange}
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
