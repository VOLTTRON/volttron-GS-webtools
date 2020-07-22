import React, { useState, createContext } from "react";

export const AirsideArgumentsContext = createContext(null);

export default ({ children }) => {
  const [argument, setArgument] = useState({
    sat_stpt_deviation_thr: 5,
    autocorrect_flag: false,
    sensitivity: "default",
  });

  return (
    <AirsideArgumentsContext.Provider value={[argument, setArgument]}>
      {children}
    </AirsideArgumentsContext.Provider>
  );
};
