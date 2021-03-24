/**

 *
 * @param {*} dropDownContext
 * @param {*} masterDriverContext
 */

/**
 * Iterates through drop down options in masterDriverContext
 * looking for a match of the current values. Once it finds
 * a match it will populate the dropdown context.
 * Fires on device and subDevice change
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
  devices,
  subDevices,
  dropDownContext,
  masterDriverContext,
  isEconomizer,
  devicesInSubDevices
) => {
  const dropDownOptions = masterDriverContext.masterDriver.dropDowns;

  let parentDropDownList = [];
  let childDropDownList = [];
  if (subDevices === null || subDevices.length < 1) {
    // handle parent/device change
    for (let value of Object.values(dropDownOptions)) {
      if (
        value.dropdownList[campus] &&
        value.dropdownList[campus][building] &&
        value.dropdownList[campus][building][devices[0]]
      ) {
        for (let innerValue of Object.values(
          value.dropdownList[campus][building][devices[0]].defaultConfig
            .devicePoints
        )) {
          parentDropDownList.push(innerValue.volttronPointName);
        }
        dropDownContext.setDropDownsParent(parentDropDownList);
        break;
      }
    }
  } else {
    // handle child/subDevice change
    for (let subDevice of subDevices) {
      let singleSubDeviceList = [];
      for (let value of Object.values(dropDownOptions)) {
        if (devicesInSubDevices) {
          for (let innerValue of Object.values(
            value.dropdownList[campus][building][subDevice].defaultConfig
              .devicePoints
          )) {
            singleSubDeviceList.push(innerValue.volttronPointName);
          }
          childDropDownList.push(singleSubDeviceList);
          break;
        } else {
          for (var device of devices) {
            if (
              !isEconomizer &&
              value.dropdownList[campus] &&
              value.dropdownList[campus][building] &&
              value.dropdownList[campus][building][device] &&
              value.dropdownList[campus][building][device][subDevice] &&
              value.dropdownList[campus][building][device][subDevice]
            ) {
              for (let innerValue of Object.values(
                value.dropdownList[campus][building][device][subDevice]
                  .devicePoints
              )) {
                singleSubDeviceList.push(innerValue.volttronPointName);
              }
              childDropDownList.push(singleSubDeviceList);
              break;
            }
          }
          break;
        }
      }
    }
    dropDownContext.setDropDownsChildren(childDropDownList);
  }
};

export default { dropDown };
