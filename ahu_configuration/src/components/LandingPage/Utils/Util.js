export const verifyLocation = (masterDriverContext) => {
  if (masterDriverContext.masterDriver.data) { // Master driver file to JSON
    let masterDriverAgentConfig = JSON.parse(
      masterDriverContext.masterDriver.data
    );

    let dropdownList = [];
    let deviceTopics = Object.keys(masterDriverAgentConfig).filter(key =>
      key.startsWith("devices")
    );
    let masterDevices = deviceTopics.map(topic => {
      let deviceMetadata = topic.split("/");
      if (
        deviceMetadata &&
        deviceMetadata.length >= 4 &&
        deviceMetadata[0] === "devices"
      ) {

        let deviceData = JSON.parse(masterDriverAgentConfig[topic].data);
        let registryConfigName = deviceData.registry_config.split("//")[1];
        let registryConfig = masterDriverAgentConfig[registryConfigName].data;
        let devicePoints = registryConfig
          .split("\n")
          .slice(1, registryConfig.length)
          .map(registryEntry => {
            if (registryEntry) {
              let line = registryEntry.split(",");
              if (line[0] && line[1]) {
                return {
                  referencePointName: line[0],
                  volttronPointName: line[1]
                };
              }
            }
          })
          .filter(point => point);
          // Sort alphabetically
          devicePoints.sort((a,b) => a.volttronPointName.localeCompare(b.volttronPointName));

        let campus = deviceMetadata[1],
          building = deviceMetadata[2],
          deviceId = deviceMetadata[3];

        if (!dropdownList[campus]) {
          dropdownList[campus] = {};
        }
        if (!dropdownList[campus][building]) {
          dropdownList[campus][building] = {};
        }
        if (!dropdownList[campus][building][deviceId]) {
          dropdownList[campus][building][deviceId] = {};
        }
        if (deviceMetadata[4]) { // Subdevice
          let subDeviceId = deviceMetadata[4];
          if (!dropdownList[campus][building][deviceId][subDeviceId]) {
            dropdownList[campus][building][deviceId][subDeviceId] = {devicePoints};
          }
        } else { // Device default config
          dropdownList[campus][building][deviceId]["defaultConfig"] = {devicePoints};
        }
        
        return {
          dropdownList: dropdownList,
          deviceTopic: deviceId,
          devicePoints: devicePoints
        };
      } else {
        return (
          "Device topic " +
          topic +
          " is invalid, expected 'devices/<campus>/<building>/<deviceID>'"
        );
      }
    });

    masterDriverContext.masterDriver.dropDowns = masterDevices;
    return dropdownList;
  }
};

export default { verifyLocation };
