import { clone } from './clone'
import {_CRITERIA, _PAIRWISE, _CONTROL, MAPPER, CONFIG} from '../constants/strings'

export default function formatConfiguration (configuration) {
    let clonedConfiguration = clone(configuration);
    // format for store
    delete clonedConfiguration["criteria"];

    let formattedConfiguration = {};
    for (const [key, value] of Object.entries(clonedConfiguration)) {
        // strip out [always] and [nc] from criteria operation args
        if(key.includes(_CRITERIA) && !key.includes(_PAIRWISE)){
            for (const [parentName, parentObj] of Object.entries(value)) {
                if(parentName === MAPPER){
                    continue;
                }
                for (const [deviceName, deviceObj] of Object.entries(parentObj)) {
                    for (const [curtailName, curtailObj] of Object.entries(deviceObj)) {
                        for (const [pointName, pointObj] of Object.entries(curtailObj)) {
                            if(pointName === "device_topic"){
                                continue;
                            }
                            // remove duplicates from criteria operation args
                            const alwaysSet = new Set(pointObj["operation_args"]["always"])
                            const ncSet = new Set(pointObj["operation_args"]["nc"])
                            clonedConfiguration[key][parentName][deviceName][curtailName][pointName]["operation_args"]["always"] = [...alwaysSet]
                            clonedConfiguration[key][parentName][deviceName][curtailName][pointName]["operation_args"]["nc"] = [...ncSet]

                            // remove [always] and [nc] from operation string
                            let operationString = "";
                            var rex = new RegExp("\\[always]", "g");
                            operationString = pointObj["operation"].replace(rex, "");
                            var rex = new RegExp("\\[nc]", "g");
                            operationString = operationString.replace(rex, "");
                            clonedConfiguration[key][parentName][deviceName][curtailName][pointName]["operation"] = operationString
                        }
                    }
                }
            }
        }  
    }
    for (const [key, value] of Object.entries(clonedConfiguration)) {
        formattedConfiguration[key] = {
            type: "json",
            data: value
        }
    }

    return JSON.stringify(formattedConfiguration);
}