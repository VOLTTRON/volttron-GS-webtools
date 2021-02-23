import React, { useState } from "react";

export const CampusBuildingDeviceContext = React.createContext(null);

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ children }) => {
  const [campus, setCampus] = useState("");
  const [building, setBuilding] = useState("");
  const [buildingList, setBuildingList] = useState([]);
  const [device, setDevice] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [subDevice, setSubDevice] = useState([]);
  const [subDeviceList, setSubDeviceList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [devicesInSubDevices, setDevicesInSubDevices] = useState(false);
  const [firstSubDevice, setFirstSubDevice] = useState("");

  const campusBuildingDevice = {
    campus: [campus, setCampus],
    buildingList: [buildingList, setBuildingList],
    building: [building, setBuilding],
    deviceList: [deviceList, setDeviceList],
    device: [device, setDevice],
    subDevice: [subDevice, setSubDevice],
    subDeviceList: [subDeviceList, setSubDeviceList],
    locationList: [locationList, setLocationList],
    devicesInSubDevices: [devicesInSubDevices, setDevicesInSubDevices],
    firstSubDevice: [firstSubDevice, setFirstSubDevice]
  };

  return (
    <CampusBuildingDeviceContext.Provider value={campusBuildingDevice}>
      {children}
    </CampusBuildingDeviceContext.Provider>
  );
};
