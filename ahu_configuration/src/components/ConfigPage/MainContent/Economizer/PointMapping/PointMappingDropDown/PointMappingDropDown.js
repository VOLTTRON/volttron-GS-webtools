import React from "react";
import { Select, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
const PointMappingDropDown = (props) => {
  const {
    fieldName,
    disabled,
    pointMapping,
    keyIndex,
    handlePointMappingChange,
    parentSelectItems,
    handleRemoveButtonClick,
  } = props;
  return (
    <>
      <Select
        value={
          pointMapping[fieldName][keyIndex]
            ? pointMapping[fieldName][keyIndex]
            : " "
        }
        disabled={disabled}
        onChange={(e) => handlePointMappingChange(e, keyIndex)}
        name={fieldName}
        style={{ minWidth: "51%" }}
      >
        {parentSelectItems}
      </Select>
      {keyIndex > 0 ? (
        <IconButton
          onClick={() => handleRemoveButtonClick(fieldName, keyIndex)}
          aria-label="Remove"
        >
          <ClearIcon />
        </IconButton>
      ) : null}
    </>
  );
};

export default PointMappingDropDown;


