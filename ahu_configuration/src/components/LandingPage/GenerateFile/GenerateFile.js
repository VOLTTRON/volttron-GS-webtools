import React, { useContext } from "react";
import { Icon } from "@material-ui/core";

import { AHUContext } from "../../../context/AHUContext/AHUContext";
import CaretDownWhite from "../../../assets/icons/CaretDownWhite.svg";
import Generate from "../../../assets/icons/Generate.svg";
import {
  StyledExpansionPanel,
  StyledExpansionPanelSummary,
  StyledExpansionPanelDetails,
  StyledIcon,
  StyledButtonEconAir,
} from "./_style";

const GenerateFile = (props) => {
  const ahuContext = useContext(AHUContext);
  const [fileType, setFileType] = ahuContext.fileType;

  const generateConfigFile = (targetName) => (event) => {
    setFileType(targetName);
  };

  return (
    <StyledExpansionPanel disabled={props.disabled}>
      <StyledExpansionPanelSummary
        disabled={props.disabled}
        variant="contained"
        color="primary"
        expandIcon={
          <Icon>
            <img src={CaretDownWhite} height={19} width={20} alt="drop down" />
          </Icon>
        }
      >
        <StyledIcon>
          <img src={Generate} height={19} width={20} alt="upload" />
        </StyledIcon>
        <p>Generate configuration file for...</p>
      </StyledExpansionPanelSummary>
      <StyledExpansionPanelDetails>
        <StyledButtonEconAir
          name="Economizer_AIRCx"
          onClick={generateConfigFile("Economizer_AIRCx")}
          disabled={props.disabled}
          variant="contained"
          color="primary"
        >
          Economizer
        </StyledButtonEconAir>
        <StyledButtonEconAir
          name="AirsideAIRCx"
          onClick={generateConfigFile("AirsideAIRCx")}
          disabled={props.disabled}
          variant="contained"
          color="primary"
        >
          Airside
        </StyledButtonEconAir>
      </StyledExpansionPanelDetails>
    </StyledExpansionPanel>
  );
};

export default GenerateFile;
