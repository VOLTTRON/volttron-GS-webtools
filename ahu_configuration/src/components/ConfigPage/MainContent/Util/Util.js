const getDeviceString = (campus, building, device, subDevice, locationList) => {
  let deviceString = `"unit": {`;
  if (campus && building && device) {
    device.forEach((deviceInstance) => {
      deviceString += `   
            "${deviceInstance}": {
                "subdevices": [`;

      if (subDevice && locationList[campus][building][deviceInstance]) {
        subDevice.forEach((element) => {
          if (
            locationList[campus][building][deviceInstance].hasOwnProperty(
              element
            )
          ) {
            deviceString += `"${element}",`;
          }
        });
        if (deviceString.slice(-1) === ",") {
          // Remove trailing comma
          deviceString = deviceString.substring(0, deviceString.length - 1);
        }
      }
      deviceString += `]
            },`;
    });
    if (deviceString.slice(-1) === ",") {
      // Remove trailing comma
      deviceString = deviceString.substring(0, deviceString.length - 1);
    }
  }
  deviceString += `
        }`;

  return deviceString;
};

const getEconomizerJsonString = (
  campus,
  building,
  pointMapping,
  argument,
  thresholds,
  deviceString
) => {
  return `{
    "application": "economizer.economizer_rcx.Application",
    "device": {
        "campus": "${campus ? campus : ""}",
        "building": "${building ? building : ""}",
        ${deviceString}
    },
    "analysis_name": "Economizer_AIRCx",
    "actuation_mode": "PASSIVE",
    "arguments": {
        "point_mapping": {
          "supply_fan_status": [${pointMapping.supply_fan_status.map((item) => {
            return `"${item}"`;
          })}],
          "outdoor_air_temperature": [${pointMapping.outdoor_air_temperature.map(
            (item) => {
              return `"${item}"`;
            }
          )}],
          "return_air_temperature": [${pointMapping.return_air_temperature.map(
            (item) => {
              return `"${item}"`;
            }
          )}],
          "mixed_air_temperature": [${pointMapping.mixed_air_temperature.map(
            (item) => {
              return `"${item}"`;
            }
          )}],
          "outdoor_damper_signal": [${pointMapping.outdoor_damper_signal.map(
            (item) => {
              return `"${item}"`;
            }
          )}],
          "cool_call": [${pointMapping.cool_call.map((item) => {
            return `"${item}"`;
          })}],
          "supply_fan_speed": [${pointMapping.supply_fan_speed.map((item) => {
            return `"${item}"`;
          })}]
        },
        "device_type": "${argument.device_type ? argument.device_type : ""}",
        "economizer_type": "${
          argument.economizer_type ? argument.economizer_type : ""
        }",
        "constant_volume": ${argument.constant_volume},
        "econ_hl_temp": ${argument.econ_hl_temp ? argument.econ_hl_temp : ""},
        "data_window": ${argument.data_window ? argument.data_window : ""},
        "no_required_data": ${
          argument.no_required_data ? argument.no_required_data : ""
        },
        "desired_oaf": ${argument.desired_oaf ? argument.desired_oaf : ""},
        "open_damper_time": ${
          argument.open_damper_time ? argument.open_damper_time : ""
        },
        "minimum_damper_setpoint": ${
          argument.minimum_damper_setpoint
            ? argument.minimum_damper_setpoint
            : ""
        },
        "rated_cfm": ${argument.rated_cfm ? argument.rated_cfm : ""},
        "eer": ${argument.eer ? argument.eer : ""},
        "temp_band": ${argument.temp_band ? argument.temp_band : ""},
        "custom": ${thresholds.custom},
        "low_supply_fan_threshold": ${
          thresholds.low_supply_fan_threshold
            ? thresholds.low_supply_fan_threshold
            : ""
        },
        "mat_low_threshold": ${
          thresholds.mat_low_threshold ? thresholds.mat_low_threshold : ""
        },
        "mat_high_threshold": ${
          thresholds.mat_high_threshold ? thresholds.mat_high_threshold : ""
        },
        "oat_low_threshold": ${
          thresholds.oat_low_threshold ? thresholds.oat_low_threshold : ""
        },
        "oat_high_threshold": ${
          thresholds.oat_high_threshold ? thresholds.oat_high_threshold : ""
        },
        "rat_low_threshold": ${
          thresholds.rat_low_threshold ? thresholds.rat_low_threshold : ""
        },
        "rat_high_threshold": ${
          thresholds.rat_high_threshold ? thresholds.rat_high_threshold : ""
        },
        "temp_difference_threshold": ${
          thresholds.temp_difference_threshold
            ? thresholds.temp_difference_threshold
            : ""
        },
        "open_damper_threshold": ${
          thresholds.open_damper_threshold
            ? thresholds.open_damper_threshold
            : ""
        },
        "oaf_temperature_threshold": ${
          thresholds.oaf_temperature_threshold
            ? thresholds.oaf_temperature_threshold
            : ""
        },
        "cooling_enabled_threshold": ${
          thresholds.cooling_enabled_threshold
            ? thresholds.cooling_enabled_threshold
            : ""
        }
    }
  }`;
};

const getAirsideJsonString = (
  campus,
  building,
  pointMapping,
  argument,
  thresholds,
  deviceString
) => {
  return `{
      "agentid": "airside_aircx",
      "application": "airside_aircx.Application",
      "device": {
          "campus": "${campus ? campus : ""}",
          "building": "${building ? building : ""}",
          ${deviceString}
      },
      "analysis_name": "AirsideAIRCx",
      "actuation_mode": "${argument.autocorrect_flag ? "ACTIVE" : "PASSIVE"}",
      "arguments": {
          "point_mapping": {
              "fan_status": [${pointMapping.fan_status.map((item) => {
                return `"${item}"`;
              })}],
              "zone_reheat": [${pointMapping.zone_reheat.map((item) => {
                return `"${item}"`;
              })}],
              "zone_damper": [${pointMapping.zone_damper.map((item) => {
                return `"${item}"`;
              })}],
              "duct_stcpr": [${pointMapping.duct_stcpr.map((item) => {
                return `"${item}"`;
              })}],
              "duct_stcpr_stpt": [${pointMapping.duct_stcpr_stpt.map((item) => {
                return `"${item}"`;
              })}],
              "sa_temp": [${pointMapping.sa_temp.map((item) => {
                return `"${item}"`;
              })}],
              "fan_speedcmd": [${pointMapping.fan_speedcmd.map((item) => {
                return `"${item}"`;
              })}],
              "sat_stpt": [${pointMapping.sat_stpt.map((item) => {
                return `"${item}"`;
              })}]
          },
          "sensitivity": "${argument.sensitivity ? argument.sensitivity : ""}",
          "autocorrect_flag": ${argument.autocorrect_flag},
          "sat_retuning": ${
            thresholds.sat_retuning ? thresholds.sat_retuning : ""
          },
          "stcpr_retuning": ${
            thresholds.stcpr_retuning ? thresholds.stcpr_retuning : ""
          },
          "min_stcpr_stpt": ${
            thresholds.min_stcpr_stpt ? thresholds.min_stcpr_stpt : ""
          },
          "max_stcpr_stpt": ${
            thresholds.max_stcpr_stpt ? thresholds.max_stcpr_stpt : ""
          },
          "minimum_sat_stpt": ${
            thresholds.minimum_sat_stpt ? thresholds.minimum_sat_stpt : ""
          },
          "maximum_sat_stpt": ${
            thresholds.maximum_sat_stpt ? thresholds.maximum_sat_stpt : ""
          },
          "no_required_data": ${
            thresholds.no_required_data ? thresholds.no_required_data : ""
          },
          "warm_up_time": ${
            thresholds.warm_up_time ? thresholds.warm_up_time : ""
          },
          "sat_stpt_deviation_thr": ${
            argument.sat_stpt_deviation_thr
              ? argument.sat_stpt_deviation_thr
              : ""
          },
          "stcpr_stpt_deviation_thr": ${
            thresholds.stcpr_stpt_deviation_thr
              ? thresholds.stcpr_stpt_deviation_thr
              : ""
          },
          "low_sf_thr": ${thresholds.low_sf_thr ? thresholds.low_sf_thr : ""},
          "high_sf_thr": ${
            thresholds.high_sf_thr ? thresholds.high_sf_thr : ""
          },
          "zn_high_damper_thr": ${
            thresholds.zn_high_damper_thr ? thresholds.zn_high_damper_thr : ""
          },
          "zn_low_damper_thr": ${
            thresholds.zn_low_damper_thr ? thresholds.zn_low_damper_thr : ""
          },
          "hdzn_damper_thr": ${
            thresholds.hdzn_damper_thr ? thresholds.hdzn_damper_thr : ""
          },
          "percent_reheat_thr": ${
            thresholds.percent_reheat_thr ? thresholds.percent_reheat_thr : ""
          },
          "rht_on_thr": ${thresholds.rht_on_thr ? thresholds.rht_on_thr : ""},
          "sat_high_damper_thr": ${
            thresholds.sat_high_damper_thr ? thresholds.sat_high_damper_thr : ""
          },
          "percent_damper_thr": ${
            thresholds.percent_damper_thr ? thresholds.percent_damper_thr : ""
          },
          "reheat_valve_thr": ${
            thresholds.reheat_valve_thr ? thresholds.reheat_valve_thr : ""
          },
          "sat_reset_thr": ${
            thresholds.sat_reset_thr ? thresholds.sat_reset_thr : ""
          },
          "stcpr_reset_thr": ${
            thresholds.stcpr_reset_thr ? thresholds.stcpr_reset_thr : ""
          },
          "unocc_time_thr": ${
            thresholds.unocc_time_thr ? thresholds.unocc_time_thr : ""
          },
          "unocc_stp_thr": ${
            thresholds.unocc_stp_thr ? thresholds.unocc_stp_thr : ""
          },
          "monday_sch": ["${thresholds.monday_sch[0]}","${
    thresholds.monday_sch[1]
  }"],
          "tuesday_sch": ["${thresholds.tuesday_sch[0]}","${
    thresholds.tuesday_sch[1]
  }"],
          "wednesday_sch": ["${thresholds.wednesday_sch[0]}","${
    thresholds.wednesday_sch[1]
  }"],
          "thursday_sch": ["${thresholds.thursday_sch[0]}","${
    thresholds.thursday_sch[1]
  }"],
          "friday_sch": ["${thresholds.friday_sch[0]}","${
    thresholds.friday_sch[1]
  }"],
          "saturday_sch": ["${thresholds.saturday_sch[0]}","${
    thresholds.saturday_sch[1]
  }"],
          "sunday_sch": ["${thresholds.sunday_sch[0]}","${
    thresholds.sunday_sch[1]
  }"]
      }
  }`;
};
export const exportJson = (
  campus,
  building,
  device,
  subDevice,
  locationList,
  pointMapping,
  argument,
  thresholds,
  file,
  airSide
) => {
  let deviceString = getDeviceString(
    campus,
    building,
    device,
    subDevice,
    locationList
  );
  let jsonString = airSide
    ? getAirsideJsonString(
        campus,
        building,
        pointMapping,
        argument,
        thresholds,
        deviceString
      )
    : getEconomizerJsonString(
        campus,
        building,
        pointMapping,
        argument,
        thresholds,
        deviceString
      );

  downloadObjectAsJson(jsonString, file);
};

function downloadObjectAsJson(jsonString, exportName) {
  let dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
  let downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export default { exportJson };
