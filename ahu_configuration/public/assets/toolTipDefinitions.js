/**
 * Use this file to configure the tool tip for each field
 */
var toolTipDefinitions = {
  supply_fan_status: "Point name for the supply-fan status.",
  outdoor_air_temperature: "Point name for the outdoor-air temperature.",
  return_air_temperature: "Point name for the return-air temperature.",
  mixed_air_temperature: "Point name for the mixed-air temperature.",
  outdoor_damper_signal: "Point name for the outdoor-air damper signal.",
  cool_call:
    "Point name for the chilled water valve position (AHU) or DX compressor status (RTU).",
  supply_fan_speed: "Point name for the supply-fan speed output (percent).",
  device_type:
    "Either AHU (air handling unit) or RTU (roof top unit, includes heat pumps).",
  data_window: "Data collection interval for performing analysis.",
  no_required_data:
    "Minimum number of data measurments for a conclusive diagnostic.",
  open_damper_time:
    "Amount of time the outdoor-air damper must remain fully open for steady state conditions.",
  low_supply_fan_threshold:
    "If the supply-fan speed measurment is below this value the unit will be considered OFF.",
  mat_low_threshold:
    "Low limit threshold for mixed-air temperature measurement.",
  mat_high_threshold:
    "High limit threshold for mixed-air temperature measurement.",
  oat_low_threshold:
    "Low limit threshold for outdoor-air temperature measurement.",
  oat_high_threshold:
    "High limit threshold for outdoor-air temperature measurement.",
  rat_low_threshold:
    "Low limit threshold for return-air temperature measurement.",
  rat_high_threshold:
    "High limit threshold for return-air temperature measurement.",
  temp_difference_threshold:
    "The temperature difference threshold for detecting sensor problems.",
  open_damper_threshold:
    "Value above which the outdoor-air damper is considered fully open.",
  oaf_temperature_threshold:
    "The delta between the outdoor- and return-air temperatures must be at least this large for a conclusive diagnostic.",
  cooling_enabled_threshold:
    "If chilledwater valve position is greater than this value, cooling is considered to be ON.",
  minimum_damper_setpoint: "Minimum ventilation outdoor damper position.",
  desired_oaf: "Desired minimum ventilation outdoor air fraction as a percent.",
  rated_cfm: "Rated supply-airflow rate for supply fan.",
  eer: "Rated Energy Efficiency Ratio for unit.",
  economizer_type:
    "Economizer type differential dry bulb (DDB) or outdoor-air temperature high limit set point (HL).",
  constant_volumne: "",
  econ_hl_temp:
    "For high limit economizer, this is the outdoor-air temperature below which economizing should be enabled.",
  temp_band:
    "For high limit economizer, this is the dead band around the ECONOMIZER SWITCHOVER SETPOINT.",

  fan_status: "",
  zone_reheat: "",
  zone_damper: "",
  duct_stcpr: "",
  duct_stcpr_stpt: "",
  sa_temp: "",
  fan_speedcmd: "",
  sat_stpt: "",
  sensitivity: "",
  autocorrect_flag: "",
  sat_stpt_deviation_thr: "",
  stcpr_stpt_deviation_thr: "",
  sat_reset_thr: "",
  stcpr_reset_thr: "",
  warm_up_time: "",
  stcpr_retuning: "",
  max_stcpr_stpt: "",
  low_sf_thr: "",
  high_sf_thr: "",
  zn_high_damper_thr: "",
  zn_low_damper_thr: "",
  min_stcpr_stpt: "",
  hdzn_damper_thr: "",
  percent_reheat_thr: "",
  rht_on_thr: "",
  sat_high_damper_thr: "",
  percent_damper_thr: "",
  sat_retuning: "",
  reheat_valve_thr: "",
  minimum_sat_stpt: "",
  maximum_sat_stpt: "",
  unocc_time_thr: "",
  unocc_stp_thr: "",
  monday_sch: "",
  tuesday_sch: "",
  wednesday_sch: "",
  thursday_sch: "",
  friday_sch: "",
  saturday_sch: "",
  sunday_sch: "",
};
