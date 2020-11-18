import * as CSV from 'csv-string';

export function masterDriverConfigParser () {
    const masterDriverConfig = JSON.parse(localStorage.getItem('ilc-config-master-driver-config'));
    // parse master driver config object
    let parsedMDC = {
        "campuses": [],
        "buildings": [],
        "devices": []
    }
    let registries = {}
    for (const key in masterDriverConfig){
        // check if it's a registry or a device
        if (key.includes('devices/')){
            // if device, get campus, building, device name and registry
            if (masterDriverConfig[key].type == 'json'){
                const deviceJSON = JSON.parse(masterDriverConfig[key].data)
                const deviceInfo = key.split("/");
                deviceJSON["campus"] = deviceInfo[1];
                deviceJSON["building"] = deviceInfo[2];
                deviceJSON["system"] = deviceInfo[3];
                if (deviceInfo[4]){
                    deviceJSON["device_name"] = deviceInfo[4]; 
                } else {
                    deviceJSON["device_name"] = deviceInfo[3];
                    deviceJSON["system"] = "none";
                }
                parsedMDC["devices"].push(deviceJSON)
                if(parsedMDC["campuses"].indexOf(deviceJSON["campus"]) === -1){
                    parsedMDC["campuses"].push(deviceJSON["campus"])
                }
                if(parsedMDC["buildings"].indexOf(deviceJSON["building"]) === -1){
                    parsedMDC["buildings"].push(deviceJSON["building"])
                }
            }
        } else if (key.includes('registry_configs')) {
            // if registry, check if csv and load into object
            if (masterDriverConfig[key].type === 'csv'){
                const registryArray = CSV.parse(masterDriverConfig[key].data)
                registries[key] = registryArray;
            }
        }
    }
    // assign points from registries
    for (let index in parsedMDC["devices"]){
        let registryConfig = parsedMDC["devices"][index]["registry_config"]
        // strip off config://
        registryConfig = registryConfig.split("config://")
        // look for device registry in registry array
        parsedMDC["devices"][index]["points"] = []
        for(let regIndex in registries[registryConfig[1]]){
            // first line in csv are the labels so skip it
            if (regIndex === "0") {
                continue;
            }
            // Volttron Point Name is second in the array
            parsedMDC["devices"][index]["points"].push(registries[registryConfig[1]][regIndex][1])
        }
    }
    return (
        parsedMDC
    );
}