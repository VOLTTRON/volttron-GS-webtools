import React, { useState, createContext } from "react";

export const EconArgumentsContext = createContext(null);

export default ({ children }) => {
  const [argument, setArgument] = useState({
    data_window: 30.0,
    open_damper_time: 5,
    minimum_damper_setpoint: 20.0,
    desired_oaf: 10.0,
    no_required_data: 15,
    rated_cfm: 6000.0,
    device_type: "ahu",
    economizer_type: "DDB",
    econ_hl_temp: 65.0,
    temp_band: 1.0,
    eer: 10.0,
  });
  return (
    <EconArgumentsContext.Provider value={[argument, setArgument]}>
      {children}
    </EconArgumentsContext.Provider>
  );
};
