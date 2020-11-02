import React, { useState } from "react";

export const AHUContext = React.createContext(null);

export default ({ children }) => {
  const [fileName, setFileName] = useState([]);
  const [fileType, setFileType] = useState([]);
  const [pointMapping, setPointMapping] = useState({});
  const [econPointMapping, setEconPointMapping] = useState({
    cool_call: [""],
    mixed_air_temperature: [""],
    outdoor_air_temperature: [""],
    outdoor_damper_signal: [""],
    return_air_temperature: [""],
    supply_fan_speed: [""],
    supply_fan_status: [""],
  });
  const [airPointMapping, setAirPointMapping] = useState({
    fan_status: [""],
    zone_reheat: [""],
    zone_damper: [""],
    duct_stcpr: [""],
    duct_stcpr_stpt: [""],
    sa_temp: [""],
    fan_speedcmd: [""],
    sat_stpt: [""],
  });

  const ahu = {
    fileName: [fileName, setFileName],
    fileType: [fileType, setFileType],
    pointMapping: [pointMapping, setPointMapping],
    econPointMapping: [econPointMapping, setEconPointMapping],
    airPointMapping: [airPointMapping, setAirPointMapping],
  };

  return <AHUContext.Provider value={ahu}>{children}</AHUContext.Provider>;
};
