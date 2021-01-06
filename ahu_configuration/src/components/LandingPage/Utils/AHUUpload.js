import { dropDown } from "../../../containers/ConfigPage/Util/DropDown";

const setAirsideContexts = (
  fileContentObject,
  setAirPointMapping,
  setArgument,
  setThresholds
) => {
  let error = "";
  try {
    setAirPointMapping({
      fan_status: fileContentObject.arguments.point_mapping.fan_status,
      zone_reheat: fileContentObject.arguments.point_mapping.zone_reheat,
      zone_damper: fileContentObject.arguments.point_mapping.zone_damper,
      duct_stcpr: fileContentObject.arguments.point_mapping.duct_stcpr,
      duct_stcpr_stpt:
        fileContentObject.arguments.point_mapping.duct_stcpr_stpt,
      sa_temp: fileContentObject.arguments.point_mapping.sa_temp,
      fan_speedcmd: fileContentObject.arguments.point_mapping.fan_speedcmd,
      sat_stpt: fileContentObject.arguments.point_mapping.sat_stpt,
      supply_fan_speed:
        fileContentObject.arguments.point_mapping.supply_fan_speed,
    });
  } catch (e) {
    error = "File is not in JSON format. Check the point mapping part of file";
    return error;
  }

  // Arguments
  try {
    setArgument({
      sensitivity: fileContentObject.arguments.sensitivity,
      autocorrect_flag: fileContentObject.arguments.autocorrect_flag,
      open_damper_time: fileContentObject.arguments.sat_stpt_deviation_thr,
    });
  } catch (e) {
    error = "File is not in JSON format. Check the arguments part of file";
    return error;
  }

  // Thresholds
  try {
    setThresholds({
      // Thresholds
      no_required_data: fileContentObject.arguments.no_required_data,
      sensitivity: fileContentObject.arguments.sensitivity,
      autocorrect_flag: fileContentObject.arguments.autocorrect_flag,
      sat_stpt_deviation_thr:
        fileContentObject.arguments.sat_stpt_deviation_thr,
      stcpr_stpt_deviation_thr:
        fileContentObject.arguments.stcpr_stpt_deviation_thr,
      sat_reset_thr: fileContentObject.arguments.sat_reset_thr,
      stcpr_reset_thr: fileContentObject.arguments.stcpr_reset_thr,

      //Static
      warm_up_time: fileContentObject.arguments.warm_up_time,
      stcpr_retuning: fileContentObject.arguments.stcpr_retuning,
      max_stcpr_stpt: fileContentObject.arguments.max_stcpr_stpt,
      low_sf_thr: fileContentObject.arguments.low_sf_thr,
      high_sf_thr: fileContentObject.arguments.high_sf_thr,
      zn_low_damper_thr: fileContentObject.arguments.zn_low_damper_thr,
      zn_high_damper_thr: fileContentObject.arguments.zn_high_damper_thr,
      min_stcpr_stpt: fileContentObject.arguments.min_stcpr_stpt,
      hdzn_damper_thr: fileContentObject.arguments.hdzn_damper_thr,
      // SAT
      percent_reheat_thr: fileContentObject.arguments.percent_reheat_thr,
      rht_on_thr: fileContentObject.arguments.rht_on_thr,
      sat_high_damper_thr: fileContentObject.arguments.sat_high_damper_thr,
      percent_damper_thr: fileContentObject.arguments.percent_damper_thr,
      minimum_sat_stpt: fileContentObject.arguments.minimum_sat_stpt,
      sat_retuning: fileContentObject.arguments.sat_retuning,
      reheat_valve_thr: fileContentObject.arguments.reheat_valve_thr,
      maximum_sat_stpt: fileContentObject.arguments.maximum_sat_stpt,
      //Schedule
      unocc_time_thr: fileContentObject.arguments.unocc_time_thr,
      unocc_stp_thr: fileContentObject.arguments.unocc_stp_thr,
      monday_sch: fileContentObject.arguments.monday_sch,
      tuesday_sch: fileContentObject.arguments.tuesday_sch,
      wednesday_sch: fileContentObject.arguments.wednesday_sch,
      thursday_sch: fileContentObject.arguments.thursday_sch,
      friday_sch: fileContentObject.arguments.friday_sch,
      saturday_sch: fileContentObject.arguments.saturday_sch,
      sunday_sch: fileContentObject.arguments.sunday_sch,
      custom:
        fileContentObject.arguments.no_required_data != 10 ||
        fileContentObject.arguments.sensitivity != "custom" ||
        fileContentObject.arguments.autocorrect_flag != false ||
        fileContentObject.arguments.sat_stpt_deviation_thr != 5 ||
        fileContentObject.arguments.stcpr_stpt_deviation_thr != 20 ||
        fileContentObject.arguments.sat_reset_thr != 5 ||
        fileContentObject.arguments.stcpr_reset_thr != 0.25
          ? true
          : false,
    });
  } catch (e) {
    error = "File is not in JSON format. Check the thresholds part of file";
    return error;
  }

  return error;
};

const setEconContexts = (
  fileContentObject,
  setEconPointMapping,
  setArgument,
  setThresholds
) => {
  let error = "";
  // Point Mapping
  try {
    setEconPointMapping({
      supply_fan_status:
        fileContentObject.arguments.point_mapping.supply_fan_status,
      outdoor_air_temperature:
        fileContentObject.arguments.point_mapping.outdoor_air_temperature,
      return_air_temperature:
        fileContentObject.arguments.point_mapping.return_air_temperature,
      mixed_air_temperature:
        fileContentObject.arguments.point_mapping.mixed_air_temperature,
      outdoor_damper_signal:
        fileContentObject.arguments.point_mapping.outdoor_damper_signal,
      cool_call: fileContentObject.arguments.point_mapping.cool_call,
      supply_fan_speed:
        fileContentObject.arguments.point_mapping.supply_fan_speed,
    });
  } catch (e) {
    error = "File is not in JSON format. Check the point mapping part of file";
    return error;
  }

  // Arguments
  try {
    setArgument({
      data_window: fileContentObject.arguments.data_window,
      no_required_data: fileContentObject.arguments.no_required_data,
      open_damper_time: fileContentObject.arguments.open_damper_time,
      minimum_damper_setpoint:
        fileContentObject.arguments.minimum_damper_setpoint,
      desired_oaf: fileContentObject.arguments.desired_oaf,
      rated_cfm: fileContentObject.arguments.rated_cfm,
      device_type: fileContentObject.arguments.device_type,
      economizer_type: fileContentObject.arguments.economizer_type,
      constant_volume: fileContentObject.arguments.constant_volume,
      econ_hl_temp: fileContentObject.arguments.econ_hl_temp,
      temp_band: fileContentObject.arguments.temp_band,
      eer: fileContentObject.arguments.eer,
    });
  } catch (e) {
    error = "File is not in JSON format. Check the arguments part of file";
    return error;
  }

  // Thresholds
  try {
    setThresholds({
      custom: fileContentObject.arguments.sensitivity,
      low_supply_fan_threshold:
        fileContentObject.arguments.low_supply_fan_threshold,
      mat_low_threshold: fileContentObject.arguments.mat_low_threshold,
      mat_high_threshold: fileContentObject.arguments.mat_high_threshold,
      oat_low_threshold: fileContentObject.arguments.oat_low_threshold,
      oat_high_threshold: fileContentObject.arguments.oat_high_threshold,
      rat_low_threshold: fileContentObject.arguments.rat_low_threshold,
      rat_high_threshold: fileContentObject.arguments.rat_high_threshold,
      open_damper_threshold: fileContentObject.arguments.open_damper_threshold,
      temp_difference_threshold:
        fileContentObject.arguments.temp_difference_threshold,
      oaf_temperature_threshold:
        fileContentObject.arguments.oaf_temperature_threshold,
      cooling_enabled_threshold:
        fileContentObject.arguments.cooling_enabled_threshold,
    });
  } catch (e) {
    error = "File is not in JSON format. Check the thresholds part of file";
    return error;
  }

  return error;
};

export const handleAHUUpload = (
  fileContents,
  ahuContext,
  setEconArgument,
  setAirsideArguments,
  setEconThresholds,
  setAirsideThresholds,
  campusBuildingDeviceContext,
  verifyLocation,
  masterDriverContext,
  dropDownsContext
) => {
  const [econPointMapping, setEconPointMapping] = ahuContext.econPointMapping;
  const [airPointMapping, setAirPointMapping] = ahuContext.airPointMapping;
  const [fileType, setFileType] = ahuContext.fileType;
  const [campus, setCampus] = campusBuildingDeviceContext.campus;
  const [building, setBuilding] = campusBuildingDeviceContext.building;
  const [
    buildingList,
    setBuildingList,
  ] = campusBuildingDeviceContext.buildingList;
  const [deviceList, setDeviceList] = campusBuildingDeviceContext.deviceList;
  const [device, setDevice] = campusBuildingDeviceContext.device;
  const [
    subDeviceList,
    setSubDeviceList,
  ] = campusBuildingDeviceContext.subDeviceList;
  const [subDevice, setSubDevice] = campusBuildingDeviceContext.subDevice;
  let error = "";
  let fileContentObject = {};
  try {
    fileContentObject = JSON.parse(fileContents);
  } catch (e) {
    error = "Error when trying to convert file to JSON object";
    return error;
  }

  if (Object.keys(fileContentObject).length < 1) {
    error = "Error when trying to convert file to JSON object";
    return error;
  }

  // Set campus, building, device, and sub-device
  try {
    const campus = fileContentObject.device.campus;
    const building = fileContentObject.device.building;
    setCampus(fileContentObject.device.campus);
    setBuilding(fileContentObject.device.building);
    const devices = Object.keys(fileContentObject.device.unit);
    setDevice(devices);

    let subDevices = [];
    devices.forEach((element) => {
      const subDevicesArray = Object.keys(
        fileContentObject.device.unit[element].subdevices
      );
      subDevicesArray.forEach((key) => {
        subDevices.push(fileContentObject.device.unit[element].subdevices[key]);
      });
    });
    setSubDevice(subDevices);

    // Get the location list and build out the dd options for building,
    // device, and subdevice
    let locationList = verifyLocation(masterDriverContext);
    setBuildingList(Object.keys(locationList[campus]));
    setDeviceList(Object.keys(locationList[campus][building]));
    let subDeviceListObj = [];
    for (let [key, value] of Object.entries(locationList[campus][building])) {
      if (devices.includes(key)) { // Only add subdevices for the selected device(s)
        subDeviceListObj[key] = Object.keys(locationList[campus][building][key]);
        subDeviceListObj[key] = subDeviceListObj[key].filter(item => item !== "defaultConfig")
      }
    }
    setSubDeviceList(subDeviceListObj);

    // Set drop down options for zone_reheat & zone_damper on airside
    let subdevice = null;

    if (fileContentObject.device.unit && Object.keys(fileContentObject.device.unit)[0]) {
      subdevice = fileContentObject.device.unit[Object.keys(fileContentObject.device.unit)[0]].subdevices
      dropDown(
        fileContentObject.device.campus,
        fileContentObject.device.building,
        devices,
        subdevice,
        dropDownsContext,
        masterDriverContext,
        fileContentObject.analysis_name !== "AirsideAIRCx"
      );
    }

    dropDown(
      fileContentObject.device.campus,
      fileContentObject.device.building,
      devices,
      null,
      dropDownsContext,
      masterDriverContext,
      fileContentObject.analysis_name !== "AirsideAIRCx"
    );
  } catch (e) {
    error = "File is not in JSON format. Check the device section of file";
    return error;
  }

  if (fileContentObject.analysis_name === "AirsideAIRCx") {
    error = setAirsideContexts(
      fileContentObject,
      setAirPointMapping,
      setAirsideArguments,
      setAirsideThresholds
    );
    setFileType("AirsideAIRCx");
  } else {
    error = setEconContexts(
      fileContentObject,
      setEconPointMapping,
      setEconArgument,
      setEconThresholds
    );
    setFileType("Economizer_AIRCx");
  }

  return error;
};

export default { handleAHUUpload };
