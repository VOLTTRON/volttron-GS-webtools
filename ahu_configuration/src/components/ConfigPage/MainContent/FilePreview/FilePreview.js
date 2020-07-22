import React, { useContext } from "react";
import { AHUContext } from "../../../../context/AHUContext/AHUContext";
import { CurrentPageContext } from "../../../../context/CurrentPageContext/CurrentPageContext";
import { EconThresholdsContext } from "../../../../context/EconThresholdsContext/EconThresholdsContext";
import { EconArgumentsContext } from "../../../../context/EconArgumentsContext/EconArgumentsContext";
import { CampusBuildingDeviceContext } from "../../../../context/CampusBuildingDeviceContext/CampusBuildingDeviceContext";
import { AirsideArgumentsContext } from "../../../../context/AirsideArgumentsContext/AirsideArgumentsContext";
import { AirsideThresholdsContext } from "../../../../context/AirsideThresholdsContext/AirsideThresholdsContext";
import {
  StyledBoxWrapper,
  StyledDivPointMapping,
  StyledDivArguments,
  StyledDivThresholds,
  StyledDivStatic,
  StyledDivAIRC,
  StyledDivSchedule,
  StyledBox,
} from "./_style";

const FilePreview = (props) => {
  const ahuContext = useContext(AHUContext);
  const [pointMapping, setPointMapping] = ahuContext.pointMapping;
  const [fileType, setFileType] = ahuContext.fileType;

  const currentPageContext = useContext(CurrentPageContext);
  const [currentPage, setCurrentPage] = currentPageContext.currentPage;

  const [thresholds, setThresholds] = useContext(EconThresholdsContext);
  const [argument, setArgument] = useContext(EconArgumentsContext);
  const [airsideArgument, setAirsideArgument] = useContext(
    AirsideArgumentsContext
  );
  const [airsideThresholds, setAirsideThresholds] = useContext(
    AirsideThresholdsContext
  );
  const campusBuildingDeviceContext = useContext(CampusBuildingDeviceContext);
  const [campus, setCampus] = campusBuildingDeviceContext.campus;
  const [building, setBuilding] = campusBuildingDeviceContext.building;
  const [device, setDevice] = campusBuildingDeviceContext.device;
  const [subDevice, setSubDevice] = campusBuildingDeviceContext.subDevice;
  const [
    locationList,
    setLocationList,
  ] = campusBuildingDeviceContext.locationList;

  const deviceAndSubDevice = () => {
    let content = `"unit": {`;
    let subDevices = ``;
    let subDeviceCount = 0;
    if (campus && building && device) {
      campusBuildingDeviceContext.device[0].forEach((device) => {
        content += `   
            "${device}":{
                "subdevices":[`;
        if (
          subDevice &&
          locationList[campus] &&
          locationList[campus][building][device]
        ) {
          subDevice.forEach((element) => {
            if (
              locationList[campus][building][device].hasOwnProperty(element)
            ) {
              subDevices += `"${element}",`;
              subDeviceCount++;
              if (subDeviceCount > 2) {
                subDevices += "\n                   ";
                subDeviceCount = 0;
              }
            }
          });
          if (subDevices.length > 1) {
            subDevices = subDevices.replace(/,*$/, "");
          }
        }
        content +=
          subDevices +
          `]
            },`;
        subDevices = ``;
        subDeviceCount = 0;
      });
    }
    content += `
        }`;
    return content;
  };

  let renderContent = null;
  if (fileType === "Economizer_AIRCx") {
    const econMainConfig = `{
    "application": "economizer.economizer_rcx.Application",
    "device": {
        "campus": "${campus ? campus : ""}",
        "building": "${building ? building : ""}",
        ${deviceAndSubDevice()}
    },
    "analysis_name": "Economizer_AIRCx",
    "actuation_mode":  "PASSIVE",`;

    const econArgumentsSection = `   "arguments": {
        "point_mapping": {
            "supply_fan_status": "${
              pointMapping.supply_fan_status
                ? pointMapping.supply_fan_status
                : ""
            }",
            "outdoor_air_temperature": "${
              pointMapping.outdoor_air_temperature
                ? pointMapping.outdoor_air_temperature
                : ""
            }",
            "return_air_temperature": "${
              pointMapping.return_air_temperature
                ? pointMapping.return_air_temperature
                : ""
            }",
            "mixed_air_temperature": "${
              pointMapping.mixed_air_temperature
                ? pointMapping.mixed_air_temperature
                : ""
            }",
            "outdoor_damper_signal": "${
              pointMapping.outdoor_damper_signal
                ? pointMapping.outdoor_damper_signal
                : ""
            }",
            "cool_call": "${
              pointMapping.cool_call ? pointMapping.cool_call : ""
            }",
            "supply_fan_speed": "${
              pointMapping.supply_fan_speed ? pointMapping.supply_fan_speed : ""
            }"
        },`;

    const variableArgs1 = `        "device_type": "${
        argument.device_type ? argument.device_type : ""
        }",
        "economizer_type": "${
          argument.economizer_type ? argument.economizer_type : ""
        }",
        "econ_hl_temp": ${
          argument.econ_hl_temp ? argument.econ_hl_temp: ""
        },
        "data_window": ${argument.data_window ? argument.data_window : ""},
        "no_required_data": ${
          argument.no_required_data ? argument.no_required_data : ""
        },
        "desired_oaf":  ${argument.desired_oaf ? argument.desired_oaf : ""},
        "open_damper_time": ${
          argument.open_damper_time ? argument.open_damper_time : ""
        },
        "minimum_damper_setpoint": ${
          argument.minimum_damper_setpoint ? argument.minimum_damper_setpoint : ""
        },
        "rated_cfm":  ${argument.rated_cfm ? argument.rated_cfm : ""},
        "eer":  ${argument.eer ? argument.eer : ""},
        "temp_band": ${argument.temp_band ? argument.temp_band : ""},`;
    const variableArgs2 = `        "custom": ${thresholds.custom},
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
        }`;
    const constArgs = `     }
}`;

    renderContent = (
      <StyledBoxWrapper display="flex" p={1} flexDirection="column">
        <StyledBox p={1} bgcolor="grey.300" flexGrow={1}>
          <pre>{econMainConfig}</pre>
          <StyledDivPointMapping currentPage={currentPage}>
            <pre>{econArgumentsSection}</pre>
          </StyledDivPointMapping>
          <StyledDivArguments currentPage={currentPage}>
            <pre>{variableArgs1}</pre>
          </StyledDivArguments>
          <StyledDivThresholds currentPage={currentPage}>
            <pre>{variableArgs2}</pre>
          </StyledDivThresholds>
          <pre>{constArgs}</pre>
        </StyledBox>
      </StyledBoxWrapper>
    );
  } else {
    const econMainConfig = `{
    "agentid": "airside_aircx",
    "application": "airside_aircx.Application",
    "device": {
        "campus": "${campus ? campus : ""}",
        "building": "${building ? building : ""}",
        ${deviceAndSubDevice()}
    },
    "analysis_name": "AirsideAIRCx",
    "actuation_mode": "${airsideArgument.autocorrect_flag ? "ACTIVE": "PASSIVE"}",`;

    const econArgumentsSection = `   "arguments": {
        "point_mapping": {
            "fan_status": "${
              pointMapping.fan_status ? pointMapping.fan_status : ""
            }",
            "zone_reheat": "${
              pointMapping.zone_reheat ? pointMapping.zone_reheat : ""
            }",
            "zone_damper": "${
              pointMapping.zone_damper ? pointMapping.zone_damper : ""
            }",
            "duct_stcpr": "${
              pointMapping.duct_stcpr ? pointMapping.duct_stcpr : ""
            }",
            "duct_stcpr_stpt": "${
              pointMapping.duct_stcpr_stpt ? pointMapping.duct_stcpr_stpt : ""
            }",
            "sa_temp": "${pointMapping.sa_temp ? pointMapping.sa_temp : ""}",
            "fan_speedcmd": "${
              pointMapping.fan_speedcmd ? pointMapping.fan_speedcmd : ""
            }",
            "sat_stpt": "${pointMapping.sat_stpt ? pointMapping.sat_stpt : ""}"
        },`;
    const variableArgs1 = `        "sensitivity": "${
      airsideArgument.sensitivity ? airsideArgument.sensitivity : ""
    }",
        "autocorrect_flag": ${
          airsideArgument.autocorrect_flag
            ? airsideArgument.autocorrect_flag
            : false
        },
        "sat_retuning": ${
          airsideThresholds.sat_retuning ? airsideThresholds.sat_retuning : ""
        }, 
        "stcpr_retuning": ${
          airsideThresholds.stcpr_retuning
            ? airsideThresholds.stcpr_retuning
            : ""
        },
        "min_stcpr_stpt": ${
          airsideThresholds.min_stcpr_stpt
            ? airsideThresholds.min_stcpr_stpt
            : ""
        },
        "max_stcpr_stpt": ${
          airsideThresholds.max_stcpr_stpt
            ? airsideThresholds.max_stcpr_stpt
            : ""
        },
        "minimum_sat_stpt": ${
          airsideThresholds.minimum_sat_stpt
            ? airsideThresholds.minimum_sat_stpt
            : ""
        },
        "maximum_sat_stpt": ${
          airsideThresholds.maximum_sat_stpt
            ? airsideThresholds.maximum_sat_stpt
            : ""
        },
        "no_required_data": ${
          airsideThresholds.no_required_data
            ? airsideThresholds.no_required_data
            : ""
        },
        "warm_up_time": ${
          airsideThresholds.warm_up_time ? airsideThresholds.warm_up_time : ""
        },`;
    const variableArgs2 = `        "sat_stpt_deviation_thr": ${
      airsideArgument.sat_stpt_deviation_thr
        ? airsideArgument.sat_stpt_deviation_thr
        : ""
    },
        "stcpr_stpt_deviation_thr": "${
      airsideThresholds.stcpr_stpt_deviation_thr
        ? airsideThresholds.stcpr_stpt_deviation_thr
        : ""
    }",`;
    const variableArgs3 = `        "low_sf_thr": ${
      airsideThresholds.low_sf_thr ? airsideThresholds.low_sf_thr : ""
    },
        "high_sf_thr": ${
          airsideThresholds.high_sf_thr ? airsideThresholds.high_sf_thr : ""
        },
        "zn_high_damper_thr": ${
          airsideThresholds.zn_high_damper_thr
            ? airsideThresholds.zn_high_damper_thr
            : ""
        },
        "zn_low_damper_thr": ${
          airsideThresholds.zn_low_damper_thr
            ? airsideThresholds.zn_low_damper_thr
            : ""
        },
        "hdzn_damper_thr": ${
          airsideThresholds.hdzn_damper_thr
            ? airsideThresholds.hdzn_damper_thr
            : ""
        },`;
    const variableArgs4 = `        "percent_reheat_thr": ${
      airsideThresholds.percent_reheat_thr
        ? airsideThresholds.percent_reheat_thr
        : ""
    },
        "rht_on_thr": ${
          airsideThresholds.rht_on_thr ? airsideThresholds.rht_on_thr : ""
        },
        "sat_high_damper_thr": ${
          airsideThresholds.sat_high_damper_thr
            ? airsideThresholds.sat_high_damper_thr
            : ""
        },
        "percent_damper_thr": ${
          airsideThresholds.percent_damper_thr
            ? airsideThresholds.percent_damper_thr
            : ""
        },
        "reheat_valve_thr": ${
          airsideThresholds.reheat_valve_thr
            ? airsideThresholds.reheat_valve_thr
            : ""
        },`;
    const variableArgs5 = `        "sat_reset_thr": ${
      airsideThresholds.sat_reset_thr ? airsideThresholds.sat_reset_thr : ""
    },
        "stcpr_reset_thr": ${
          airsideThresholds.stcpr_reset_thr
            ? airsideThresholds.stcpr_reset_thr
            : ""
        },
        "unocc_time_thr": ${
          airsideThresholds.unocc_time_thr ? airsideThresholds.unocc_time_thr : ""
        },
        "unocc_stp_thr": ${
          airsideThresholds.unocc_stp_thr ? airsideThresholds.unocc_stp_thr : ""
        }",
        "monday_sch": ["${airsideThresholds.monday_sch[0]}","${
      airsideThresholds.monday_sch[1]
    }"],
        "tuesday_sch": ["${airsideThresholds.tuesday_sch[0]}","${
      airsideThresholds.tuesday_sch[1]
    }"],
        "wednesday_sch": ["${airsideThresholds.wednesday_sch[0]}","${
      airsideThresholds.wednesday_sch[1]
    }"],
        "thursday_sch": ["${airsideThresholds.thursday_sch[0]}","${
      airsideThresholds.thursday_sch[1]
    }"],
        "friday_sch": ["${airsideThresholds.friday_sch[0]}","${
      airsideThresholds.friday_sch[1]
    }"],
        "saturday_sch": ["${airsideThresholds.saturday_sch[0]}","${
      airsideThresholds.saturday_sch[1]
    }"],
        "sunday_sch": ["${airsideThresholds.sunday_sch[0]}","${
      airsideThresholds.sunday_sch[1]
    }"]`;
    const constArgs = `     },
}`;

    renderContent = (
      <StyledBoxWrapper display="flex" p={1} flexDirection="column">
        <StyledBox p={1} bgcolor="grey.300" flexGrow={1}>
          <pre>{econMainConfig}</pre>
          <StyledDivPointMapping currentPage={currentPage}>
            <pre>{econArgumentsSection}</pre>
          </StyledDivPointMapping>
          <StyledDivArguments currentPage={currentPage}>
            <pre>{variableArgs1}</pre>
          </StyledDivArguments>
          <StyledDivThresholds currentPage={currentPage}>
            <pre>{variableArgs2}</pre>
          </StyledDivThresholds>
          <StyledDivStatic currentPage={currentPage}>
            <pre>{variableArgs3}</pre>
          </StyledDivStatic>
          <StyledDivAIRC currentPage={currentPage}>
            <pre>{variableArgs4}</pre>
          </StyledDivAIRC>
          <StyledDivSchedule currentPage={currentPage}>
            <pre>{variableArgs5}</pre>
          </StyledDivSchedule>
          <pre>{constArgs}</pre>
        </StyledBox>
      </StyledBoxWrapper>
    );
  }

  return <>{renderContent}</>;
};

export default FilePreview;
