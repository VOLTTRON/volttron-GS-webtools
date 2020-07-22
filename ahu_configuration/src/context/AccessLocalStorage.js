/**
 * On application init, if context is in local storage then pull the local storage and load into context
 *
 * @param {*} ahuContext
 * @param {*} campusBuildingDeviceContext
 * @param {*} currentPageContext
 * @param {*} dropDownsContext
 * @param {*} masterDriverContext
 * @param {*} setAirsideArguments
 * @param {*} setAirsideThresholds
 * @param {*} setEconArguments
 * @param {*} setEconThresholds
 */
const readFromLocalStorage = (
  ahuContext,
  campusBuildingDeviceContext,
  currentPageContext,
  dropDownsContext,
  masterDriverContext,
  setAirsideArguments,
  setAirsideThresholds,
  setEconArguments,
  setEconThresholds
) => {
  const localStorageData = JSON.parse(
    localStorage.getItem("AHU_Configuration")
  );
  ahuContext.fileName[1](localStorageData.ahu.fileName);
  ahuContext.fileType[1](localStorageData.ahu.fileType);
  ahuContext.pointMapping[1](localStorageData.ahu.pointMapping);
  currentPageContext.currentPage[1](localStorageData.currentPage);
  dropDownsContext.setDropDownsChildren(
    localStorageData.dropDown.dropDownsChildren
  );
  dropDownsContext.setDropDownsParent(
    localStorageData.dropDown.dropDownsParent
  );
  masterDriverContext.setMasterDriver(localStorageData.masterDriver);
  setAirsideArguments(localStorageData.airsideArguments);
  setAirsideThresholds(localStorageData.airsideThresholds);
  setEconArguments(localStorageData.econArguments);
  setEconThresholds(localStorageData.econThresholds);

  campusBuildingDeviceContext.campus[1](
    localStorageData.campusBuildingDevice.campus
  );
  campusBuildingDeviceContext.building[1](
    localStorageData.campusBuildingDevice.building
  );
  campusBuildingDeviceContext.buildingList[1](
    localStorageData.campusBuildingDevice.buildingList
  );
  campusBuildingDeviceContext.device[1](
    localStorageData.campusBuildingDevice.device
  );
  campusBuildingDeviceContext.deviceList[1](
    localStorageData.campusBuildingDevice.deviceList
  );
  campusBuildingDeviceContext.locationList[1](
    Object.values(localStorageData.campusBuildingDevice.locationList)
  );
  campusBuildingDeviceContext.subDevice[1](
    localStorageData.campusBuildingDevice.subDevice
  );

  let locationListObj = {};
  for (let key of Object.keys(
    localStorageData.campusBuildingDevice.locationList
  )) {
    locationListObj[key] =
      localStorageData.campusBuildingDevice.locationList[key];
  }
  campusBuildingDeviceContext.locationList[1](locationListObj);

  let subDeviceListObj = {};
  for (let key of Object.keys(
    localStorageData.campusBuildingDevice.subDeviceList
  )) {
    subDeviceListObj[key] =
      localStorageData.campusBuildingDevice.subDeviceList[key];
  }
  campusBuildingDeviceContext.subDeviceList[1](subDeviceListObj);
};

/**
 * Write context into local storage
 * 
 * @param {*} ahuContext 
 * @param {*} airsideArguments 
 * @param {*} airsideThresholds 
 * @param {*} campusBuildingDeviceContext 
 * @param {*} currentPageContext 
 * @param {*} dropDownsContext 
 * @param {*} econArgumentsContext 
 * @param {*} econThresholdsContext 
 * @param {*} masterDriverContext 
 */
const writeToLocalStorage = (
  ahuContext,
  airsideArguments,
  airsideThresholds,
  campusBuildingDeviceContext,
  currentPageContext,
  dropDownsContext,
  econArgumentsContext,
  econThresholdsContext,
  masterDriverContext
) => {
  let objectToStore = {
    ahu: {
      fileName: ahuContext.fileName[0],
      fileType: ahuContext.fileType[0],
      pointMapping: ahuContext.pointMapping[0],
    },
    airsideArguments: airsideArguments,
    airsideThresholds: airsideThresholds,
    campusBuildingDevice: {
      building: campusBuildingDeviceContext.building[0],
      buildingList: campusBuildingDeviceContext.buildingList[0],
      campus: campusBuildingDeviceContext.campus[0],
      device: campusBuildingDeviceContext.device[0],
      deviceList: campusBuildingDeviceContext.deviceList[0],
      locationList: campusBuildingDeviceContext.locationList[0],
      subDevice: campusBuildingDeviceContext.subDevice[0],
      subDeviceList: campusBuildingDeviceContext.subDeviceList[0]
        ? Object.assign({}, campusBuildingDeviceContext.subDeviceList[0])
        : null,
    },
    currentPage: currentPageContext.currentPage[0],
    dropDown: {
      dropDownsChildren: dropDownsContext.dropDownsChildren,
      dropDownsParent: dropDownsContext.dropDownsParent,
    },
    econArguments: econArgumentsContext[0],
    econThresholds: econThresholdsContext[0],
    masterDriver: masterDriverContext.masterDriver,
  };

  localStorage.setItem("AHU_Configuration", JSON.stringify(objectToStore));
};

export { readFromLocalStorage, writeToLocalStorage };
