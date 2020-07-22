import React, { useState, createContext } from "react";

export const AirsideThresholdsContext = createContext(null);

export default ({ children }) => {
  const [thresholds, setThresholds] = useState({
    //Thresholds      
    no_required_data: 10.0,
    sensitivity: "custom",
    autocorrect_flag: false,
    sat_stpt_deviation_thr: 5.0,
    stcpr_stpt_deviation_thr: 20.0,
    sat_reset_thr: 5,
    stcpr_reset_thr: .25,
    custom: false,
    // Static
    warm_up_time: 15,
    stcpr_retuning: .15,
    max_stcpr_stpt: 2.5,
    low_sf_thr: 20.0,
    high_sf_thr: 95.0,
    zn_low_damper_thr: 10.0,
    zn_high_damper_thr: 90,
    min_stcpr_stpt: .5,
    hdzn_damper_thr: 30.0,
    // SAT
    percent_reheat_thr: 25.0,
    rht_on_thr: 10.0,
    sat_high_damper_thr: 80.0,
    percent_damper_thr: 60.0,
    minimum_sat_stpt: 50.0,
    sat_retuning: 1.0, 
    reheat_valve_thr: 50.0,
    maximum_sat_stpt: 75.0,
    // Schedule
    unocc_time_thr: 40.0,
    unocc_stp_thr: 0.2,
    monday_sch: ["05:30","18:30"],
    tuesday_sch: ["05:30","18:30"],
    wednesday_sch: ["05:30","18:30"],
    thursday_sch: ["05:30","18:30"],
    friday_sch: ["05:30","18:30"],
    saturday_sch: ["00:00","00:00"],
    sunday_sch: ["00:00","00:00"],
  });

  return (
    <AirsideThresholdsContext.Provider value={[thresholds, setThresholds]}>
      {children}
    </AirsideThresholdsContext.Provider>
  );
};
