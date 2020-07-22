import React from "react";
import { Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

// Tool tip message is pulled from ./public/assets/toolTipDefinitions for easy configuration: 
// https://stackoverflow.com/questions/50369477/create-react-app-configuration-file-after-build-app
const ToolTipInfo = (props) => {
  const { fieldName } = props;
  let message = null;
  if (
    typeof window.toolTipDefinitions !== "undefined" &&
    fieldName in window.toolTipDefinitions
  ) {
    message = window.toolTipDefinitions[fieldName];
  }

  return (
    <>
      {(message !== null && message.length > 0) ? (
        <Tooltip fontSize="small" title={message} placement="right" arrow>
          <InfoIcon></InfoIcon>
        </Tooltip>
      ) : null}
    </>
  );
};

export default ToolTipInfo;
