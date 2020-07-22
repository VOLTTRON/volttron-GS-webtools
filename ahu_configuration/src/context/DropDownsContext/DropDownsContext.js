import React, { useState } from "react";

export const DropDownsContext = React.createContext({
  dropDownsParent: {}, 
  setDropDownsParent: () => {},
  dropDownsChildren: {}, // Used for airside Zone Reheat and Zone Damper
  setDropDownsChildren: () => {}, 
});

const DropDownsProvider = props => {
  const [dropDownsParent, setDropDownsParent] = useState({
  });
  const [dropDownsChildren, setDropDownsChildren] = useState({
});
  const parentDropdownsHandler = (dropdownObj) => {
    setDropDownsParent(dropdownObj);
  };
  const childrenDropdownsHandler = (dropdownObj) => {
    setDropDownsChildren(dropdownObj);
  };

  return (
    <DropDownsContext.Provider
      value={{
        setDropDownsParent: parentDropdownsHandler,
        dropDownsParent: dropDownsParent,
        setDropDownsChildren: childrenDropdownsHandler,
        dropDownsChildren: dropDownsChildren,
      }} 
    >
      {props.children}
    </DropDownsContext.Provider>
  );
};

export default DropDownsProvider;
