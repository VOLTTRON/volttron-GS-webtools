import React, { useState } from "react";

export const AHUContext = React.createContext(null);

export default ({ children }) => {
  const [fileName, setFileName] = useState([]);
  const [fileType, setFileType] = useState([]);
  const [pointMapping, setPointMapping] = useState([]);

  const ahu = {
    fileName: [fileName, setFileName],
    fileType: [fileType, setFileType],
    pointMapping: [pointMapping, setPointMapping],
  };

  return <AHUContext.Provider value={ahu}>{children}</AHUContext.Provider>;
};
