import React, { useState } from "react";

export const CurrentPageContext = React.createContext(null);

export default ({ children }) => {
  const [currentPage, setCurrentPage] = useState("Point Mapping");

  const page = {
    currentPage: [currentPage, setCurrentPage]
  };

  return (
    <CurrentPageContext.Provider value={page}>
      {children}
    </CurrentPageContext.Provider>
  );
};
