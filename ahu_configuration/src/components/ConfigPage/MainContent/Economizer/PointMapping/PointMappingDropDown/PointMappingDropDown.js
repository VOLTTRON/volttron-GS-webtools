import React from "react";
import { Select, IconButton, Chip } from "@material-ui/core";
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
    subDevice,
  } = props;

  let dropDownOptions = parentSelectItems;
  let subDeviceSourced = null;
  if (fieldName === "zone_reheat" || fieldName === "zone_damper") {
    // If more selects than sub-devices, then use last sub-device
    let key = keyIndex > subDevice.length - 1 ? subDevice.length - 1 : keyIndex;
    subDeviceSourced = subDevice[key] ? (
      <Chip color="secondary" size="small" label={subDevice[key]} />
    ) : null;
    dropDownOptions = dropDownOptions[key];
  }
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
        autoWidth={true}
      >
        {dropDownOptions}
      </Select>
      {subDeviceSourced}
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
