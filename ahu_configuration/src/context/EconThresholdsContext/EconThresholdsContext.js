import React, { useState } from "react";

export const EconThresholdsContext = React.createContext(null);

export default ({ children }) => {
  const [thresholds, setThresholds] = useState({
    low_supply_fan_threshold: 20.0,
    mat_low_threshold: 50.0,
    mat_high_threshold: 90.0,
    oat_low_threshold: 30.0,
    oat_high_threshold: 100.0,
    rat_low_threshold: 50.0,
    rat_high_threshold: 90.0,
    temp_difference_threshold: 4.0,
    open_damper_threshold: 80.0,
    oaf_temperature_threshold: 5.0,
    cooling_enabled_threshold: 5.0,
    custom: false,
  });

  return (
    <EconThresholdsContext.Provider value={[thresholds, setThresholds]}>
      {children}
    </EconThresholdsContext.Provider>
  );
};
