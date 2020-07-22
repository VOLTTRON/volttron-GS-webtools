/**

 * 
 * @param {*} dropDownContext 
 * @param {*} masterDriverContext 
 */

/**
 * Iterates through drop down options in masterDriverContext
 * looking for a match of the current values. Once it finds
 * a match it will populate the dropdown context
 *
 * @param {*} campus
 * @param {*} building
 * @param {*} device
 * @param {*} dropDownContext
 * @param {*} masterDriverContext
 */
export const dropDown = (
  campus,
  building,
  deviceList,
  subdevice,
  dropDownContext,
  masterDriverContext,
  isEconomizer
) => {
  const dropDownOptions = masterDriverContext.masterDriver.dropDowns;
  let dropDownList = [];
  let subDeviceDropDownList = [];
  for (let [key, value] of Object.entries(dropDownOptions)) {
    if (subdevice !== null) { // No need to keep looping after drop downs are populated
      if (subDeviceDropDownList.length > 0) {
        break;
      }
      // Iterate through selected devices to find sub-device parent
      for (var device of deviceList) {
        if (
          !isEconomizer &&
          value.dropdownList[campus] &&
          value.dropdownList[campus][building] &&
          value.dropdownList[campus][building][device] &&
          value.dropdownList[campus][building][device][subdevice]
        ) {
          for (let [innerKey, innerValue] of Object.entries(
            value.dropdownList[campus][building][device][subdevice].devicePoints
          )) {
            subDeviceDropDownList.push(innerValue.volttronPointName); // Used for airside Zone Reheat and Zone Damper
          }
          dropDownContext.setDropDownsChildren(subDeviceDropDownList);
          break;
        }
      }
    } else {
      // Handle Economizer and Airside Device
      if (
        value.dropdownList[campus] &&
        value.dropdownList[campus][building] &&
        value.dropdownList[campus][building][deviceList[0]]
      ) {
        for (let [innerKey, innerValue] of Object.entries(
          value.dropdownList[campus][building][deviceList[0]].defaultConfig
            .devicePoints
        )) {
          dropDownList.push(innerValue.volttronPointName);
        }
        dropDownContext.setDropDownsParent(dropDownList);
        break;
      }
    }
  }
};

export default { dropDown };
