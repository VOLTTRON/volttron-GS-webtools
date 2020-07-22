import React, { useState } from "react";

export const MasterDriverContext = React.createContext({
  masterDriver: { name: "", data: null },
  setMasterDriver: () => {}
});

const MasterDriverProvider = props => {
  const [masterDriver, setMasterDriver] = useState({
    name: "",
    data: null
  });

  const masterDriverHandler = (masterDriverObj) => {
    setMasterDriver(masterDriverObj);
  };

  return (
    <MasterDriverContext.Provider
      value={{
        setMasterDriver: masterDriverHandler,
        masterDriver: masterDriver
      }}
    >
      {props.children}
    </MasterDriverContext.Provider>
  );
};

export default MasterDriverProvider;
